// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:9090");

// const ChatComponent = ({ userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   console.log(userId)

//   useEffect(() => {
//     // Connect to the socket and register the user
//     socket.on("connect", () => {
//       socket.emit("register", userId);
//       console.log(`User ${userId} registered`);
//     });

//     // Listen for incoming real-time messages
//     socket.on("receiveMessage", (message) => {
//       console.log("Received message:", message);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [userId]);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const messageData = {
//         sender: userId,
//         content: newMessage,
//         timestamp: new Date().toISOString(),
//       };
      
//       // Emit the message
//       socket.emit("sendMessage", messageData);
//       setNewMessage(""); // Clear the input
//     }
//   };

//   return (
//     <div className="chat-box">
//       <div className="chat-history">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.sender === userId ? "sent" : "received"}>
//             <p>{msg.sender}{msg.content}</p>
//             <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;

import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:9090");

const ChatComponent = ({ userId, recipientId, role }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(userId,recipientId,role)

  useEffect(() => {
    // Log the socket connection to confirm it's established
    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
      
      // Emit the register event
      if (userId) {
        socket.emit("register", userId);
        console.log(`Register event emitted for user: ${userId}`); // Debug log to confirm register is emitted
      }
    });

    // Fetch initial chat history
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/chat/history/${userId}/${recipientId}`);
        setMessages(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      if (message.sender === recipientId && message.recipient === userId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, recipientId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: userId,
        recipient: recipientId,
        content: newMessage,
        studentCode: role === "student" ? userId : undefined,
        timestamp: new Date().toISOString(),
      };

      try {
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
        await axios.post("http://localhost:9090/api/chat/send", messageData);
        socket.emit("sendMessage", messageData);
      } catch (error) {
        console.error("Failed to send message:", error);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={msg.sender === userId ? "sent" : "received"}>
              <p>{msg.content}</p>
              {msg.studentCode && role === "admin" && (
                <small className="text-gray-500">From Student: {msg.studentCode}</small>
              )}
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
          ))
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:9090");

// const ChatComponent = ({ userId, recipientId, role }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
//       socket.emit("register", userId);
//     }

//     // Fetch initial chat history
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9090/api/chat/history/${userId}/${recipientId}`);
//         setMessages(response.data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch messages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();

//     // Listen for incoming messages
//     socket.on("receiveMessage", (message) => {
//       if (message.sender === recipientId && message.recipient === userId) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [userId, recipientId]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const messageData = {
//         sender: userId,
//         recipient: recipientId,
//         content: newMessage,
//         studentCode: role === "student" ? userId : undefined,
//         timestamp: new Date().toISOString(),
//       };

//       try {
//         setMessages((prev) => [...prev, messageData]); // Show the message immediately
//         setNewMessage("");

//         // Emit message via socket and store in backend
//         await axios.post("http://localhost:9090/api/chat/send", messageData);
//         socket.emit("sendMessage", messageData);
//       } catch (error) {
//         console.error("Failed to send message:", error);
//         alert("Failed to send message. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="chat-box">
//       <div className="chat-history">
//         {loading ? (
//           <p>Loading messages...</p>
//         ) : messages.length === 0 ? (
//           <p>No messages yet</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div key={index} className={msg.sender === userId ? "sent" : "received"}>
//               <p>{msg.content}</p>
//               {msg.studentCode && role === "admin" && (
//                 <small className="text-gray-500">From Student: {msg.studentCode}</small>
//               )}
//               <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:9090");

// const ChatComponent = ({ userId, recipientId, role }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (userId) {
//       socket.emit("register", userId);
//     }

//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9090/api/chat/history/${userId}/${recipientId}`);
//         setMessages(response.data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch messages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMessages();

//     socket.on("receiveMessage", (message) => {
//       // Only add the message if it is from the recipient
//       if (message.sender === recipientId && message.recipient === userId) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [userId, recipientId]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const messageData = {
//         sender: userId,
//         recipient: recipientId,
//         content: newMessage,
//         studentCode: role === "student" ? userId : undefined,
//         timestamp: new Date().toISOString(),
//       };

//       try {
//         await axios.post("http://localhost:9090/api/chat/send", messageData);
//         // Emit message only via socket without updating local messages here
//         socket.emit("sendMessage", messageData);
//         setNewMessage("");
//       } catch (error) {
//         console.error("Failed to send message:", error);
//         alert("Failed to send message. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="chat-box">
//       <div className="chat-history">
//         {loading ? (
//           <p>Loading messages...</p>
//         ) : messages.length === 0 ? (
//           <p>No messages yet</p>
//         ) : (
//           messages.map((msg, index) => (
//             <div key={index} className={msg.sender === userId ? "sent" : "received"}>
//               <p>{msg.content}</p>
//               {msg.studentCode && role === "admin" && (
//                 <small className="text-gray-500">From Student: {msg.studentCode}</small>
//               )}
//               <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="message-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;
