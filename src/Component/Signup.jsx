import React, { useState } from "react";
import * as api from '../API/api'
import { faL } from "@fortawesome/free-solid-svg-icons";
const Signup = ({onClose, setIsLoggedIn}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [usernamePerson, setUsernamePerson] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = async () => {
      const addUser = {
        name: usernamePerson,
        email: userEmail,
        password: userPassword, 
      }
      
      try {
        const response = await api.getRegister(addUser);
        console.log("Register User:", response.data);
        alert("User Register Successfully");
        setIsRegister(false);
      } catch (error) {
        console.log("Unable to Register");
        setError("Unable to Register");
      }
    }

    const handleLogin = async () => {
      const loginUser = {
        email: userEmail,
        password: userPassword, 
      }
      try {
        const response = await api.getLogin(loginUser);
        console.log("Register User:", response.data.token);
        alert("Login Successfully");
        setIsLoggedIn(true);
        
        onClose();
      } catch (error) {
        console.log("Unable to login");
        setError("Unable to login");
      }
    }


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isRegister ? "Sign Up" : "Sign In"}
          </h2>
          <button
            className="mt-4 text-sky-600 block w-full text-right absolute top-0 right-5 text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
          {/* Login Form */}
          {!isRegister && (
            <form className="space-y-4" method="post" action={handleLogin}>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded"
              />
              <button className="w-full bg-green-600 text-white py-2 hover:bg-white hover:text-green-600 border-2 border-green-600 rounded">
                Sign In
              </button>
              <p
                className="text-sm flex"
                onClick={() => setIsRegister(true)}
              >
                Don't have an account? <p onClick={() => setIsRegister(true)} className="ml-2 text-blue-600 cursor-pointer hover:underline">Sign Up</p>
              </p>
            </form>
          )}

          {/* Register Form */}
          {isRegister && (
            <form className="space-y-4" method="post" action={handleRegister}>
              <input
                type="text"
                value={usernamePerson}
                onChange={(e) => setUsernamePerson(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded"
              />
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label>Remember me</label>
              </div>
              <button className="w-full bg-green-600 text-white py-2 hover:bg-white hover:text-green-600 border-2 border-green-600 rounded">
                Register
              </button>
              <p
                className="text-sm flex" 
              >
                Already have an account? <p onClick={() => setIsRegister(false)} className="ml-2 text-blue-600 cursor-pointer hover:underline">Sign In</p>
              </p>
            </form>
          )}

          {/* <button
            className="mt-4 text-red-600 block w-full text-center"
            onClick={onClose}
          >
            &times;
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Signup;
