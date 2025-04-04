import React, { useState } from 'react';
import Signup from './Signup';
const Navbar = () => {

  const [isSigninOpen, setIsSigninOpen] = useState(false);
  // debugger
  return (
    <>
    <nav className="bg-green-800 text-white p-4 md:px-20 flex justify-between items-center">
      <h1 className="text-2xl font-bold">TaskZen</h1>
      <div>
        {/* <button className="px-4 py-2 mr-2 border border-white rounded">Login</button> */}
        <button className="px-4 py-2 bg-white text-green-600 rounded hover:bg-green-400 hover:text-white" onClick={() => setIsSigninOpen(true)}>Sign In</button>
      </div>
    </nav>

    {isSigninOpen && <Signup onClose={() => setIsSigninOpen(false)} ></Signup>}
    </>
  );
};

export default Navbar;