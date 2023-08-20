import React from 'react'
import IsometricGridCanvas from '../components/canvas/IsometricGridCanvas'

function GamePage() {
  return (
    <div className='grid w-full h-screen overflow-hidden'>
        <IsometricGridCanvas />
    </div>
  )
}

export default GamePage