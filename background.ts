import { tokenizeTitle } from "./tokenize/tokenizer";

export {}
let goal = ""

// Takes the goal from the input and stores it into the background

const storeGoal = (message, sender, sendResponse) => {
    if (message.action === "sendGoal") {
      goal = message.goal;
      console.log("Received goal:", goal);
    }
};

const getGoal = (message, sender, sendResponse) => {
    if (message.action == "retrieveMessage") {
        sendResponse({ result: goal})
    }
};

// Checks if the tabs should be closed or not
const handleMessage = (message, sender, sendResponse) => {

    // If the the message is closing a tab, we will use the Chrome API to
    // remove the tab and instantiate a new chrome tab showing that it was
    // blocked.
    if (message.action === "closeTab" && sender.tab?.id) {
        chrome.tabs.remove(sender.tab.id, () => {
            console.log(`Closed tab with ID: ${sender.tab.id}`);
            sendResponse({ status: "Tab closed" });
        });
        chrome.tabs.create({ url: chrome.runtime.getURL("tabs/blockpage.html") });
        // Return true to indicate you wish to send a response asynchronously
        return true;
    }
    if (message.action === "openPopup") {
        chrome.action.openPopup()
        return true;
    }
}

// Function to return the title in a sequence of tokens back to content
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

// List of chrome runtime listeners
chrome.runtime.onMessage.addListener(storeGoal)
chrome.runtime.onMessage.addListener(getGoal)
chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onMessage.addListener(parseTitle)
chrome.runtime.onMessage.addListener(fetchClassification)