import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OtpVerify from "./pages/OtpVerify";

const App = () => {
  return (
  
      <Router>
      <Routes>
    
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verifyotp/:id" element={<OtpVerify />} />
       
        <Route path="*" element={<h2>404 Not Found</h2>} />
        <Route path="/home" element={<h2>Welcome to home page</h2>}/>
      </Routes>

    </Router>
    
    
  );
};

export default App;
