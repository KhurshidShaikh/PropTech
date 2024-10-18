import React, { useState, useEffect } from 'react'
import { Home } from 'lucide-react'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Building your dream home...')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setMessage('Welcome home!')
          return 100
        }
        return prevProgress + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])
    

  const houseStyles = {
    clipPath: `polygon(0% 100%, 100% 100%, 100% ${100 - progress}%, 0% ${100 - progress}%)`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <div className="relative w-32 h-32 mb-8">
        <Home className="w-full h-full text-gray-300" />
        <Home className="absolute top-0 left-0 w-full h-full text-blue-500 transition-all duration-300 ease-out" style={houseStyles} />
      </div>
      <div className="w-64 h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-lg font-semibold text-gray-700">{message}</p>
      
    </div>
  )
}