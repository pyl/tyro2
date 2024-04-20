export {}
console.log(
  "Hello, you are on the wrong page bro"
)

console.log(window.location.hostname)

// Send a request to close a specific tab
if (window.location.hostname.includes("youtube.com")) {
  chrome.runtime.sendMessage({ action: "closeTab" }, response => {
      console.log("Request sent to close the tab", response);
  });
}