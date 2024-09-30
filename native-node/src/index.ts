const JsonLogFile = require('json-log-file');
import fs from 'fs';
import path from 'path';

const initNativeMessagingHost = require('node-native-messaging-host');

import NewLanguage from './helpers/classifier/NewLanguage';
import Prediction from './helpers/classifier/Prediction';


// Directory to hold log files
if (!fs.existsSync('./log')) {
  fs.mkdirSync('./log');
}

const log = new JsonLogFile('./log/default.log', {showInConsole: false, useBuffer: true, bufferSavingTimeout: 1000});


const prediction = new Prediction();
const language = new NewLanguage();
var policy : string[] = [];

log.save('Native (node.js) application has started');

const nm = initNativeMessagingHost();


// Test mode
var args = process.argv.slice(2);
args.forEach(async (arg) => {
  if ([ 'test', '--test'].includes(arg)) {
    console.log('Test mode');
    let categories = await prediction.predictText("This is a test", "en");
    console.log(categories);

    process.exit(0);
  }
});


function send(args : any) {
  nm.send(JSON.stringify(args))
}

loadPolicy();

nm.addOnMessageListener(async (error: any, msg: any) => {
    //log.save(msg);

  if (msg.eventName == "Extension.getClassification") {
    log.save(msg.eventName);
    loadPolicy()
    // log.save(msg).params;

    let blocked = false;

    try {
      // let info = preparation.parseHtml(msg.params.html, msg.params.url, false);
      let text = msg.params.body + " " + msg.params.title;
      let lang = await language.getPreferredLanguage(text, ['en']);

      if (lang != 'en') {
        log.save(`Language ${lang} not supported`);

        if (policy.includes('IAB24-5')) {
          blocked = true;
        }

        send({command: "languageNotSupported", url: msg.params.url, language, frameId: msg.params.frameId, tabId: msg.source.tabId, blocked});
        return;
      }

      // prediction.predictHtml(msg.params.html, msg.params.url, info, lang).then((categories) => {
      prediction.predictText(text, lang).then((categories) => {
        log.save({categories, url: msg.params.url});

        if (categories.some((result) => policy.includes(result.iab) && result.score >= 0.5))
          blocked = true;

        send({command: "classification", categories, url: msg.params.url, frame: msg.params.frameId, tab: msg.source.tabId, language: lang, blocked});
      }).catch((e) => {
        log.save('Error Extension.getClassification  prediction.predictHtml');
        log.save(e);
      });
    }
    catch(e) {
      log.save('Error Extension.getClassification');
      log.save(e);
    }
  }
  else if (msg.eventName == "Extension.getPolicy") {
    log.save(msg.eventName);
    // log.save(msg).params;

    send({command: "policy", policy});
  }
  else {
    log.save(`Unknown event ${msg.eventName}`);
  }
});


function loadPolicy() {
  try {
    let data : string = fs.readFileSync(__dirname + path.sep + 'policy.json', 'utf8');
    policy = JSON.parse(data);

    log.save(`Policy loaded: ${policy.join(',')}`);
  }
  catch(e) {
    log.save('Error loading policy.json');
    log.save(e);
  }
}