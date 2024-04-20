import { tokenizeTitle } from "./tokenize/tokenizer";

export {}

// Checks if the tabs should be closed or not
function handleMessage(message, sender, sendResponse) {
    if (message.action === "closeTab" && sender.tab?.id) {
      chrome.tabs.remove(sender.tab.id, () => {
        console.log(`Closed tab with ID: ${sender.tab.id}`);
        sendResponse({ status: "Tab closed" });
      });
      // Return true to indicate you wish to send a response asynchronously
      return true;
    }
}

function parseTitle(message, sender, sendResponse) {
    if (message.action === "tokenizeTitle" && message.title) {
        const tokens = tokenizeTitle(message.title); 
        console.log("Tokenized title:", tokens);
        sendResponse({ status: "Title tokenized", tokens: tokens });
        return true; // Return true for asynchronous response
    }
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onMessage.addListener(parseTitle)


async function getCurrentTab() {
    console.log("Fetching current tab")
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    if (!tab) {
        console.error("No tab found!")
        return
    }
    console.log("Tab url", tab.url)
    return tab;
}

getCurrentTab().then((tab) => {
    // console.log("TAB")
    console.log(tab["url"], "tab url")
})

setInterval(() => {
    getCurrentTab().then((tab) => {
        // console.log("TAB")
        // console.log(tab)
        console.log(tab["url"], "tab url")
    }).catch((err) => {
        console.error("Could not find url", err)
    })
}, 1000)