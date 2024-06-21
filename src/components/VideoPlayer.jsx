import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url, onPlay, onPause, onChangeTime }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (playerRef.current) {
        onChangeTime(playerRef.current.getCurrentTime());
      }
    };

    const interval = setInterval(updateCurrentTime, 100);

    return () => clearInterval(interval);
  }, [onChangeTime]);

  return (
    <div className="video-player">
      <ReactPlayer
        ref={playerRef}
        url={url}
        controls
        onPlay={onPlay}
        onPause={onPause}
      />
    </div>
  );
};

export default VideoPlayer;
