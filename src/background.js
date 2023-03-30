
function addListener(){
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.greeting=='getTokenInfo'){
      
    }
  });
}

addListener()