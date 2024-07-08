import React, { useState } from "react";
import RegexHighlightInput from "./RegexHighlightInput";

function App() {
  const [value, setValue] = useState("");

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Regex Highlight Input Demo</h1>

      <h2>URL with baseurl highlighting:</h2>
      <RegexHighlightInput
        onChange={handleInputChange}
        highlightPattern={/\{\{baseUrl\}\}/g}
        placeholder="Enter URL with {{baseUrl}}"
        width="400px"
        highlightColor="rgba(255, 165, 0, 0.3)"
      />

      <h2>Text with any variable highlighting:</h2>
      <RegexHighlightInput
        onChange={handleInputChange}
        highlightPattern={/\{\{.*?\}\}/g}
        placeholder="Enter text with {{variables}}"
        width="400px"
        highlightColor="rgba(76, 175, 80, 0.3)"
      />

      <h2>Email address highlighting:</h2>
      <RegexHighlightInput
        onChange={handleInputChange}
        highlightPattern={/[^\s@]+@[^\s@]+\.[^\s@]+/g}
        placeholder="Enter an email address"
        width="300px"
        highlightColor="rgba(33, 150, 243, 0.3)"
      />

      <h3>Current Input Value:</h3>
      <p>{value}</p>
    </div>
  );
}

export default App;
