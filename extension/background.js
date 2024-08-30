chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "eval") {
    try 
    {
      const result = eval("(()=>{"+message.code+"})()");
      sendResponse({ result });
    } 
    catch (error) {
      sendResponse({ error: error.message });
    }
    return true;
  }
});
