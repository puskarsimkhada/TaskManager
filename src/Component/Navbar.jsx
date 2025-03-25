import React from 'react';
const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">BrandName</h1>
      <div>
        <button className="px-4 py-2 mr-2 border border-white rounded">Login</button>
        <button className="px-4 py-2 bg-white text-blue-600 rounded">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
