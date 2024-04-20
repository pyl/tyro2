export {}
console.log(
  "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
)

async function getCurrentTab() {
    console.log("yo3")
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log("yo4")
    return tab;
  }

getCurrentTab().then((tab) => {
    console.log("TAB")
    console.log(tab)
})


console.log("yo")
console.log("yo2")
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("example.com")) {
    await chrome.tabs.remove(tabId);
    }
});