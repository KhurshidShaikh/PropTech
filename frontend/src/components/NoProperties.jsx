import React, { useState, useEffect } from 'react'
import { Home, Search, ArrowRight } from 'lucide-react'

export default function NoProperties() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSearch = () => {
    e.preventDefault()
    setIsAnimating(true)
    console.log('Searching for:', searchTerm)
    setTimeout(() => {
      setIsAnimating(false)
      setSearchTerm('')
    }, 2000)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <div className={`relative mb-8 transition-transform duration-1000 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
        <Home className="w-32 h-32 text-indigo-300" />
        <Search className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-indigo-500 transition-opacity duration-1000 ${isAnimating ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
        No Properties Found
      </h2>
    </div>
  )
}