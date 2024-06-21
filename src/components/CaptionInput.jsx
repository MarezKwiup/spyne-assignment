import React, { useState } from "react";

function parseCaptions(data) {
  const captions = [];
  const lines = data.split("\n");
  let isValid = true;
  let errorMessage = null;

  for (const line of lines) {
    const parts = line.split(" ");
    if (parts.length < 3) {
      isValid = false;
      errorMessage = "Invalid caption format";
      break;
    }

    const text = parts.slice(0, -1).join(" ");
    const timeRange = parts[parts.length - 1];
    const trimmedTimeRange = timeRange.trim().slice(1, -1); // Trim whitespace and remove brackets

    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])-([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    const match = trimmedTimeRange.match(timeRegex);

    if (!match) {
      return { isValid: false, error: 'Invalid time format.' }; // Handle invalid format
    }

    const startTime = parseInt(match[1]) * 60 * 60 + parseInt(match[2]) * 60 + parseInt(match[3]); // Convert to milliseconds
    const endTime = parseInt(match[4]) * 60 * 60 + parseInt(match[5]) * 60 + parseInt(match[6]); // Convert to milliseconds

    if (startTime >= endTime) {
      isValid = false;
      errorMessage = 'Start time cannot be after end time.';
      break;
    }

    captions.push({ text, startTime, endTime });
  }
  return { isValid, captions, error: errorMessage };
}

const CaptionInput = ({ onCaptionInput }) => {
  const [captionData, setCaptionData] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => setCaptionData(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedCaptions = parseCaptions(captionData);
    if (!parsedCaptions.isValid) {
      setErrorMessage(parsedCaptions.error);
      return;
    }
    onCaptionInput(parsedCaptions);
    setCaptionData("");
    setErrorMessage(null);
    setSuccessMessage("Caption added");

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter captions (format: text [start time]-[end time] in [HH:mm:ss])&#10;Ex:This is the first caption. [00:00:00]-[00:00:02]"
        value={captionData}
        onChange={handleInputChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button type="submit">Add Captions</button>
    </form>
  );
};

export default CaptionInput;
