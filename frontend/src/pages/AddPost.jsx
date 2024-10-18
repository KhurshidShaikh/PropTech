import React, { useState } from 'react'
import { Bold, Italic, Underline, Link, List, ListOrdered, AlignLeft } from 'lucide-react'
import {useForm} from "react-hook-form"
import axios from '../api/axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../components/UploadWidget';
import { useSelector } from 'react-redux';

export default function AddPost() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading,setLoading]=useState()
  const [images,setImages]=useState([])
  const navigate=useNavigate()
  const currentUser=useSelector((state)=>state.user.currentUser)

  const handleAmenityChange = (e) => {
    const value = e.target.value;
    setSelectedAmenities(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

    const onSubmit=async(data)=>{
      setLoading(true)
    const basicInfo={
      title:data.title,
      price: data.price,
      address: data.address.toLowerCase(),
      city: data.city.toLowerCase(),
      bedroom: data.bedrooms,
      bathroom: data.bathrooms,
      category: data.category,
      propertyType: data.property,
      images:images
    }
    const postDetails = {
      description: data.description,
      totalArea: data.totalarea,
      pets: data.pets,
      amenities:selectedAmenities,
      waterSupply:data.watersupply,
      balcony:data.balcony,
      FurnishingStatus:data.furnishing,
      maintenance:data.maintenance,
      username:currentUser.username,
      avatar:currentUser.avatar
    }

    try {
      setLoading(true)
      const response= await axios.post("/post/createpost",{basicInfo,postDetails})

     if(response.data.newPost){
      setLoading(false)
       toast.success("new post created", {
        autoClose: 3000, 
      });
      navigate(`/profile/${currentUser._id}`)
    }
       
     
    } catch (error) {

      console.error('Failed to create post:', error)
      setLoading(false)
    }
      
    }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex flex-col">
     

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" id="title" name="title" className="w-full p-2 border rounded" {...register('title',{required:true})} />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" id="price" name="price" className="w-full p-2 border rounded" {...register('price',{required:true})} />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" id="address" name="address" className="w-full p-2 border rounded" {...register('address',{required:true})} />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="border rounded">
           

              <textarea
                id="description"
                name="description"
                rows={5}
                className="w-full p-2 border-none focus:ring-0"
                {...register('description',{required:true})}
              ></textarea>
            </div>
          </div>

          <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" id="city" name="city" className="w-full p-2 border rounded" {...register('city', { required: true })} />
              {errors.city && <span className="text-red-500">City is required</span>}
            </div>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input type="number" id="bedrooms" name="bedrooms" className="w-full p-2 border rounded" {...register('bedrooms', { required: true })} />
              {errors.bedrooms && <span className="text-red-500">Bedrooms are required</span>}
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input type="number" id="bathrooms" name="bathrooms" className="w-full p-2 border rounded" {...register('bathrooms', { required: true })} />
              {errors.bathrooms && <span className="text-red-500">Bathrooms are required</span>}
            </div>
          

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="maintenance" className="block text-sm font-medium text-gray-700 mb-1">Monthly Maintenance Charge</label>
              <input type="number" id="maintenance" name="maintenance" className="w-full p-2 border rounded" {...register('maintenance', { required: true })} />
              {errors.maintenance && <span className="text-red-500">Maintenance charge is required</span>}
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select id="type" name="category" className="w-full p-2 border rounded" {...register('category', { required: true })}>
                <option value="rent">Rent</option>
                <option value="buy">Sale</option>
              </select>
              {errors.type && <span className="text-red-500">Type is required</span>}
            </div>
            <div>
              <label htmlFor="totalarea" className="block text-sm font-medium text-gray-700 mb-1">Total Area sq.ft</label>
              <input type="number" id="totalarea" name="totalarea" className="w-full p-2 border rounded" {...register('totalarea', { required: true })} />
              {errors.totalarea && <span className="text-red-500">Total area is required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">Property</label>
              <select id="property" name="property" className="w-full p-2 border rounded" {...register('property', { required: true })}>
                <option value="apartment">Apartment</option>
                <option value="house">Flat</option>
              </select>
              {errors.property && <span className="text-red-500">Property is required</span>}
            </div>
            <div>
              <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <div className="space-y-2">
                {['swimming pool', 'gym', 'parking'].map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={handleAmenityChange}
                      className="mr-2"
                    />
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="pets" className="block text-sm font-medium text-gray-700 mb-1">Pet Policy</label>
              <select id="pets" name="pets" className="w-full p-2 border rounded" {...register('pets', { required: true })}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
              {errors.pets && <span className="text-red-500">Pet policy is required</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="watersupply" className="block text-sm font-medium text-gray-700 mb-1">Water Supply</label>
              <input type="text" id="watersupply" name="watersupply" className="w-full p-2 border rounded" {...register('watersupply', { required: true })} />
              {errors.watersupply && <span className="text-red-500">Water supply is required</span>}
            </div>
            <div>
              <label htmlFor="balcony" className="block text-sm font-medium text-gray-700 mb-1">Balcony</label>
              <input type="text" id="size" name="balcony" className="w-full p-2 border rounded" {...register('balcony', { required: true })} />
              {errors.balcony && <span className="text-red-500">Balcony is required</span>}
            </div>
            <div>
              <label htmlFor="furnishing" className="block text-sm font-medium text-gray-700 mb-1">Furnishing status</label>
              <select id="furnishing" name="furnishing" className="w-full p-2 border rounded" {...register('furnishing', { required: true })}>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
              {errors.furnishing && <span className="text-red-500">Furnishing status is required</span>}
            </div>
          </div>

          <div className="mb-6">
           <UploadWidget
           uwConfig={
           { cloudName:"djqyemiwb",
            uploadPreset:"postimages",
            multiple:true,
            folder:"postimages"}
           }
           setImages={setImages}
           />
          </div>
           {images.map((image)=>(
            <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
             <img src={image} alt="img" className='w-full sm:w-2/3' />
            </div>
           
           ))}


          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-gray-900 px-6 py-2 mt-2 rounded-md hover:bg-blue-700">
             { loading?"Submitting..":"Submit"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}