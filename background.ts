export {}
 
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

setInterval(() => {
    getCurrentTab().then((tab) => {
        console.log("TAB")
        console.log(tab)
    })
}, 1000)