import React, { useState } from "react";

function parseCaptions(data) {
  const captions = [];
  const lines = data.split("\n");
  let isValid=true;
  let errorMessage=null;
  for (const line of lines) {
    const parts = line.split(" ");
    if (parts.length < 3) {
        isValid=false;
        errorMessage="Invalid caption format";
        break;
    }

    const text = parts.slice(0, -1).join(" ");
    const timeRange = parts[parts.length - 1];
    const trimmedTimeRange = timeRange.trim().slice(1, -1); // Trim whitespace and remove brackets
    console.log("Time range trimmed is : ",trimmedTimeRange);
    
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])-([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    const match = trimmedTimeRange.match(timeRegex);
    console.log("Match is : ",match);

    if (!match) {
        console.log("Regex didnt match");
      return { isValid: false, error: 'Invalid time format.' }; // Handle invalid format
    }

    console.log("Start time : ",`${match[1]}:${match[2]}:${match[3]}`)
    console.log("End time : ",`${match[4]}:${match[5]}:${match[6]}`)

    const startTime = parseInt(match[1])*60*60+parseInt(match[2])*60+parseInt(match[3]) // Convert to milliseconds
    const endTime = parseInt(match[4])*60*60+parseInt(match[5])*60+parseInt(match[6]) // Convert to milliseconds

    console.log("Start time state: ",startTime)
    console.log("End time state: ",endTime)

    if (startTime >= endTime) {
      isValid=false;
      errorMessage='Start time cannot be after end time.'
      break;
    }

    captions.push({ text, startTime, endTime });
  }
  return { isValid, captions, error:errorMessage};
}

const CaptionInput = ({ onCaptionInput }) => {
  const [captionData, setCaptionData] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => setCaptionData(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedCaptions = parseCaptions(captionData);
    console.log("Parsed captions are : ",parsedCaptions);
    if (!parsedCaptions.isValid) {
      setErrorMessage(parsedCaptions.error);
      return;
    }
    onCaptionInput(parsedCaptions);
    setCaptionData("");
    setErrorMessage(null);
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter captions (format: text [start time]-[end time])"
        value={captionData}
        onChange={handleInputChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Add Captions</button>
    </form>
  );
};

export default CaptionInput;
