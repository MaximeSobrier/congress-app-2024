
import IABService from "./helpers/iab/IABService";

var urls : any = { };
var policy : string[] = [];
var exceptionsDomains : string[] = [];
var exceptionsUrls : string[] = [];
const confidence = 0.5;
const secret = makeSecret(256);


// Create secret
function makeSecret(length : number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

/* Interaction with the native app */
const nativeAppName = "net.sobrier.maxime.classification_node";

let port = chrome.runtime.connectNative(nativeAppName);
port.onDisconnect.addListener(function () {
  console.log('Disconnected');
  port = chrome.runtime.connectNative(nativeAppName);
  port.onMessage.addListener((response) => handleResponseFromApp(response));
});

port.onMessage.addListener((response) => handleResponseFromApp(response));

async function handleResponseFromApp(response : any) {

  /*console.log(`Event received from native app: ${response.command}`);
  console.log(response);*/

  if (response.command == "classification") {
    console.log("getClassification");
    console.log(response);

    
    urls[response.url] = {
      categories: response.categories,
      language: response.language,
    };

    let source = {tabId: response.tab, allFrames: false};


    applyPolicy(source, response.url);

    chrome.runtime.sendMessage({event: "getClassification", tabId: response.tab, language: response.language, categories: response.categories, url: response.url});
  }
  else if (response.command == "languageNotSupported") {
    console.log(response);
    urls[response.url] = {
      categories: [],
      language: response.language,
    };

    chrome.runtime.sendMessage({event: "getClassification", tabId: response.tab, language: response.language, categories: ['IAB24-5'], url: response.url});
  }
  else {
    console.error(`Unknown command: ${response.command}`);
  }
}




/* Listen to navigation events in all the tabs */
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => { // not needed, only if top frame update?
  if (
      (changeInfo.status && ['loading'].includes(changeInfo.status)) ||  // complete = same as chrome.webNavigation.onCompleted ?
      (changeInfo.url && (changeInfo.url.startsWith('http://') || changeInfo.url.startsWith('https://')))
    ) {

    console.log("chrome.tabs.onUpdated.addListener");
    console.log(changeInfo);

    let params = {
      tabId: tab.id, 
      windowId: tab.windowId,
      url: changeInfo.url|| tab.url || '',
    };

    if (!params.url.startsWith('http://') && !params.url.startsWith('https://')) {
      return;
    }

    let source = {tabId: tab.id, allFrames: false};

    applyPolicy(source, params.url);

    return getClassification(source, params);
  }
});


async function onNavigation(details : any) {
  console.log(`Navigation: ${details.url}`);
  console.log(details);

  let source = {tabId: details.tabId, allFrames: false};

  let params = {
    tabId: details.tabId,
    url: details.url,
  };

  applyPolicy(source, details.url);

  return getClassification(source, params);
}

// Listen for loaded page
//chrome.webNavigation.onDOMContentLoaded.addListener(onNavigation);
//chrome.webNavigation.onCompleted.addListener(onNavigation);
//chrome.webNavigation.onErrorOccurred.addListener(onNavigation);
chrome.webNavigation.onBeforeNavigate.addListener(onNavigation);



function getClassification(source: any, params: any) {
  return chrome.scripting.executeScript({
    target : source,
    func : getPageInfo,
    args: [secret]
  }).then(async (results) => {
    console.log('getPageInfo results received:')
    console.log(results);

    // Do not classify our own block page
    if (results[0].result.secret) {
      console.log("Page already blocked");
      return;
    }

    params = Object.assign(params, results[0].result);

    console.log("Extension.getClassification Params:");
    console.log(params);

    console.log("Send Extension.getClassification to native")
    sendMessageToApp(source, "Extension.getClassification", params);
  }).catch((error) => {
    console.error("getPageInfo failed")
    console.error(error);
  });
}


