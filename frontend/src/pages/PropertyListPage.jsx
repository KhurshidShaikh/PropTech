import React, { useEffect, useState } from 'react'
import { Search, MapPin, Bed, Bath, Bookmark, MessageCircle } from 'lucide-react'
import PropertyList from '../components/PropertyList'
import { useLocation } from 'react-router-dom'
import axios from '../api/axios'
import Map from '../components/Map'

export default function PropertyListPage() {
  const location = useLocation();
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchType, setSearchType] = useState('buy')
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [citycoordinates,seCityCoordinates]=useState([])

  const queryParams = new URLSearchParams(location.search)
  const getPosts = async () => {
    try {
      const response = await axios.get("/post/getposts", {
        params: {
          category: queryParams.get('category'),
          city: queryParams.get('city'),
          minPrice: queryParams.get('minPrice'),
          maxPrice: queryParams.get('maxPrice')
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
          text:queryParams.get('city'),
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

  useEffect(() => {  
    getCoordinates()
   
    getPosts();
  }, [location.search]);

  const handleSearch=(e)=>{
    e.preventDefault()
    const queryParams= new URLSearchParams({
     category:searchType,
     city,
     minPrice,
     maxPrice
    }).toString()
 
     navigate(`/list?${queryParams}`)   
   }



  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Search results for {queryParams.get('city')}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow mb-8">
              <form onSubmit={handleSearch} className="flex flex-wrap gap-3 items-center">
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="location"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value.toLowerCase())}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    id="type"
                    name="category"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value.toLowerCase())}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>

                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mt-2">
                  <button type="submit" className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 flex items-center justify-center">
                    <Search className="mr-2" size={20} />
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Related Posts</h2>

              </div>

              {loading ? "Loading..." : <PropertyList posts={posts} />}


            </div>
          </div>




          <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4" style={{ height: '500px', width: '100%' }}>
              <Map  posts={posts} city={citycoordinates}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}