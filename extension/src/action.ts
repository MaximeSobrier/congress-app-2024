import IABService from "./helpers/iab/IABService";

console.log("action.js started 1.0...");


async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// Get the list of categories and their detailed information
let list = IABService.getListWebs(true, false).filter((web) => !web.startsWith('WEB29')); // Uncategorized
let listInfo : any = {};
list.map((web) => {
  listInfo[web] = {
    name: IABService.getNameForWeb(web),
    includes: IABService.getIncludeForWeb(web).toLowerCase()
  }
});


// Receive messages from the background page
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  console.log("Received message");

  if(sender.id != chrome.runtime.id) {
    console.log(`Invalid sender: ${sender.id}`);
    return;
  }

  if (message.event == "getClassification") {
    console.log(message);

    let tab = await getCurrentTab();
    if (tab.url != message.url) {
      console.log(`URL mismatch: ${tab.url} != ${message.url}`);
      return;
    };


    document.getElementById("url")!.innerHTML = message.url;
    document.getElementById("categories")!.innerHTML = '<ul>' + message.categories.filter((category: any) => Math.round(category.score * 100) > 0).map((category: any) => {
      return `<li>${IABService.getName(category.iab)} ${Math.round(category.score * 100)}%</li>`;
    }).join("\n") + '<ul>';
    document.getElementById("language")!.innerHTML = message.language;
  }
  else if (message.event == "getPolicy") {
    console.log("getPolicy message");
    console.log(message);

    if (!message.webs || message.webs.length == 0) {
      console.log("No policy returned");
      return;
    }

    for(let web of message.webs) {
      let inputs = document.getElementsByName(web) as NodeListOf<HTMLInputElement>;
      Array.from(inputs).forEach((input) => {
        input.checked = true
      });
    }
  }
  else if (message.event == "getExceptions") {
    console.log("getExceptions message");
    console.log(message);

    document.getElementById('exceptions-domains')!.innerHTML = '';
    if (message.domains.length > 0)
      document.getElementById('exceptions-domains')!.innerHTML = message.domains.map((domain: string) => `<li>${domain}</li>`).sort().join('');

    document.getElementById('exceptions-urls')!.innerHTML = '';
    if (message.urls.length > 0)
      document.getElementById('exceptions-urls')!.innerHTML = message.urls.map((url: string) => `<li>${url}</li>`).sort().join('');

  }
  else {
    console.log(message);
  }
});

(async () => {

  let tab = await getCurrentTab();
  let uri =  new URL(tab.url || '');

  document.getElementById('url')!.innerHTML = uri.href;
  if (uri.href.startsWith('http://') || uri.href.startsWith('https://')) {
    await chrome.runtime.sendMessage({ type: "Action.getClassification", tab });
  }

  // build the policy
  let policy = '';
  for (let web of list) {
    // tier-2
    if (web.indexOf('-') > 0) {
      let name = listInfo[web].name.split(' > ')[1];
      policy += `<label id="line-${web}"><input type="checkbox" name="${web}" id="${web}" style="margin-left: 15px;"><span>${name}</span></input><br></label>`;

    }
    // tier-1 empty
    else if (IABService.getEmptyForWeb(web)) {
      policy += `<label id="line-${web}"><input type="checkbox" name="${web}" id="${web}" disabled="true"><span>${listInfo[web].name}</span></input><br></label>`;
    }
    // tier-1
    else {
      policy += `<label id="line-${web}"><input type="checkbox" name="${web}" id="${web}"><span>${listInfo[web].name} (Other)</span></input><br></label>`;
    }
  }

  document.getElementById('policy')!.innerHTML = policy;

  await chrome.runtime.sendMessage({ type: "Action.getPolicy", tab });
  await chrome.runtime.sendMessage({ type: "Action.getExceptions" });
})();


document.getElementById("save")!.onclick = async function() {
  let webs : string[] = Array.from(document.querySelectorAll('#policy > label > input:checked') as NodeListOf<HTMLInputElement>).map((input) => input.name);

  await chrome.runtime.sendMessage({ type: "Action.save", webs });
}


document.getElementById("search")!.oninput = function(event) {
  let value = (event.target as HTMLInputElement).value.toLowerCase();
  console.log(value);

  if (value == '') { // show all
    document.querySelectorAll('#policy > label').forEach((input) => {
      (input as HTMLInputElement).style.display = 'block';
    });

    return;
  }

  // filter the policy
  Object.keys((listInfo)).forEach((web) => {
    let name = listInfo[web].name.toLowerCase();
    let includes = listInfo[web].includes; // already lowercase

    let show = name.includes(value) || includes.includes(value);

    document.getElementById(`line-${web}`)!.style.display = show ? 'block' : 'none';
  })
}


document.getElementById("add-exception-domain")!.onclick = async function() {
  let domain = (document.getElementById("exception-domain") as HTMLInputElement)!.value;

  await chrome.runtime.sendMessage({ type: "Action.Exception", scope: 'domain', value: domain })
    .then(() => {
      (document.getElementById("exception-domain") as HTMLInputElement)!.value = '';
      chrome.runtime.sendMessage({ type: "Action.getExceptions" })
    });
}

document.getElementById("add-exception-url")!.onclick = async function() {
  let url = (document.getElementById("exception-url") as HTMLInputElement)!.value;

  await chrome.runtime.sendMessage({ type: "Action.Exception", scope: 'url',  value: url })
    .then(() => chrome.runtime.sendMessage({ type: "Action.getExceptions" }));
}