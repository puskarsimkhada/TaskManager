import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import axios from "axios";
const Navbar = () => {
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);


  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem("token");
      if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try { 
          const response = await axios.get("http://127.0.0.1:8000/api/profile");
          if(response.data){
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.log("Error checking status");
        localStorage.removeItem("token");
        }
      }
    };
    checkStatus();
  }, []);

const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setShowProfileMenu(false);
}
console.log("Login:", isLoggedIn);
 
  return (
    <>
      <nav className="bg-green-800 text-white p-4 md:px-20 flex justify-between items-center">
        <h1 className="text-2xl font-bold">TaskZen</h1>
        <div className="relative">
          {!isLoggedIn ? (
            <button
              className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-400 hover:text-white"
              onClick={() => setIsSigninOpen(true)}
            >
              Sign In
            </button>
          ) : (
            <div>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-400 hover:text-white"
              >
                Profile
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-green-700 border border-gray-200 rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left hover:bg-green-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {isSigninOpen && (
        <Signup
          onClose={() => setIsSigninOpen(false)}
          setIsLoggedIn={setIsLoggedIn}
        ></Signup>
      )}
    </>
  );
};

export default Navbar;
