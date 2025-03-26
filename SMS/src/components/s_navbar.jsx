

import { useState, useEffect } from 'react';
import { FiMenu, FiUser, FiMessageSquare, FiBell } from "react-icons/fi";
import SLT from "../assets/SLT_logo_b.png";
import ChatComponent from "../components/chat";
import { io } from "socket.io-client";

const socket = io("http://localhost:9090");

const S_Navbar = () => {
  const [user, setUser] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser.first_name && storedUser.last_name) {
      setUser(storedUser);
    }

    const storedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");
    if (storedAdmin && storedAdmin.first_name && storedAdmin.last_name) {
      setAdmin(storedAdmin);
    }

    
    if (storedUser && storedUser._id) {
      socket.emit("register", storedUser._id);
    }

    socket.on("notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationClick = (link) => {
    setIsNotificationOpen(false);
    window.location.href = link;
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
              <a href="/results" className="text-gray-700 hover:text-blue-500 font-bold">
                Results
              </a>
            
            </div>

            
            <div className="flex items-center space-x-4">
              
              <FiUser className="text-3xl text-gray-600" />
              <div className="mt-2 text-1xl font-bold text-black">
                Hi, {user.first_name?.toUpperCase()} {user.last_name?.toUpperCase()}
              </div>

             
              <div className="relative">
                <FiBell
                  className="text-3xl text-gray-600 cursor-pointer"
                  onClick={toggleNotifications}
                />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 shadow-lg p-4 rounded-md z-50">
                    <h3 className="text-lg font-bold mb-2">Notifications</h3>
                    <ul className="space-y-2">
                      {notifications.length === 0 ? (
                        <li className="text-gray-500">No new notifications</li>
                      ) : (
                        notifications.map((notification, index) => (
                          <li
                            key={index}
                            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                            onClick={() => handleNotificationClick(notification.link)}
                          >
                            {notification.text}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
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
          <button className="absolute top-2 right-2 text-red-600" onClick={toggleChat}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default S_Navbar;
