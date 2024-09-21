import React, { useState } from 'react'
import { Bold, Italic, Underline, Link, List, ListOrdered, AlignLeft } from 'lucide-react'

export default function AddPost() {
  const [description, setDescription] = useState('')

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex flex-col">
     

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Post</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" id="title" name="title" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" id="price" name="price" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" id="address" name="address" className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="border rounded">
              <div className="flex items-center space-x-2 p-2 border-b">
                <select className="border-none bg-transparent">
                  <option>Normal</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><Bold size={16} /></button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><Italic size={16} /></button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><Underline size={16} /></button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><Link size={16} /></button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><List size={16} /></button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><ListOrdered size={16} /></button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded"><AlignLeft size={16} /></button>
              </div>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="w-full p-2 border-none focus:ring-0"
                value={description}
                onChange={handleDescriptionChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" id="city" name="city" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Bedroom Number</label>
              <input type="number" id="bedrooms" name="bedrooms" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Bathroom Number</label>
              <input type="number" id="bathrooms" name="bathrooms" className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
              <input type="text" id="latitude" name="latitude" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
              <input type="text" id="longitude" name="longitude" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select id="type" name="type" className="w-full p-2 border rounded" required>
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-1">Property</label>
              <select id="property" name="property" className="w-full p-2 border rounded" required>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            <div>
              <label htmlFor="utilities" className="block text-sm font-medium text-gray-700 mb-1">Utilities Policy</label>
              <select id="utilities" name="utilities" className="w-full p-2 border rounded" required>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
              </select>
            </div>
            <div>
              <label htmlFor="pets" className="block text-sm font-medium text-gray-700 mb-1">Pet Policy</label>
              <select id="pets" name="pets" className="w-full p-2 border rounded" required>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">Income Policy</label>
              <input type="text" id="income" name="income" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Total Size (sqft/m2)</label>
              <input type="number" id="size" name="size" className="w-full p-2 border rounded" required />
            </div>
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">School (distance)</label>
              <input type="text" id="school" name="school" className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Add images</label>
            <div className="flex items-center space-x-4">
              <input type="file" id="images" name="images" accept="image/*" multiple className="hidden" />
              <label htmlFor="images" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Upload
              </label>
              <span className="text-gray-600">No file chosen</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-gray-900 px-6 py-2 rounded-md hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}