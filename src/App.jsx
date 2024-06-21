import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoInput from './components/VideoInput'
import CaptionInput from './components/CaptionInput'
import VideoPlayer from './components/VideoPlayer'
import VideoCaptioner from './components/VideoCaptioner'
import Header from './components/Header'

function App() {
  const videoUrl="https://www.youtube.com/watch?v=Ad_TEk94B9Q";
  return (
    <>
      <Header/>
      <VideoCaptioner/>
    </>
  )
}

export default App
