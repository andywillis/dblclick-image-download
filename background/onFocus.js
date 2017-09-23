!(function () {

  function onExecuted({ tabId }) {
    browser.tabs.sendMessage(tabId, { grabImages: true });
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  
  browser.tabs.onActivated.addListener(function ({ tabId }) {
    const file = '../content/dblclick-image-download.js';
    browser.tabs.executeScript(tabId, { file })
      .then(function (value) { onExecuted({ value, tabId }) })
      .catch(onError);
  });

})();
