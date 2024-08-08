import React from "react";
import { Link } from "react-router-dom";
import RegisterPage from "./RegisterPage";

const LoginPage = () => {
  return (
    <div className="min-w-full min-h-screen flex">
      {/* Image */}
      <div className="min-h-full min-w-[50%] grid place-content-center border-r">
        <h1 className="font-bold text-4xl text-blue-500">PropTech</h1>
        <img
          src="https://img.freepik.com/premium-vector/growth-real-estate-market-businessman-analyzing-housing-business-real-estate-business-concept-flat-vector-illustration_923732-4868.jpg?w=740"
          alt=""
        />
      </div>
      {/* Forms */}
      <div className="flex-1 min-h-full flex justify-center items-center flex-col space-y-4">
        <h2 className="font-semibold text-xl">Login</h2>
        <form action="" className="min-w-[60%] flex flex-col space-y-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="john@gmail.com"
            className="border p-2"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border p-2"
          />

          <button
            type="submit"
            className="py-2 bg-blue-900 font-bold text-white"
            onClick={(e) => e.preventDefault()}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            regsiter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
