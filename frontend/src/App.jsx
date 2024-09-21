import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OtpVerify from "./pages/OtpVerify";
import HomePage from "./pages/HomePage";
import PropertyListPage from "./pages/PropertyListPage";
import Navbar from "./components/Navbar";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AddPost from "./pages/AddPost";
import UpdateProfie from "./pages/UpdateProfile";
const App = () => {
  return (
  
      <Router>
        <Navbar/>
      <Routes>
       
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verifyotp/:id" element={<OtpVerify />} />
        <Route path="/" element={<HomePage/>}/>
        <Route path="/list" element={<PropertyListPage/>}/>
        <Route path="/details" element={<PropertyDetailPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/addpost" element={<AddPost/>}/>
        <Route path="/updateprofile" element={<UpdateProfie/>}/>
        <Route path="*" element={<h2>404 Not Found</h2>} />
      
      </Routes>

    </Router>
    
    
  );
};

export default App;
