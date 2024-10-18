import React, { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noavatar from "../assets/noavatar.jpg"
const PropertyReviews = ({ currentUser }) => {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  // Make reviews state mutable
  const [reviews, setReviews] = useState([]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!rating || !newReview.trim()) {
      toast.error('Please add both rating and review text!');
      return;
    }

    // Create a new review object
    const newReviewData = {
      id: reviews.length + 1, // Assigning a new unique id for the review
      user: currentUser.username, // Assuming currentUser contains the name of the logged-in user
      avatar: currentUser.avatar?currentUser.avatar:noavatar, // Placeholder for avatar
      rating,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      content: newReview,
      helpful: 0
    };

    // Add new review to the reviews array
    setReviews([newReviewData, ...reviews]);

    // Reset the form
    setNewReview('');
    setRating(0);

    toast.success('Review submitted successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-semibold mb-6">Reviews and Ratings</h2>
      
      {/* Overall Rating */}
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={24}
              className={`${
                4.5 >= i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-2xl font-bold">4.5</span>
        <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
      </div>

      {/* Add Review Section */}
      {currentUser ? (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={24}
                  className={`cursor-pointer ${
                    (hover || rating) >= i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Your Review</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your experience with this property..."
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            Please <a href="/login" className="text-blue-600 hover:underline font-semibold">login</a> to leave a review
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center mb-3">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{review.user}</h3>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        review.rating >= i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.content}</p>
            <div className="flex items-center text-sm text-gray-500">
              <button 
                className="flex items-center hover:text-blue-500 mr-4"
                onClick={() => toast.info('Marked as helpful!')}
              >
                <ThumbsUp size={16} className="mr-1" />
                Helpful ({review.helpful})
              </button>
              <button 
                className="flex items-center hover:text-red-500"
                onClick={() => toast.info('Report submitted')}
              >
                <Flag size={16} className="mr-1" />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyReviews;
