import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import CaptionInput from "./CaptionInput";
import CurrentCaption from "./CurrentCaption";
import VideoInput from "./VideoInput";

const VideoCaptioner = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [captions, setCaptions] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
  
    const handleCurrentTime = (time) => {
      setCurrentTime(time);
    };
  
    useEffect(() => {
      const interval = setInterval(
        () => console.log("Current time is :", currentTime),
        100
      );
  
      return () => clearInterval(interval);
    }, [currentTime]);
  
    const handleCaptionInput = (parsedCaptions) => {
      setCaptions((prevCaptions) =>{
        const newCaptions=[...prevCaptions];
        for(let i=0;i<parsedCaptions.captions.length;i++){
            newCaptions.push(parsedCaptions.captions[i]);
        }
        console.log(newCaptions);
        return newCaptions;
      });
      if (parsedCaptions.error) {
        console.log("Error is : ", parsedCaptions.error);
      }
    };
  
    const handleVideoUrlChange = (url) => {
      setVideoUrl(url);
      setCaptions([]); 
    };
  
    return (
      <div className="container">
        {/* Video Input */}
        <div className="url-section">
          <VideoInput onUrlChange={handleVideoUrlChange} />
        </div>
        {videoUrl && (
          <div className="video-container">
            <VideoPlayer
              url={videoUrl}
              onPlay={() => console.log("Playing video")}
              onPause={() => console.log("Pausing video")}
              onChangeTime={handleCurrentTime}
            />
          </div>
        )}
  
        <div className="input-container">
          <CaptionInput onCaptionInput={handleCaptionInput} />
        </div>
  
        {captions.length > 0 && (
          <div className="caption-container">
            <CurrentCaption captions={captions} currentTime={currentTime} />
          </div>
        )}
      </div>
    );
  };
  
  export default VideoCaptioner;
