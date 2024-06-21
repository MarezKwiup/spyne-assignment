import React from 'react'

const CurrentCaption = ({captions,currentTime}) => {

    const currentCaption=captions.find(
        (caption)=>currentTime>=caption.startTime && currentTime <=caption.endTime
    );
  return (
    <p>{currentCaption&&currentCaption.text}</p>
  )
}

export default CurrentCaption