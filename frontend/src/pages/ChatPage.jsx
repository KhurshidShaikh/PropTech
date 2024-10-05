import React, { useEffect, useState } from 'react'
import { Send, Menu, User } from 'lucide-react'
import noavatar from "../assets/noavatar.jpg"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import moment from "moment"
import * as timeago from "timeago.js";

export default function ChatPage() {
  // const [messages, setMessages] = useState([
  //   { id: 1, sender: 'John', content: 'Hey, how are you?', timestamp: '10:00 AM' },
  //   { id: 2, sender: 'You', content: 'I\'m good, thanks! How about you?', timestamp: '10:02 AM' },
  //   { id: 3, sender: 'John', content: 'Doing well! Did you finish the project?', timestamp: '10:05 AM' },
  //   { id: 4, sender: 'You', content: 'Yes, I just submitted it. How about yours?', timestamp: '10:08 AM' },
  //   { id: 5, sender: 'John', content: 'Almost done. I\'ll finish it by tomorrow.', timestamp: '10:10 AM' },
  // ]);

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState();
  const [otheruser, setOtheruser] = useState();
  const {id}=useParams()
  const currentUser=useSelector((state)=>state.user.currentUser)


console.log("other user",otheruser);

  const handleSendMessage=async(e)=>{
   
    e.preventDefault()
    try {
      if(newMessage){
        const res= await axios.post(`/message/${id}`,{text:newMessage})
        if(res.data.message){
          console.log("message ye hai",res.data.message);
          setNewMessage('')
        }
        console.log("aise dikhti chat",chat);

      }
     
      return;
    } catch (error) {
      console.log("error sending message",error)
    }

  }

  const getChat=async()=>{
    try {
      const response = await axios.get(`/chat/getchat/${id}`)
      if(response.data.chat){
        console.log("chat details",response.data.chat);
        setChat(response.data.chat)
        setOtheruser(response.data.chat?.users?.filter(user=>user._id!==currentUser._id)[0])
        console.log("ye rhi aapki chat",response.data.chat);
      }
  
    } catch (error) {
      console.error("Error getting chat:", error.message);
    }
  }

useEffect(()=>{

getChat() 
},[])

useEffect(()=>{
  console.log("Created At:", chat?.messages?.createdAt);
},[chat])
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
     

      <main className="flex-grow overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 sm:h-full mt-4 ">
          <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="p-4 border-b flex items-center">
            <img src={otheruser?.avatar? otheruser?.avatar:noavatar} alt={"pfp"}  className="rounded-full mr-4  w-16 h-16" />
              <h2 className="text-lg font-semibold">{otheruser?.username}</h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {chat?.messages?.length>0?chat?.messages?.map((message) => (
                
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === currentUser._id ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`max-w-xs md:max-w-md ${
                      message.sender === currentUser._id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    } rounded-lg p-3`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className=' text-xs'>{timeago.format(message.createdAt)}</p>
                   
                  </div>
                </div>
              )):(<h2>No Messages</h2>)}
            </div>
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  handleSendMessage(e);
                }}
                className="flex space-x-2"
              >
              
                 <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                 className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                   />

              
                <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-md
                 hover:bg-blue-600 focus:outline-none focus:ring-2
                  focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center`}
                  type='submit'
            >
              <Send className="h-4 w-4 mr-2" />
               Send
                </button>
                 
             
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}