import React from 'react'
import { Search, MapPin, Bed, Bath, Bookmark, MessageCircle } from 'lucide-react'

const PropertyList = () => {
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
      
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  </div>
  )
}

export default PropertyList
