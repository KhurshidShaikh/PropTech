import React, { useEffect, useState, useRef } from 'react';
import { Send, Menu, User } from 'lucide-react';
import noavatar from "../assets/noavatar.jpg";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import * as timeago from "timeago.js";
import { io } from "socket.io-client";

export default function ChatPage() {
  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState();
  const [otheruser, setOtheruser] = useState();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connected, setConnected] = useState(false);
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const socketRef = useRef();


  

  // socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3100", {
      transports: ['websocket'],
      reconnection: true,
    });

   
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setConnected(true);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket connection');
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);


  useEffect(() => {
    if (!socket || !currentUser?._id) return;

    
    socket.emit('addUser', currentUser._id);

 
    socket.on('getOnlineUsers', (users) => {
      console.log('Online users:', users);
      setOnlineUsers(users);
    });

    
    socket.on('getMessage', (message) => {
      console.log('Received message:', message);
      if (message.chatId === id) {
        setChat(prev => ({
          ...prev,
          messages: [...(prev?.messages || []), message]
        }));
      }
    });

   
    socket.on('messageSent', (response) => {
      console.log('Message sent confirmation:', response);
    });


    socket.on('messageError', (error) => {
      console.error('Message error:', error);
    });

    return () => {
      socket.off('getOnlineUsers');
      socket.off('getMessage');
      socket.off('messageSent');
      socket.off('messageError');
    };
  }, [socket, currentUser, id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage || !socket || !connected) return;

    try {
      console.log('Sending message to:', otheruser?._id);
      
     
      socket.emit('sendMessage', {
        senderId: currentUser._id,
        receiverId: otheruser._id,
        text: newMessage,
        chatId: id
      });

   
      const res = await axios.post(`/message/${id}`, { text: newMessage });
      
      if (res.data.message) {
        setChat(prev => ({
          ...prev,
          messages: [...(prev?.messages || []), {
            sender: currentUser._id,
            text: newMessage,
            createdAt: new Date()
          }]
        }));
        
        setNewMessage('');
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getChat = async () => {
    try {
      const response = await axios.get(`/chat/getchat/${id}`);
      if (response.data.chat) {
        setChat(response.data.chat);
        const other = response.data.chat?.users?.find(
          user => user._id !== currentUser._id
        );
        setOtheruser(other);
        console.log('Other user set:', other);
      }
    } catch (error) {
      console.error("Error getting chat:", error);
    }
  };

  useEffect(() => {
    getChat();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 sm:h-full mt-4">
          <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={otheruser?.avatar || noavatar} 
                  alt="pfp" 
                  className="rounded-full mr-4 w-16 h-16" 
                />
                <div>
                  <h2 className="text-lg font-semibold">{otheruser?.username}</h2>
                  <span className={`text-sm ${onlineUsers.includes(otheruser?._id) ? 'text-green-500' : 'text-gray-500'}`}>
                    {onlineUsers.includes(otheruser?._id) ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
             
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              {chat?.messages?.length > 0 ? chat.messages.map((message, index) => (
                <div
                  key={message._id || index}
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
                    <p className="text-xs">{timeago.format(message.createdAt)}</p>
                  </div>
                </div>
              )) : (
                <h2>No Messages</h2>
              )}
            </div>

            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md
                    hover:bg-blue-600 focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:ring-opacity-50 transition-colors 
                    flex items-center ${!connected && 'opacity-50 cursor-not-allowed'}`}
                  type="submit"
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
  );
}