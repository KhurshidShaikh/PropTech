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
import Loader from "./components/Loader";
import ContactPage from "./pages/ContactPage";

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
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <>
      <Navbar />
    <Outlet/>
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
      {path:"/contact",element:<ContactPage/>},
      { path: "*", element: <h2>404 Not Found</h2> }
    
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;