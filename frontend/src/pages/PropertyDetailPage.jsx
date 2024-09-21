import React from 'react'
import { MapPin, Bed, Bath, Maximize, School, Bus, Utensils, MessageCircle, Bookmark } from 'lucide-react'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from 'react';



export default function PropertyDetailPage() {
    const property = {
        title: "A Cozy Apartment in the City",
        address: "890 Regent Street, London",
        price: 2500,
        description: "Welcome to your new home! This cozy two-bedroom apartment is now available for rent. Situated in a convenient location, this apartment offers modern amenities and comfort. Featuring a spacious living area, a fully-equipped kitchen, and a comfortable bedroom, it's the perfect space to relax and unwind. With nearby shops, restaurants, and public transportation options, everything you need is within reach. Don't miss out on the opportunity to make this apartment your own. Schedule a viewing today!",
        images: [
          "https://tse4.mm.bing.net/th?id=OIP.1yjlIIIF3VDIkpjS9ct8OgHaE8&pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th?id=OIP.uqS_TW48DPK_ulMGQ4M3wgHaEo&pid=Api&P=0&h=180",
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
          "https://wallup.net/wp-content/uploads/2019/09/977995-mansion-house-architecture-luxury-building-design.jpg",
        ],
        agent: {
          name: "Jane",
          image: "https://tse4.mm.bing.net/th?id=OIP.ql-KIgtQMdOYLswiLxAlCwHaJO&pid=Api&P=0&h=180"
        },
        details: {
          size: "100 sqft",
          bedrooms: 2,
          bathrooms: 1
        },
        amenities: [
          { name: "Utilities", description: "Tenant is responsible" },
          { name: "Pet Policy", description: "Pets Allowed" },
          { name: "Income Policy", description: "At least double the rent amount" }
        ],
        nearbyPlaces: [
          { name: "School", distance: "500m away", icon: School },
          { name: "Bus Stop", distance: "200m away", icon: Bus },
          { name: "Restaurant", distance: "450m away", icon: Utensils }
        ]
      }
        
const [isOpen, setIsOpen] = useState(false);
const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
     

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <img src={property.images[0]} alt="Main image" 
          className="w-full h-auto rounded-lg shadow-md"
          onClick={() => { setPhotoIndex(0); setIsOpen(true); }}
          />
        </div>
        <div className="space-y-4">
          {property.images.slice(1).map((src, index) => (
            <img key={index} src={src} alt={`Thumbnail ${index + 1}`}
             className="w-full h-auto rounded-lg shadow-md"
             onClick={() => { setPhotoIndex(index + 1); setIsOpen(true); }}
              />
          ))}
        </div>
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={property.images.map(src => ({ src }))}
        index={photoIndex}
      />
    </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {property.address}
                  </p>
                </div>
                <div className="text-2xl font-bold text-sky-500">${property.price}</div>
              </div>
              <div className="flex items-center mb-4 ">
                <img src={property.agent.image} alt={property.agent.name}  className="rounded-full mr-2  w-16 h-16" />
                <span>{property.agent.name}</span>
              </div>
              <p className="text-gray-700 mb-6 ">{property.description}</p>
             
            </div>
          </div>

          <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">General</h2>
                <ul className="space-y-2">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-gray-200 rounded-full p-2 mr-3">
                        <Maximize size={16} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{amenity.name}</h3>
                        <p className="text-sm text-gray-600">{amenity.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
             </div>

            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
              <h2 className=" text-xl font-semibold mb-4">Sizes</h2>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <Maximize size={20} className="mr-2" />
                  <span>{property.details.size}</span>
                </div>
                <div className="flex items-center">
                  <Bed size={20} className="mr-2" />
                  <span>{property.details.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath size={20} className="mr-2" />
                  <span>{property.details.bathrooms} bathroom</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-4">Nearby Places</h2>
              <ul className="space-y-2">
                {property.nearbyPlaces.map((place, index) => (
                  <li key={index} className="flex items-center">
                    <place.icon size={20} className="mr-2" />
                    <span>{place.name}</span>
                    <span className="ml-auto text-sm text-gray-600">{place.distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-64">
                <img src="/placeholder.svg?height=300&width=400" alt="Map of property location" />
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-400 text-gray-900 py-2 px-4 rounded hover:bg-blue-500 flex items-center justify-center">
                <MessageCircle size={20} className="mr-2" />
                Send a Message
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 flex items-center justify-center">
                <Bookmark size={20} className="mr-2" />
                Save the Place
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}