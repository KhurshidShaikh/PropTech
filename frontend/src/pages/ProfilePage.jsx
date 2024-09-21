import React from 'react'
import { MapPin, Bed, Bath, Bookmark, MessageSquare } from 'lucide-react'
import PropertyList from '../components/PropertyList'

const user = {
  name: 'Jane',
  email: 'john@gmail.com',
  avatar: "https://tse4.mm.bing.net/th?id=OIP.ql-KIgtQMdOYLswiLxAlCwHaJO&pid=Api&P=0&h=180",
}

const savedProperties = [
  {
    id: 1,
    title: 'A Great Apartment Next to the Beach!',
    address: '456 Park Avenue, London',
    price: 1000,
    bedrooms: 2,
    bathrooms: 2,
    image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",

  },
  {
    id: 2,
    title: 'A New Apartment in the City!',
    address: '101 Baker Street, London',
    price: 2000,
    bedrooms: 2,
    bathrooms: 1,
    image: 'https://tse4.mm.bing.net/th?id=OIP.1yjlIIIF3VDIkpjS9ct8OgHaE8&pid=Api&P=0&h=180'
  }
]

const messages = [
  { id: 1, sender: 'Jane', message: 'hi', avatar: 'https://tse4.mm.bing.net/th?id=OIP.ql-KIgtQMdOYLswiLxAlCwHaJO&pid=Api&P=0&h=180' },
  { id: 2, sender: 'Daniel Williams', message: 'thank you so much', avatar: 'https://tse4.mm.bing.net/th?id=OIP.ql-KIgtQMdOYLswiLxAlCwHaJO&pid=Api&P=0&h=180' },
  { id: 3, sender: 'Sophia Davis', message: 'great news!', avatar: 'https://tse4.mm.bing.net/th?id=OIP.ql-KIgtQMdOYLswiLxAlCwHaJO&pid=Api&P=0&h=180' },
  { id: 4, sender: 'David Martinez', message: "I'll be waiting", avatar: 'https://tse4.mm.bing.net/th?id=OIP.ql-KIgtQMdOYLswiLxAlCwHaJO&pid=Api&P=0&h=180' }
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
     

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="md:w-2/3">
            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">User Information</h2>
                <button className="bg-green-400 text-gray-900 px-4 py-2 rounded-md hover:bg-green-500">
                  Update Profile
                </button>
              </div>
              <div className="flex items-center mb-4">
                <img src={user.avatar} alt={user.name}  className="rounded-full mr-4  w-16 h-16" />
                <div>
                  <p className="font-medium">Username: {user.name}</p>
                  <p className="text-gray-600">E-mail: {user.email}</p>
                </div>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Logout
              </button>
            </div>

            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">My List</h2>
                <button className="bg-sky-400 text-gray-900 px-4 py-2 rounded-md hover:bg-sky-500">
                  Create New Post
                </button>
              </div>
              {/* {savedProperties.map((property) => (
                <div key={property.id} className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden mb-4">
                  <div className="sm:w-1/3">
                    <img src={property.image} alt={property.title} width={300} height={200} className="w-full h-48 object-cover" />
                  </div>
                  <div className="p-4 sm:w-2/3">
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {property.address}
                    </p>
                    <p className="text-2xl font-bold text-yellow-500 mb-4">${property.price}</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Bed size={16} className="mr-1" />
                        {property.bedrooms} bedroom
                      </span>
                      <span className="flex items-center">
                        <Bath size={16} className="mr-1" />
                        {property.bathrooms} bathroom
                      </span>
                    </div>
                   
                  </div>
                </div>
              ))} */}
              <PropertyList/>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Messages</h2>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-center bg-yellow-50 rounded-lg p-3">
                    <img src={message.avatar} alt={message.sender}  className="rounded-full mr-3 w-16 h-16" />
                    <div>
                      <p className="font-medium">{message.sender}</p>
                      <p className="text-gray-600">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}