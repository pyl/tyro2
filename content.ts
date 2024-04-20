export {}

// Retrieve the title of the HTML page that we will categorize
const titleElt = document.getElementsByTagName("title")[0]
const searchTitle = titleElt ? titleElt.innerText : "No title found";
console.log(searchTitle)

// Parse the url into tokens into a list of tokens
chrome.runtime.sendMessage({action: "tokenizeTitle", title: searchTitle}, response => {
  console.log("Request to tokenize title sent", response)
})

// Send a request to close a specific tab
if (window.location.hostname.includes("youtube.com")) {
  chrome.runtime.sendMessage({ action: "closeTab" }, response => {
      console.log("Request sent to close the tab", response);
  });
}