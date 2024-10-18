import React from 'react'
import { MapPin, Bed, Bath, Maximize, School, Bus, Utensils, MessageCircle, Bookmark,X,Check,Droplets ,Building,Armchair} from 'lucide-react'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState ,useEffect} from 'react';
import { useLoaderData ,useNavigate} from 'react-router-dom';
import noavatar from "../assets/noavatar.jpg"
import Map from '../components/Map';
import axios from '../api/axios';
import { useSelector } from 'react-redux';
import PropertyReviews from '../components/PropertyReviews';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function PropertyDetailPage() {
        
const [isOpen, setIsOpen] = useState(false);
const [photoIndex, setPhotoIndex] = useState(0);
const [citycoordinates,seCityCoordinates]=useState([])
const navigate=useNavigate()
const currentUser=useSelector((state)=>state.user.currentUser)
const [saved, setSaved] = useState();

const property=useLoaderData();
console.log("property details:",property);
if (!property || !property.basicInfo || !property.postDetail) {
  return (
      <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-xl font-bold">Property details are not available at the moment.</h1>
      </div>
  );
}

const getCoordinates = async () => {
  try {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
      params: {
        text:property.basicInfo.city,
        format: 'json',
        apiKey: '33dee3c05442474b9daff793af34f7e0'
      },
      withCredentials:false
    });
    if (response.data && response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      console.log("Setting city coordinates:", [result.lat, result.lon]);
      seCityCoordinates([result.lat, result.lon]);
      console.log("city coordinates",citycoordinates);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }

}


 





useEffect(()=>{
  getCoordinates()
},[property._id])



const handleSendMessage = async () => {
  try {
    if(!currentUser){
      navigate("/login")
      return
    }
    const receiverId = property.userId; 
    if (!receiverId) {
      console.error('Receiver ID is not available');
      return; 
    }

    const response = await axios.post('/chat/addchat', {
      receiverId: receiverId 
    });
 
    if (response.status === 200) {
      const chatId = response?.data?.newChat?._id||response?.data?.chat?._id; 
      if (chatId) {
        navigate(`/chat/${chatId}`); 
      } else {
        console.error('Chat ID is not available');
      }
    }
  } catch (error) {
    console.error('Error initiating chat:', error);
  }
};

const handleDeletePost=()=>{
  confirmAlert({
    title: 'Confirm to Delete',
    message: 'Are you sure to delete post ?',
    buttons: [
      {
        label: 'Yes',
        onClick: async() =>{
          const res= await axios.delete(`/post/deletepost/${property._id}`)
          if(res.data){
            alert(res.data.message)
            navigate(`/profile/${property.userId}`)
          }
          return
        }
      },
      {
        label: 'No',
        onClick: () => {return}
      }
    ]
  });

}

