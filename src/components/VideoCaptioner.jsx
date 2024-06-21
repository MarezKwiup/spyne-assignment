import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer"; // Import your VideoPlayer component
import CaptionInput from "./CaptionInput"; // Import your CaptionInput component
import CurrentCaption from "./CurrentCaption"; // Import your CurrentCaption component
import VideoInput from "./VideoInput"; // Import your VideoInput component

const VideoCaptioner = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = React.createRef();

  const handleCurrentTime = (time) => {
    setCurrentTime(time);
  };

  useEffect(() => {
    const interval = setInterval(
      () => console.log("Current time is :", currentTime),
      100
    );

    return () => clearInterval(interval);
  }, [videoRef]);

  const handleCaptionInput = (parsedCaptions) => {
    setCaptions(parsedCaptions.captions);
    if (parsedCaptions.error) {
      console.log("Error is : ", parsedCaptions.error);
    }
  };

  const handleVideoUrlChange = (url) => setVideoUrl(url);
  return (
    <div className="container">
      {/* Video Input */}
      <div className="input-container">
        <VideoInput onUrlChange={handleVideoUrlChange} />
      </div>
      {videoUrl && (
        <div className="video-container">
          <VideoPlayer
            url={videoUrl}
            ref={videoRef}
            onPlay={() => console.log("Playing video")}
            onPause={() => console.log("Pausing video")}
            onChangeTime={handleCurrentTime}
          />
        </div>
      )}

      {/* Caption Input */}
      <div className="input-container">
        <CaptionInput onCaptionInput={handleCaptionInput} />
      </div>

      {/* Current Caption */}
      {captions.length > 0 && (
        <div className="caption-container">
          <CurrentCaption captions={captions} currentTime={currentTime} />
        </div>
      )}
    </div>
  );
};

export default VideoCaptioner;
