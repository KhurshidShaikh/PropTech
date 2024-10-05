import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";



const LoginPage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
 
  const [loading,setLoading]=useState(false)

  const [formdata,setFormData]=useState({
    email:"",
    password:""
  })



const handleChange=(e)=>{
setFormData({
  ...formdata,
   [e.target.name]:e.target.value
})
}

const handleSubmit=async(e)=>{
  e.preventDefault()
  if (!formdata.email || !formdata.password) {
    toast.error("All fields are required", {
      autoClose: 3000, 
    });
    return;
  }

  console.log(formdata);
  try {
    setLoading(true)
   const response=await axios.post("http://localhost:3100/api/auth/login",formdata)
   console.log('Full login response:', response);
   console.log('Login response cookies:', document.cookie);
   console.log(response.data);

   if(response.data.verified){
    
      dispatch(setUser(response.data.user)),
      navigate("/")
     
   }
   else{
    toast.error("Invalid Credentials", {
      autoClose: 3000, 
    });
   }
   setLoading(false)
    
  } catch (error) {
    console.log(error);
    toast.error(
      "Internal server error. Please try again later", {
      autoClose: 3000,
    });


  }
  


}




  return (
    <div className=" max-h-screen flex flex-col sm:flex-row justify-center items-center w-full p-6 overflow-hidden">
      {/* Image */}
      <div className=" w-1/2">
       
        <img
          src="https://img.freepik.com/premium-vector/growth-real-estate-market-businessman-analyzing-housing-business-real-estate-business-concept-flat-vector-illustration_923732-4868.jpg?w=740"
          alt=""
          className="h-auto max-w-full object-contain hidden sm:block"
        />
      </div>
  
      <div className="w-full sm:w-1/2 flex justify-center items-center flex-col space-y-4">
        <h2 className="font-semibold text-lg sm:text-xl">Login</h2>
        <form className="flex flex-col space-y-3 w-full max-w-xs sm:max-w-md" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            id="email"
             placeholder="Enter your email"
            className="border p-2 rounded-lg text-sm sm:text-base"
            value={formdata.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
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
            className="py-2 bg-blue-900 font-bold text-white rounded-md"
          >
            {loading?"Loading...":"Login"}
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            regsiter
          </Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;
