


import  {useState,useEffect } from 'react';
import { FiMenu, FiUser } from "react-icons/fi";
import SLT from "../assets/SLT_logo_b.png";


const S_Navbar = () => {

  const [user, setUser] = useState({});

// Fetch user data from localStorage and set it
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  if (storedUser && storedUser.first_name && storedUser.last_name) {
    setUser(storedUser);
  }
}, []); 
  return (
    <nav className="bg-blue-100 shadow-lg">
      <div className="max-w-ful mx-auto px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <div className="flex-shrink-0 ">
            <img src={SLT} alt="SLT Logo" className="w-34 h-12" />
          </div>

          {/* Nav Links - Center */}
          <div className="hidden md:flex space-x-8 text-center">
            <a href="/s_dashboard" className="text-gray-700 hover:text-blue-500  font-bold">
              Dashboard
            </a>
            <a href="/my_courses" className="text-gray-700 hover:text-blue-500 font-bold">
              My Courses
            </a>
          </div>

          {/* User Profile Section - Right */}
          <div className="flex items-center space-x-4">
            <FiUser className="text-3xl  text-gray-600" />
            <div className="mt-2  text-1xl font-bold text-blak">
        Hi, {user.first_name?.toUpperCase()} {user.last_name?.toUpperCase()}
      </div>
            
            <FiMenu className="text-2xl md:hidden" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default S_Navbar;
