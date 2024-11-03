import { useState, useEffect } from 'react';
import { FiMenu, FiUser, FiMessageSquare } from "react-icons/fi";
import SLT from "../assets/SLT_logo_b.png";
import ChatComponent from "../components/chat"; 

const S_Navbar = () => {
  const [user, setUser] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const [admin, setAdmin] = useState({}); 

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Loaded user from localStorage:", storedUser);
    if (storedUser && storedUser.first_name && storedUser.last_name) {
      setUser(storedUser);
    }
  
    const storedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");
    console.log("Loaded admin from localStorage:", storedAdmin);
    if (storedAdmin && storedAdmin.first_name && storedAdmin.last_name) {
      setAdmin(storedAdmin);
    }
  }, []);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <nav className="bg-blue-100 shadow-lg">
        <div className="max-w-ful mx-auto px-8">
          <div className="flex justify-between items-center py-2">
            
            <div className="flex-shrink-0">
              <img src={SLT} alt="SLT Logo" className="w-34 h-12" />
            </div>

            
            <div className="hidden md:flex space-x-8 text-center">
              <a href="/s_dashboard" className="text-gray-700 hover:text-blue-500 font-bold">
                Dashboard
              </a>
              <a href="/my_courses" className="text-gray-700 hover:text-blue-500 font-bold">
                My Courses
              </a>
            </div>

            
            <div className="flex items-center space-x-4">
              <FiUser className="text-3xl text-gray-600" />
              <div className="mt-2 text-1xl font-bold text-black">
                Hi, {user.first_name?.toUpperCase()} {user.last_name?.toUpperCase()}
              </div>
              <FiMessageSquare 
                className="text-3xl text-gray-600 cursor-pointer"
                onClick={toggleChat} 
              />
              <FiMenu className="text-2xl md:hidden" />
            </div>
          </div>
        </div>
      </nav>

      
      {isChatOpen && user._id && ( 
        <div className="fixed bottom-0 right-0 w-96 h-200 bg-white border border-gray-300 shadow-lg p-4">
          <ChatComponent userId={user._id} recipientId={admin._id} role="student" />

          <button className="absolute top-2 right-2 text-red-600" onClick={toggleChat}>Close</button>
        </div>
      )}
    </div>
  );
};

export default S_Navbar;
