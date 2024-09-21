import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const OtpVerify = () => {
  const navigate=useNavigate()
  const {id}=useParams()
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otpValue];
      newOtp[index] = value;
      setOtpValue(newOtp);

      // Move to the next input if a digit is entered
      if (value !== "" && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpValue[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const otp = otpValue.join("");
      if(otp.length<4){
        toast.error("Please Enter yout OTP", {
          autoClose: 3000, 
        });
        return
      }
    console.log("OTP submitted:", otp);

    try {
   const response= await axios.post(`http://localhost:3100/api/auth/verifyotp/${id}`,{otp})
    console.log(response.data);

    if(response.data.verified==true){
      alert(response.data.message)
      navigate("/login")
    }
    else {
     alert(response.data.message)
    }


      
    } catch (error) {
      
    }



  
  };

  return (
    <div className=" max-h-screen flex flex-col sm:flex-row justify-center items-center w-full p-6 overflow-hidden">
      <div className=" w-1/2">
        <h1 className="font-bold text-4xl text-blue-500 mt-6">PropTech</h1>
        <img
          src="https://img.freepik.com/premium-vector/growth-real-estate-market-businessman-analyzing-housing-business-real-estate-business-concept-flat-vector-illustration_923732-4868.jpg?w=740"
          alt=""
          className="h-auto max-w-full object-contain hidden sm:block"
        />
      </div>


      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Verify OTP
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-2 justify-center">
            {otpValue.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e)=>handleKeyDown(e,index)}
                maxLength="1"
                className="border border-gray-300 rounded-lg w-12 h-12 text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Submit OTP
          </button>
        </form>
       
      </div>


<ToastContainer/>

    </div>
  );
};

export default OtpVerify;