const handleSavePost=async()=>{
  const res= await axios.post(`/post/save/${property._id}`)
   
  if(res.data.saved) {
    setSaved(true)
  }
  else{
    setSaved(false)
  }

}



  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
     

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className={property.basicInfo.images.length>1?"col-span-3":"col-span-4"}>
          <img src={property.basicInfo.images[0]} alt="Main image" 
          className="w-full h-auto rounded-lg shadow-md"
          onClick={() => { setPhotoIndex(0); setIsOpen(true); }}
          />
        </div>
        {property.basicInfo.images.length>1 && <div className="space-y-4">
          {property.basicInfo.images.slice(1).map((src, index) => (
            <img key={index} src={src} alt={`Thumbnail ${index + 1}`}
             className="w-full h-auto rounded-lg shadow-md"
             onClick={() => { setPhotoIndex(index + 1); setIsOpen(true); }}
              />
          ))}
        </div>}
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={property.basicInfo.images.map(src => ({ src }))}
        index={photoIndex}
      />
    </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.basicInfo.title}</h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {property.basicInfo.address}
                  </p>
                </div>
                <div className="text-2xl font-bold text-sky-500">Rs {property.basicInfo.price}</div>
              </div>
              <div className="flex items-center mb-4 ">
                <img src={property.postDetail.avatar?property.postDetail.avatar:noavatar} alt={property.postDetail.username}  className="rounded-full mr-2  w-16 h-16" />
                <span>{property.postDetail.username}</span>
              </div>
              <p className="text-gray-700 mb-6 ">{property.postDetail.description}</p>
             
            </div>
           <PropertyReviews currentUser={currentUser}/>
          </div>
     

          <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center bg-white p-2 rounded-xl">
          <Building size={30} className='mr-2'/>
            <h2 className=" font-semibold text-2xl">{(property.basicInfo.category).charAt(0).toUpperCase()+(property.basicInfo.category).slice(1)}</h2>
                </div>
          
                <h2 className="text-2xl font-semibold mb-4">General</h2>
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <ul className="space-y-2">
                  {property.postDetail.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-start bg-white">
                      <div className="bg-gray-200 rounded-full p-2 mr-3">
                        <Maximize size={16} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{amenity}</h3>
                         
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold mb-4 mt-2">Pet-Policy</h3>
                <div className="flex items-center bg-white p-2 rounded-xl">
                  {property.postDetail.pets==="not-allowed"||property.postDetail.pets==="Not-allowed"?
                  (<>
                      <X size={20} className="mr-2"/>
                      <span>{property.postDetail.pets}</span>
                  </>

                   ):(
                    <>
                       <Check size={20} className="mr-2" />
                       <span>{property.postDetail.pets}</span>
                    </>
                 
                  )}
                 
                </div>
                <h3 className="text-xl font-semibold mb-4 mt-2">Water Supply</h3>
                <div className="flex items-center bg-white p-2 rounded-xl">
                  <Droplets size={20} className="mr-2" />
                  <span>{property.postDetail.waterSupply}</span>
                </div>

                <h3 className="text-xl font-semibold mb-4 mt-2">Furnishing Status</h3>
                <div className="flex items-center bg-white p-2 rounded-xl">
                  <Armchair size={20} className="mr-2" />
                  <span>{property.postDetail.FurnishingStatus}</span>
                </div>

                <h3 className="text-xl font-semibold mb-4 mt-2">Balcony</h3>
                <div className="flex items-center bg-white p-2 rounded-xl">
                  <Maximize size={20} className="mr-2" />
                  <span>{property.postDetail.balcony}</span>
                </div>
                 
             </div>

            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
              <h2 className=" text-xl font-semibold mb-4">Sizes</h2>
              <div className="flex justify-between mb-4">
                <div className="flex items-center bg-white p-2 rounded-xl">
                  <Maximize size={20} className="mr-2" />
                  <span>{property.postDetail.totalArea} sqft</span>
                </div>
                <div className="flex items-center bg-white p-2 rounded-xl">
                  <Bed size={20} className="mr-2" />
                  <span>{property.basicInfo.bedroom} beds</span>
                </div>
                <div className="flex items-center bg-white p-2 rounded-xl">
                  <Bath size={20} className="mr-2" />
                  <span>{property.basicInfo.bathroom} bathroom</span>
                </div>
              </div>
             
            
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className=" relative h-64 z-0">
                <Map city={citycoordinates} property={property}/>
              </div>
              
            </div>
           { currentUser && currentUser._id===property.userId &&
          ( <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleDeletePost}
          >
            Delete Post
          </button>)}
            {currentUser && currentUser._id !== property.userId && ( 
            <div className="flex space-x-4">
           
          <button
          className="flex-1 bg-blue-400 text-gray-900 py-2 px-4 rounded hover:bg-blue-500 flex items-center justify-center"
         onClick={handleSendMessage}>
         <MessageCircle size={20} className="mr-2" />
          Send a Message
          </button>
 
              <button 
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 flex items-center justify-center"
              onClick={handleSavePost}
              >
                <Bookmark size={20} className="mr-2" />
                {saved?"UnSave":"Save Place"}
              </button>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  )
}