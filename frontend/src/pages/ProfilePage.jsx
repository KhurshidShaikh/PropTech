import React, { useEffect, useState } from 'react'
import { MapPin, Bed, Bath, Bookmark, MessageSquare } from 'lucide-react'
import PropertyList from '../components/PropertyList'
import { useSelector } from 'react-redux'
import noavatar from "../assets/noavatar.jpg"
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Chats from '../components/Chats'





export default function ProfilePage() {
  const navigate=useNavigate()
  const[loading,setLoading]=useState()
  const[error,setError]=useState(false)
  const [posts,setPosts]=useState([])
  const [savedPosts,setSavedPosts]=useState([])
  const [chats,setChats]=useState([])
 
  const currentUser=useSelector((state)=>state.user.currentUser)
  const getPosts=async()=>{
    try {
    
     const response=await axios.get("/user/profileposts")
     setLoading(true)
     if(response){
       setLoading(false)
      setPosts(response.data.userPosts.posts)
      setSavedPosts(response.data.userPosts.savedPosts)
      console.log("saved post le",savedPosts);
      
     }
    
 
    } catch (error) {
     console.log(error);
      setError(true)
      setLoading(false)
    }
   }

     const getChats=async()=>{
      try {
        const response= await axios.get("/chat/getchats");
        if(response.data){
          console.log("chats aaye hain:",response.data.chats);
          setChats(response.data.chats)
        }
        
      } catch (error) {
        console.log("error getting chats",error);
      }
     }

     
    useEffect(()=>{
      getPosts()
      getChats()
    },[])
    
  return (
    currentUser?(
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
     
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className="md:w-2/3">
            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">User Information</h2>
                <button className="bg-green-400 text-gray-900 px-4 py-2 rounded-md hover:bg-green-500" 
                onClick={()=>navigate(`/updateprofile/${currentUser._id}`)}>
                  Update Profile
                </button>
              </div>
              <div className="flex items-center mb-4">
                <img src={currentUser.avatar?currentUser.avatar:noavatar} alt={"pfp"}  className="rounded-full mr-4  w-16 h-16" />
                <div>
                  <p className="font-medium">Username: {currentUser.username}</p>
                  <p className="text-gray-600">E-mail: {currentUser.email}</p>
                </div>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Logout
              </button>
            </div>

            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">My Posts</h2>
                <button className="bg-sky-400 text-gray-900 px-4 py-2 rounded-md hover:bg-sky-500" onClick={()=>navigate("/addpost")}>
                  Create New Post
                </button>
              </div>
             
            { loading?"Loading...":<PropertyList posts={posts}/>}
             
            
            </div>
{/* 
            <div className=" mt-7 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Saved Posts</h2>
              
              </div>
             
            { loading?"Loading...":<PropertyList posts={savedPosts}/>}
             
            
            </div> */}

          </div>

          <div className="md:w-1/3">
          {chats.length>0? <Chats chats={chats} />:<h3>No Messages</h3>}
         


          </div>
        </div>
      </main>
    </div>

    ):(
     null
    )

    
    
  )
}