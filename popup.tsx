import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")
  //todo: how to call browser APIs 

  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
      
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo sis!!!
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
