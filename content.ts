export {}

// Retrieve the title of the HTML page that we will categorize
const titleElt = document.getElementsByTagName("title")[0]
const searchTitle = titleElt ? titleElt.innerText : "No title found";
console.log(searchTitle)

// Parse the url into tokens into a list of tokens
chrome.runtime.sendMessage({action: "tokenizeTitle", title: searchTitle}, response => {
  console.log("Request to tokenize title sent", response)

  const tokens = response.tokens.join(" "); // Join tokens for the description
  classifyActivity(tokens, "get better at crochet");
})

// Send a message to background.ts for to classify your goal
const classifyActivity = (description, goal) => {
  chrome.runtime.sendMessage({action: "classifyActivity", description: description, goal: goal}, response => {
    console.log("Classification result:", response);
  });
}

// Send a request to close a specific tab
if (window.location.hostname.includes("youtube.com")) {
  chrome.runtime.sendMessage({ action: "closeTab" }, response => {
      console.log("Request sent to close the tab", response);
  });
}


console.log("sending message to open popup")
  chrome.runtime.sendMessage({ action: "openPopup" }, response => {
      console.log("Request sent to open popup", response);
  });
