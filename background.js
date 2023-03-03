// Listen for a click on the browser action.
browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    let tab = tabs[0]; // Safe to assume there will only be one result

    const url = tab.url;

    if (url.includes("https://chat.openai.com/chat")) {
      const executing = browser.tabs.executeScript({
        file: 'injected.js'
      });
       
      executing.then(copyToClipboard, undefined)
    } else {
      alert('gptchat not detected');
    }

  }, console.error)
});

function copyToClipboard(result) {
  const output = result[0];
  const elem = document.createElement('textarea');
  elem.value = output;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
  alert('text copied!');
  
}

function alert(msg) {
  browser.notifications.create({
    type : 'basic',
    message : msg,
    title : 'GPTSave Notification'
});
}