/* Function inject in page to retrieve content */
function getPageInfo(secret : string = '') {
  console.log('content injection started');

  let secretElement = document.getElementById(secret);

  return {
    url: document.location.href,
    body: document.body.innerText,
    // html: document.documentElement.outerHTML,
    title: document.title,
    //contentType: document.contentType,
    secret: secretElement ? true :false,
  };
}

/* Function injected in blocked pages to replace content */
function blockPage(head : string = '', body : string = '') {
  console.log('blockPage started');


  document.open();
  document.write(`<html><head>${head}</head><body>${body}</body></html>`);
  document.close();

  console.log('blockPage finished');
}

function applyPolicy(source : any, url : string = '') {
  // Check if the URL is in the policy
  if (!urls[url]) {
    console.log(`No classification for ${url}`);
    return false;
  }

  if (isException(url)) {
    console.log(`Exception for ${url}`);
    console.log(exceptionsUrls);
    console.log(exceptionsDomains);
    return false;
  }

  // Verify the url is still the same
  chrome.tabs.get(source.tabId, (tab) => {
    if (tab.url != url) {
      console.log(`URL mismatch: ${tab.url} != ${url}`);
      return;
    };

    let categories = urls[url].categories.filter((category: any) => category.score >= confidence) // only use categories with a high confidence;
    let blocked = categories  .filter((category: any) => policy.includes(IABService.getWebId(category.iab))); // blocked by policies


    /*console.log(`Categories: ${categories.length}`);
    console.log(categories);

    console.log(`Blocked: ${blocked.length}`);
    console.log(blocked);*/


    if (blocked.length == 0)
      return; // nothing to do

    let head = `
<title>Page Blocked</title>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: auto;
    padding: 20px;
    background-color: #fcece4;
    // color: white;
  }
  h1 {
    margin: auto;
    padding-top: 20px;
    font-size: 450%;
  }
  h2 {
    margin: auto;
    padding-top: 20px;
  }
  bold {
    font-weight: bold;

  }
  .container {
    width: 80%;
    max-width: 800px;
    min-width: 400px;
    margin: auto;
    // background-color: white;
    padding: 20px;
    border-radius: 10px;
    border-color: red;
    border-style: solid;
    word-break: break-word;
  }
  .inside {}
</style>
  `;


  let body = `
<div class="container">
  <h1 align="Center">Page Blocked</h1>
  <p>This page has been blocked by the extension. To view this page, you can update your policy or create an exception for this URL or domain.</p>


  <h2>Page information</h2>
  <p><bold>URL</bold>: ${url}<br />
  <bold>Domain</bold>: ${new URL(url).hostname}</p>
  <p><bold>Language</bold>: ${urls[url].language}<br />
  <p><bold>Categorized</bold> as:<br/>
  <ul>
  ${categories.map((category: any) => {
    return `<li>${IABService.getName(category.iab)} - ${Math.round(category.score * 100)}%</li>`;
  }).join(', ')}
  </ul>
  </p>

  <h2>Policy applied</h2>
  <p>This page was blocked according to your policy:</p>
  <ul>
  ${blocked.map((category: any) => {
    return `<li>${IABService.getName(category.iab)} -  ${Math.round(category.score * 100)}%</li>`;
  }).join(', ')}
  </ul>
</div>
<span style="display: none;" id="${secret}"></span>
`;

    chrome.scripting.executeScript({
      target : source,
      func : blockPage,
      args: [head, body]
    });
  });
  
  return true;
}

/* Save the list of categories to block */
function savePolicy(webs : string[] = []) {
  policy = webs;

  return chrome.storage.local.set({ policy: webs.join(',') }).then(() => {
    console.log("Policy saved: " + webs.join(','));
  });
}

function loadPolicy(force : boolean = false) : Promise<string[]> {
  if (!force) {
    return new Promise((resolve) => resolve(policy));
  }

  return chrome.storage.local.get(["policy"]).then(async (result) => {
    console.log("Policy loaded");
    console.log(result);

    if (!result || ! result.policy) {
      console.log("No policy found");
      return [];
    }

    // @ts-ignore
    return result.policy.split(',');
  }).catch((error) => {
    console.error("loadPolicy failed")
    console.error(error);

    return [];
  });
}

