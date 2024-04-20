import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Welcome to Tyro!!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} placeholder="What are your goals?"/>
      <button>Let's Get Started</button>
      <a href="https://docs.plasmo.com" target="_blank">
        About
      </a>
    </div>
  )
}

export default IndexPopup
