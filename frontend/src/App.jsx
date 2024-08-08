import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* Main App */}
      <Link to="/login" className="text-xl px-4 py-2 bg-blue-400">
        Login Now
      </Link>
    </>
  );
};

export default App;
