export {}
const gracePeriod = 20000

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
  // Wait 20 seconds before calling the classifier so that the user has a chance to navigate away
  setTimeout(() => {
    chrome.runtime.sendMessage({action: "classifyActivity", description: description, goal: goal}, res => {
      console.log("Classification result:", res);
  
      if (res.isProductive === false) {
        // Close the tab if the classification result is false
        chrome.runtime.sendMessage({ action: "closeTab" }, response => {
          console.log("Tab closed", response);
        });
      }
    });
  }, gracePeriod)
}

