import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from '../api/axios'
import { useSelector } from 'react-redux'
import noavatar from "../assets/noavatar.jpg"
import UploadWidget from '../components/UploadWidget';


export default function UpdateProfie() {
  const {id}=useParams()
  const currentUser=useSelector((state)=>state.user.currentUser)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      const response= await axios.put(`/user/updateuser/${id}`,{username,password,avatar})
      if(response){
        console.log(response.data.message);
        navigate(`/profile/${id}`)
      }

    } catch (error) {
       console.log("error updating user:",error);
    }

    // Handle form submission
    console.log('Profile updated')
  }
useEffect(()=>{
  console.log('Current user from Redux:', currentUser)
  console.log('Current user type:', typeof currentUser)
  
  if (currentUser && Object.keys(currentUser).length > 0) {
    setUsername(currentUser.username)
    setAvatar(currentUser.avatar)
    setIsLoading(false)
  }
  else{
    console.log('No user data found, redirecting to login')
    navigate("/login")
  }
},[])
 
if (isLoading) {
  return <div>Loading...</div>
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
     

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Profile</h1>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
         
            <div className="md:col-span-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="md:col-span-2 flex flex-col items-center">
              <p className="text-sm font-medium text-gray-700 mb-2">Change the avatar</p>
              <div className="relative w-48 h-32 mb-0">
                <img
                  src={avatar?avatar:noavatar}
                  alt="User Avatar"
                 className="rounded-lg object-cover w-full h-full"
                />
              </div>
              
          <UploadWidget
           uwConfig={
           { cloudName:"djqyemiwb",
            uploadPreset:"postimages",
            multiple:false,
            folder:"postimages"}
           }
           setAvatar={setAvatar}
           className="mx-auto mt-5"
           /> 
             
            </div>
         <div className="md:col-span-2 flex flex-col items-center">
         <button  type="submit" className='bg-blue-500 w-24  py-2 rounded-lg mx-auto '>Submit</button>
         </div>
       
           
          
          </form>
        </div>
      </main>
    </div>
  )
}