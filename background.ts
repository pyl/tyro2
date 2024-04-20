export {}
console.log("is this working")
const CHECK = true

async function getCurrentTab() {
    console.log("yo3")
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log("yo4")
    return tab;
  }

getCurrentTab().then((tab) => {
    // console.log("TAB")
    console.log(tab)
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