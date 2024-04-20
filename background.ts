// import { PlasmoBackground } from "plasmo";

// @PlasmoBackground({
//   permissions: ["tabs"]
// })
export {}


function handleMessage(message, sender, sendResponse) {
    console.log("Are we here")
    if (message.action === "closeTab" && sender.tab?.id) {
      chrome.tabs.remove(sender.tab.id, () => {
        console.log(`Closed tab with ID: ${sender.tab.id}`);
        sendResponse({ status: "Tab closed" });
      });
      // Return true to indicate you wish to send a response asynchronously
      return true;
    }
}

chrome.runtime.onMessage.addListener(handleMessage);

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

// export class ExtensionBackground{
//     constructor() {
//         chrome.runtime.onMessage.addListener(this.handleMessage);
//     }

//     handleMessage = (message, sender, sendResponse) => {
//         if (message.action === "closeTab" && sender.tab?.id) {
//           chrome.tabs.remove(sender.tab.id, () => {
//             console.log(`Closed tab with ID: ${sender.tab.id}`);
//             sendResponse({ status: "Tab closed" });
//           });
//           // Return true to indicate you wish to send a response asynchronously
//           return true;
//         }
//     }

//     async function getCurrentTab() {
//         console.log("yo3")
//         let queryOptions = { active: true, lastFocusedWindow: true };
//         // `tab` will either be a `tabs.Tab` instance or `undefined`.
//         let [tab] = await chrome.tabs.query(queryOptions);
//         console.log("yo4")
//         return tab;
//     }

//     monitorTabs = () => {
//         this.getCurrentTab().then((tab) => {
//             // console.log("TAB")
//             console.log(tab)
//             console.log(tab["url"], "tab url")
//         })
//         setInterval(() => {
//             getCurrentTab().then((tab) => {
//                 // console.log("TAB")
//                 // console.log(tab)
//                 console.log(tab["url"], "tab url")
//             }).catch((err) => {
//                 console.error("Could not find url", err)
//             })
//         }, 1000)
//     }
// }
// const bg = new ExtensionBackground();
// bg.monitorTabs();