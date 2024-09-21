import React from 'react'
import { Search, MapPin, Bed, Bath, Bookmark, MessageCircle } from 'lucide-react'
import PropertyList from '../components/PropertyList'

const properties = [
  {
    id: 1,
    title: "A Great Apartment Next to the Beach!",
    address: "456 Park Avenue, London",
    price: 1000,
    bedrooms: 2,
    bathrooms: 2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0-sliHHq4F_XV00jsdkaf5dSZUgxMAMkTw&s"
  },
  {
    id: 2,
    title: "A New Apartment in the City!",
    address: "101 Baker Street, London",
    price: 2000,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUnrxAl0ozn7JXPlbNNby6EWXzndbV6meEo6gw6WXdYlj0VSAmZMEJ0eLlEcv_ae_gBk4&usqp=CAU"
  },
  {
    id: 3,
    title: "Great Location! Great Price!",
    address: "234 Kingsway, London",
    price: 1500,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2blTgT5byRdhsqKmT_aA3naREtpqsVvzIUhuKc8duj4KSWJd01Tps0w0zfJssh41LCe0&usqp=CAU"
  }
]

export default function PropertyListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Search results for london</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow mb-8">
              <form className="flex flex-wrap gap-3 items-center">
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" id="location" name="location" defaultValue="london" className="w-full p-2 border rounded" />
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select id="type" name="type" className="w-full px-4 py-2 border rounded">
                    <option>Rent</option>
                    <option>Buy</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                  <select id="property" name="property" className="w-full p-2 border rounded">
                    <option>any</option>
                    <option>House</option>
                    <option>Apartment</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input type="number" id="minPrice" name="minPrice" defaultValue={10} className="w-full p-2 border rounded" />
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input type="number" id="maxPrice" name="maxPrice" defaultValue={5000} className="w-full p-2 border rounded" />
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mt-2">
                  <button type="submit" className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 flex items-center justify-center">
                    <Search className="mr-2" size={20} />
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {property.address}
                    </p>
                    <p className="text-2xl font-bold text-sky-500 mb-4">${property.price}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center">
                        <Bed size={16} className="mr-1" />
                        {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
                      </span>
                      <span className="flex items-center">
                        <Bath size={16} className="mr-1" />
                        {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 border rounded hover:bg-gray-100" aria-label="Bookmark property">
                        <Bookmark size={20} />
                      </button>
                      <button className="p-2 border rounded hover:bg-gray-100" aria-label="Contact agent">
                        <MessageCircle size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            <PropertyList/>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <img src="/placeholder.svg?height=600&width=400" alt="Map of London showing property locations" width={400} height={600} className="w-full h-[600px] object-cover" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}