import React from 'react'
import { Search, MapPin, Bed, Bath, Bookmark, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PropertyList = ({posts}) => {
 const navigate=useNavigate();
      
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
   { posts.length>0?(posts.map((property) => (
      <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={()=>navigate(`/postdetail/${property._id}`)}>
        <div className="relative h-48">
          <img src={property?.basicInfo?.images[0]} alt={property?.basicInfo?.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{property?.basicInfo?.title}</h2>
          <p className="text-gray-600 mb-2 flex items-center">
            <MapPin size={16} className="mr-1" />
            {property.basicInfo.city}
          </p>
          <p className="text-2xl font-bold text-sky-500 mb-4">Rs {property?.basicInfo?.price}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center">
              <Bed size={16} className="mr-1" />
              {property?.basicInfo?.bedroom} bedroom{property?.basicInfo?.bedroom !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center">
              <Bath size={16} className="mr-1" />
              {property?.basicInfo?.bathroom} bathroom{property?.basicInfo?.bathroom !== 1 ? 's' : ''}
            </span>
          </div>
         
        </div>
      </div>
    ))):(<h2>No Properties !</h2>)}
  </div>
  )
}

export default PropertyList
