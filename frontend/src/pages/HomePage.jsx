import { useState } from 'react'
import { Search, Building2, Award, Home } from 'lucide-react'
import Footer from '../components/Footer'

export default function HomePage() {
  const [searchType, setSearchType] = useState('buy')

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex flex-col">
     
      <main className="container mx-auto px-4 py-4 flex-grow flex flex-col lg:flex-row items-center overflow-y-auto">
        <div className="lg:w-1/2 lg:pr-8 xl:pr-16 mt-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Discover your perfect home with PropTech. We offer a wide range of properties to suit every need and budget. Start your journey to homeownership today!
          </p>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex mb-4 gap-4">
              <button
                className={`flex-1 py-2 text-center text-sm sm:text-base ${searchType === 'buy' ? 'bg-sky-500 ' : 'bg-gray-100 '} rounded-l-md transition-colors`}
                onClick={() => setSearchType('buy')}
              >
                Buy
              </button>
              <button
                className={`flex-1 py-2 text-center text-sm sm:text-base ${searchType === 'rent' ? 'bg-sky-500 ' : 'bg-gray-100 '} rounded-r-md transition-colors`}
                onClick={() => setSearchType('rent')}
              >
                Rent
              </button>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/3 px-2 mb-4">
                <input type="text" placeholder="City" className="w-full p-2 border rounded-md text-sm" />
              </div>
              <div className="w-full sm:w-1/3 px-2 mb-4">
                <input type="text" placeholder="Min Price" className="w-full p-2 border rounded-md text-sm" />
              </div>
              <div className="w-full sm:w-1/3 px-2 mb-4">
                <input type="text" placeholder="Max Price" className="w-full p-2 border rounded-md text-sm" />
              </div>
            </div>
            <button className="w-full bg-sky-500  text-white p-2 rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center text-sm sm:text-base">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Search Properties
            </button>
          </div>
          <div className="flex justify-between mt-8 sm:mt-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">16+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">200</div>
              <div className="text-gray-600 text-xs sm:text-sm">Award Gained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">2000+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Property Ready</div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative w-full h-[400px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.jpg?s=612x612&w=0&k=20&c=SFybbpGMB0wIoI0tJotFqptzAYK_mICVITNdQIXqnyc="
              alt="Modern apartment building showcasing PropTech's real estate offerings"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute top-4 right-4 bg-sky-500 text-white p-2 rounded-full">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}