import React from 'react'
import noavatar from "../assets/noavatar.jpg"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const Chats = ({chats}) => {
 
const currentUser=useSelector((state)=>state.user.currentUser)
const navigate=useNavigate()
  
  return (


    <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Messages </h2>
              <div className="space-y-4">
                {chats.map((message) => (
                  <div key={message.id} 
                  className={`flex items-center rounded-lg p-3 ${message.seenBy.includes(currentUser._id)? "bg-white":" bg-yellow-50"}`}
                  onClick={()=>navigate(`/chat/${message._id}`)}
                  >
                    <img src={message.receiver.avatar?message.receiver.avatar:noavatar} alt={message.receiver.username}  className="rounded-full mr-3 w-16 h-16" />
                    <div>
                      <p className="font-medium">{message.sender}</p>
                      <p className="text-gray-600">{message.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default Chats