/* Save exceptions */
function addDomainException(domain : string = '') {
  if (!exceptionsDomains.includes(domain)) {
    exceptionsDomains.push(domain); // do not save it across browser restart yet
  }
}

function addUrlException(url : string = '') {
  if (!exceptionsUrls.includes(url)) {
    exceptionsUrls.push(url); // do not save it across browser restart yet
  }
}


function isException(url : string = '') {
  return exceptionsUrls.includes(url) || exceptionsDomains.includes(new URL(url).hostname);
}

chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  // console.log(message);
  // console.log(sender);
  if(sender.id != chrome.runtime.id) {
    console.log(`Invalid sender: ${sender.id}`);
    return;
  }
    
  if (message && message.type == 'Action.save') {
    savePolicy(message.webs);
  }
  else if (message && message.type == 'Action.getPolicy') {
    loadPolicy().then((webs) => {
      console.log(`Sending policy: ${webs.join(',')}`);
      console.log(webs);
      //sendResponse({event: "getPolicy", webs});
      chrome.runtime.sendMessage({event: "getPolicy", webs});
    });

  }
  else if (message && message.type == 'Action.getExceptions') {
      chrome.runtime.sendMessage({event: "getExceptions", domains: exceptionsDomains, urls: exceptionsUrls});
  }
  else if (message && message.type == 'Action.getClassification') {
    console.log(message);
    let url = message.tab.url;

    if (urls[url]) {
      console.log("Already classified");
      return chrome.runtime.sendMessage({event: "getClassification", tabId: message.tab.id, language: urls[url].language, categories: urls[url].categories, url});
    }
  
    // No info, try to get it
    console.log("No classification saved");
    console.log();

    let source = {tabId: message.tab.id, allFrames: false};
    let params = {
      tabId: message.tab.id, 
      windowId: message.tab.windowId,
      url: message.tab.url,
    };
  
    chrome.scripting.executeScript({
      target : source,
      func : getPageInfo
    }).then(async (results) => {
      //console.log('getPageInfo:')
      //console.log(results);
  
      params = Object.assign(params, results[0].result);
  
      console.log("Extension.getClassification Params:");
      console.log(params);
  
      console.log("Send Extension.getClassification to native")
      sendMessageToApp(source, "Extension.getClassification", params);
    }).catch((error) => {
      console.error("getPageInfo failed")
      console.error(error);
    }).finally(() => {
      sendMessageToApp(source, "Extension.getClassification", params);
    });
  }
  else if (message && message.type == 'Action.Exception') {
    let scope = message.scope
    let value = message.value;

    if (scope == 'domain')
      addDomainException(value);
    else if (scope == 'url')
      addUrlException(value);
    else {
      console.error("Unknown scope");
      console.error(scope);
    } 
  }
  else {
    console.error("Unknown message");
    console.error(message);
  }
});


async function sendMessageToApp(source : any, eventName : string, params?: any) {
  try {
    let message = {source, eventName, params};
    let size = JSON.stringify(message).length;
    if (size >= 1024 * 1024) {
      console.error("Message is too big!: " + size);
    }
    port.postMessage(message);
  }
  catch(error) {
    console.error("port.postMessage failed");
    console.log(error);

    await chrome.runtime.sendNativeMessage("com.my_company.my_application", {source, eventName, params})
      .then((response) => {
        handleResponseFromApp(response);
      })
      .catch((error) => {
        console.error("runtime.sendNativeMessage");
        console.log(error);
      })
  }
}


/*chrome.storage.local.get(["autosave"]).then(async (result) => {
  // @ts-ignore
  await chrome.runtime.sendMessage({ type: "Auto.save", tab: null, value: result.autosave });
});*/


// Initialization
(async () => {
  policy = await loadPolicy(true);
  console.log("Policy loaded");
  console.log(policy);
})();