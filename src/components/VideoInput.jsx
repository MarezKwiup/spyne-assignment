import React, { useState } from "react";

const VideoInput = ({ onUrlChange }) => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleChange = (e) => setVideoUrl(e.target.value);
  const handleSetUrl = () => onUrlChange(videoUrl);

  return (
    <div>
      <label htmlFor="videoUrl">Add video URL</label>
      <input
        type="text"
        id="videoUrl"
        placeholder="Enter Video URL"
        value={videoUrl}
        onChange={handleChange}
      />
      <button onClick={handleSetUrl}>Set URL</button>
    </div>
  );
};

export default VideoInput;
