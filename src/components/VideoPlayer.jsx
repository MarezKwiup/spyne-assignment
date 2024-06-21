import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url, onPlay, onPause,onChangeTime }) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (url) {
      setPlayer(new ReactPlayer(url));
    }

  }, [url]);

  useEffect(()=>{
    const updateCurrentTime = () =>{
        if(player){
            //console.log("Current time is :h1 ",player.getCurrentTime());
            onChangeTime(player.getCurrentTime);
        }
    }

    console.log("Video ref is : ",player);
    
    const interval=setInterval(updateCurrentTime,100);

    return ()=>clearInterval(interval);
  },[player])

  const handlePlay = () => onPlay && onPlay();
  const handlePause = () => onPause && onPause();
  return (
    <div className="video-player">
      {player && (
        <ReactPlayer
          ref={setPlayer}
          url={url}
          controls
          onPlay={handlePlay}
          onPause={handlePause}
        />
      )}
    </div>
  );
};

export default VideoPlayer;