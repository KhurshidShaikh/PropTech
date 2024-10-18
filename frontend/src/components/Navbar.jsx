import React, { useState } from 'react'
import { Search, Building2, Award, Home, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import noavatar from "../assets/noavatar.jpg"
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user=useSelector((state)=>state.user.currentUser)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        <div className="flex items-center space-x-2" onClick={()=>navigate("/")}>
          <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <span className="text-xl sm:text-2xl font-bold text-primary">Proptech</span>
        </div>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 sm:left-10 right-0 bg-white md:bg-transparent shadow-md md:shadow-none space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0`}>
          <Link to="/" className="text-sm lg:text-base text-gray-600 hover:text-primary transition-colors">Home</Link>
          <a href="#about" className="text-sm lg:text-base text-gray-600 hover:text-primary transition-colors">About</a>
          <Link to="/contact" className="text-sm lg:text-base text-gray-600 hover:text-primary transition-colors">Contact</Link>
          
        </nav>
        {
          user?(
            <div className="flex items-center space-x-4">
            <img src={user.avatar?user.avatar:noavatar} alt="User Avatar"  className="rounded-full w-12 h-12" />
            <span className="font-medium hidden sm:block">{`${user.username}`}</span>
            <button 
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 relative"
            onClick={()=>navigate(`/profile/${user._id}`)}
            >
              Profile
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" >1</span> */}
            </button>
          </div>
          ):(
              <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="bg-blue-400 text-white text-sm lg:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-500 transition-colors" onClick={() => navigate('/login')}>Sign in</button>
            <button className="bg-blue-400 text-white text-sm lg:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-blue-500 transition-colors" onClick={() => navigate('/register')}>Sign up</button>
          </div>
          )
        }
      

          
      </div>
    </header>
  )
}

export default Navbar
