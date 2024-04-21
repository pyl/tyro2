import { useState } from "react"
import styles from "./popup.module.css"

function IndexPopup() {
  const [data, setData] = useState("")

  const storeGoal = () => {
    // Store the goal in local storage
    chrome.runtime.sendMessage({ action: "sendGoal", goal: data }, response => {
      console.log("Goal sent to content script:", response);
    });
  }

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        Welcome to Resolve
      </div>
      <input 
        className={styles.goals} 
        onChange={(e) => setData(e.target.value)} 
        value={data} 
        placeholder="What is your goal today?"
      />
      <button className={styles.start} onClick={storeGoal}>
        Let's Get Started
      </button>
      <div className={styles.bottomDiv}>
        <a href="https://github.com/pyl/tyro2" target="_blank">
          About
        </a>
      </div>
    </div>
  )
}

export default IndexPopup
