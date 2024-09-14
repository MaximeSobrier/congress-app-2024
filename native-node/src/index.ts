const JsonLogFile = require('json-log-file');

const initNativeMessagingHost = require('node-native-messaging-host');

import NewLanguage from './helpers/classifier/NewLanguage';
import Prediction from './helpers/classifier/Prediction';

const log = new JsonLogFile('../log/default.log', {showInConsole: false, useBuffer: true, bufferSavingTimeout: 1000});


const prediction = new Prediction();
const language = new NewLanguage();

log.save('Native (node.js) application has started');

const nm = initNativeMessagingHost();


// Test mode
var args = process.argv.slice(2);
args.forEach(async (arg) => {
  if ([ 'test', '--test'].includes(arg)) {
    console.log('Test mode');
    let categories = prediction.predictText("This is a test", "en");
    console.log(categories);
  }
});


function send(args : any) {
  nm.send(JSON.stringify(args))
}

nm.addOnMessageListener(async (error: any, msg: any) => {
    //log.save(msg);

    if (msg.eventName == "Extension.getClassification") {
      log.save(msg.eventName);
      // log.save(msg).params;

      try {
        // let info = preparation.parseHtml(msg.params.html, msg.params.url, false);
        let text = msg.params.body + " " + msg.params.title;
        let lang = await language.getPreferredLanguage(text, ['en']);

        if (lang != 'en') {
          log.save(`Language ${lang} not supported`);
          send({command: "languageNotSupported", url: msg.params.url, language, frameId: msg.params.frameId, tabId: msg.source.tabId});
          return;
        }

        // prediction.predictHtml(msg.params.html, msg.params.url, info, lang).then((categories) => {
        prediction.predictText(text, lang).then((categories) => {
          log.save({categories, url: msg.params.url});
          send({command: "classification", categories, url: msg.params.url, frame: msg.params.frameId, tab: msg.source.tabId, language: lang});
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
  else {
    log.save(`Unknown event ${msg.eventName}`);
  }
});
