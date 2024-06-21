import React, { useState } from "react";

const VideoInput = ({ onUrlChange }) => {
  const [videoUrl, setVideoUrl] = useState("");

  const handleChange = (e) => setVideoUrl(e.target.value);
  return (
    <input
      type="text"
      placeholder="Enter Video URL"
      value={videoUrl}
      onChange={handleChange}
      onBlur={() => onUrlChange(videoUrl)}
    />
  );
};

export default VideoInput;
