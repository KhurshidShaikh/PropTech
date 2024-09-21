import React, { useState } from 'react'


export default function UpdateProfie() {
  const [username, setUsername] = useState('john2')
  const [email, setEmail] = useState('john@gmail.com')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('https://tse4.mm.bing.net/th?id=OIP.1yjlIIIF3VDIkpjS9ct8OgHaE8&pid=Api&P=0&h=180')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Profile updated')
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <div className="relative w-48 h-48 mb-4">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="rounded-lg"
                />
              </div>
              <input
                type="file"
                id="avatar"
                accept="image/*"
               
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upload
              </label>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}