import { tokenizeTitle } from "./tokenize/tokenizer";

export {}

// Checks if the tabs should be closed or not
const handleMessage = (message, sender, sendResponse) => {
    if (message.action === "closeTab" && sender.tab?.id) {
      chrome.tabs.remove(sender.tab.id, () => {
        console.log(`Closed tab with ID: ${sender.tab.id}`);
        sendResponse({ status: "Tab closed" });
      });
        // chrome.tabs.create({ url: "chrome-extension://plbomlddghmmeojlhbmeeelhgnpfalka/tabs/blockpage.html" });
      // Return true to indicate you wish to send a response asynchronously
      return true;
    }
    if (message.action === "openPopup") {
        console.log("opening popup")
        chrome.action.openPopup()
        return true;
    }
}

const parseTitle = (message, sender, sendResponse) => {
    if (message.action === "tokenizeTitle" && message.title) {
        const tokens = tokenizeTitle(message.title); 
        console.log("Tokenized title:", tokens);
        sendResponse({ status: "Title tokenized", tokens: tokens });
        return true; // Return true for asynchronous response
    }
}

const BACKEND_PATH = process.env.PLASMO_PUBLIC_BACKEND_PATH + "classify"

// Send an API request to Flask Backend to determine if the classification matches
// the productivity goal
const fetchClassification = ((message, sender, sendResponse) => {
    console.log("message", message)
    if (message.action === "classifyActivity") {
      fetch(BACKEND_PATH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({activity_description: message.description, goal: message.goal})
      })
      .then(response => response.json())
      .then(data => sendResponse({isProductive: data.is_productive}))
      .catch(error => console.error('Error:', error));
      return true; // indicates that the response is sent asynchronously
    }
  });

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onMessage.addListener(parseTitle)
chrome.runtime.onMessage.addListener(fetchClassification)


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