

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9090");

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("Attempting to connect to WebSocket...");

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user && user._id) {
      console.log("Registering user with ID:", user._id);
      socket.emit("register", user._id); 
    } else {
      console.warn("User is not logged in. Notifications will not be received.");
    }

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);
    });

    socket.on("notification", (notification) => {
      console.log("Received notification:", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  const handleNotificationClick = (link) => {
    window.location.href = link;
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} onClick={() => handleNotificationClick(notification.link)}>
            {notification.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentNotifications;
