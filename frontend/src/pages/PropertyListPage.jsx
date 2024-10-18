

import React, { useEffect, useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import PropertyList from '../components/PropertyList'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import Map from '../components/Map'
import Loader from '../components/Loader'

export default function PropertyListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cityCoordinates, setCityCoordinates] = useState([])
  const [address, setAddress] = useState('')

  const queryParams = new URLSearchParams(location.search)

  const getPosts = async () => {
    try {
      const response = await axios.get("/post/getposts", {
        params: {
          category: queryParams.get('category'),
          city: queryParams.get('city'),
          minPrice: queryParams.get('minPrice'),
          maxPrice: queryParams.get('maxPrice'),
          address:queryParams.get('address') || null
        },
      });

      if (response.data.posts) {
        setPosts(response.data.posts); 
      }
      console.log(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCoordinates = async () => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
        params: {
          text: queryParams.get('city'),
          format: 'json',
          apiKey: '33dee3c05442474b9daff793af34f7e0'
        },
        withCredentials: false
      });
      if (response.data && response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0];
        console.log("Setting city coordinates:", [result.lat, result.lon]);
        setCityCoordinates([result.lat, result.lon]);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  }

  useEffect(() => {  
    getCoordinates()
    getPosts();
    console.log(location.search);
    
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(address);
    queryParams.set('address',address)
    navigate(`/list?${queryParams}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Search results for {queryParams.get('city')}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow mb-8">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search by locality or address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value.toLowerCase())}
                  className="flex-grow p-2 border rounded-l outline-none"
                />
                <button type="submit" className="bg-blue-400 text-white p-2 rounded-r hover:bg-blue-500 flex items-center justify-center">
                  <Search className="mr-2" size={20} />
                  Search
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Related Posts</h2>
              </div>

              {loading ? <Loader /> : <PropertyList posts={posts} />}
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4" style={{ height: '500px', width: '100%' }}>
              <Map posts={posts} city={cityCoordinates} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}