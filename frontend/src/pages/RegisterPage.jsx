import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate=useNavigate()

  const [formdata,setFormData]=useState({
    username:"",
    email:"",
    password:""
  })

const handleChange=(e)=>{
setFormData({
  ...formdata,
   [e.target.name]:e.target.value
})
}

const handleSubmit= async(e)=>{
  e.preventDefault();
  if (!formdata.username || !formdata.email || !formdata.password) {
    alert("All fields are required");
    return;
  }

  console.log(formdata);
  
  try {
    const response = await axios.post("http://localhost:3100/api/auth/register", formdata, { withCredentials: true });
    console.log(response.data);
    
    if(response.data.userId){
      navigate(`/verifyotp/${response.data.userId}`)
    }
    else if(response.data.error){
      console.log(response.data.message);
      
    }



  } catch (error) {
    if (error.response) {
      console.log("Server responded with error", error.response.data);
    } else if (error.request) {
      console.log("No response from server", error.request);
    } else {
      console.log("Error setting up request", error.message);
    }
  }
  

}



  return (
    <div className=" max-h-screen flex flex-col sm:flex-row justify-center items-center w-full p-6 overflow-hidden">
      {/* Image */}
      <div className=" w-1/2">
        <h1 className="font-bold text-4xl text-blue-500 mt-6">PropTech</h1>
        <img
          src="https://img.freepik.com/premium-vector/growth-real-estate-market-businessman-analyzing-housing-business-real-estate-business-concept-flat-vector-illustration_923732-4868.jpg?w=740"
          alt=""
          className="h-auto max-w-full object-contain hidden sm:block"
        />
      </div>
      {/* Forms */}
      <div className="w-full sm:w-1/2 flex justify-center items-center flex-col space-y-4 mt-4">
        <h2 className="font-semibold text-lg sm:text-xl">Register</h2>
        <form className="flex flex-col space-y-3 w-full max-w-xs sm:max-w-md" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-sm sm:text-base">User Name</label>
          <input
            type="text"
            name="username"
            id="name"
            placeholder="Enter your name"
             className="border p-2 rounded-lg text-sm sm:text-base"
             value={formdata.username}
             onChange={handleChange}
          />

          <label htmlFor="email" className="text-sm sm:text-base">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
             className="border p-2 rounded-lg text-sm sm:text-base"
             value={formdata.email}
             onChange={handleChange}
          />

          <label htmlFor="password" className="text-sm sm:text-base">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
             className="border p-2 rounded-lg text-sm sm:text-base"
             value={formdata.password}
             onChange={handleChange}
          />

          <button
            type="submit"
            className="py-2 bg-blue-900 font-bold text-white rounded-lg"
           
          >
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
