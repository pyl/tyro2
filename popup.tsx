import { useEffect, useState } from "react"



const TyroPopup = () => {
  const [data, setData] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check the current state from local storage when the popup opens
    chrome.storage.local.get("isEnabled", (result) => {
        if (result.isEnabled !== undefined) {
            setIsEnabled(result.isEnabled);
        }
    });
  }, []);

  // Toggle the extension's functionality to be on or off
  const enableExtension = () => {
      const newState = !isEnabled;
      setIsEnabled(newState);
      // Save the new state to Chrome's local storage
      chrome.storage.local.set({ isEnabled: newState });
  };

  return (
    <div style={{ padding: 16 }}>
        <h2>Welcome to Tyro!!</h2>
        <input onChange={(e) => setData(e.target.value)} value={data} />
        <button onClick={enableExtension}>Let's Get Started</button>
    </div>
  );
}

export default TyroPopup
