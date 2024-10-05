// import React, { useEffect ,useState} from "react";
// import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import OtpVerify from "./pages/OtpVerify";
// import HomePage from "./pages/HomePage";
// import PropertyListPage from "./pages/PropertyListPage";
// import Navbar from "./components/Navbar";
// import PropertyDetailPage from "./pages/PropertyDetailPage";
// import ProfilePage from "./pages/ProfilePage";
// import AddPost from "./pages/AddPost";
// import UpdateProfie from "./pages/UpdateProfile";
// import axios from "./api/axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "./redux/userSlice";
// import { useSelector } from "react-redux";
// import { propertyDetailLoader } from "./Loaders/propertydetailloader";



// const App = () => {
// const dispatch=useDispatch()
// const currentUser=useSelector((state)=>state.user.currentUser)
// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const response = await axios.get('/auth/isloggedin');
//       if (response.data.user) {
//         console.log('User found:', response.data.user);
//         dispatch(setUser(response.data.user));
       
//       }
//       else{
//         console.log('No user found');
//         dispatch(setUser(null));
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//       dispatch(setUser(null));
//     }
//     finally {
//       setIsLoading(false);
//     }
//   };

//   checkAuth();
// },[dispatch]);

// useEffect(() => {
//   console.log("currentUser", currentUser);
// }, [currentUser]);

// if (isLoading) {
//   return <div>Loading...</div>;
// }

//   return (
  

//       <Router>
//         <Navbar/>
//       <Routes>
       
//         <Route path="/register" element={<RegisterPage />}/>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/verifyotp/:id" element={<OtpVerify />} />
//         <Route path="/" element={<HomePage/>}/>
//         <Route path="/list" element={<PropertyListPage/>}/>
//         <Route 
//         path="/postdetail/:id"
//          element={<PropertyDetailPage/>}
//          loader={propertyDetailLoader}
//          />
//         <Route path="/profile/:id" element={<ProfilePage/>}/>
//         <Route path="/addpost" element={<AddPost/>}/>
//         <Route path="/updateprofile/:id" element={<UpdateProfie/>}/>
//         <Route path="*" element={<h2>404 Not Found</h2>} />
      
//       </Routes>

//     </Router>
    
  
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
import axios from "./api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userSlice";
import { propertyDetailLoader } from "./Loaders/propertydetailloader";
import ChatPage from "./pages/ChatPage";

const Root = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/auth/isloggedin');
        if (response.data.user) {
          console.log('User found:', response.data.user);
          dispatch(setUser(response.data.user));
        } else {
          console.log('No user found');
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(setUser(null));
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "verifyotp/:id", element: <OtpVerify /> },
      { path: "list", element: <PropertyListPage /> },
      { 
        path: "postdetail/:id", 
        element: <PropertyDetailPage />,
        loader: propertyDetailLoader
      },
      { path: "profile/:id", element: <ProfilePage /> },
      { path: "addpost", element: <AddPost /> },
      { path: "updateprofile/:id", element: <UpdateProfie /> },
      { path:"chat/:id",element:<ChatPage/>},
      { path: "*", element: <h2>404 Not Found</h2> }
    
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;