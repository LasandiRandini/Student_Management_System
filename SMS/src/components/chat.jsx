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
//       console.log(`User ${userId} registered with socket.`);
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
//       if (
//         (message.sender === recipientId && message.recipient === userId) ||
//         (message.sender === userId && message.recipient === recipientId)
//       ) {
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
//         socket.emit("sendMessage", messageData);

       
//         setMessages((prev) => [...prev, messageData]);
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

import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:9090");

const ChatComponent = ({ userId, recipientId, role }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
    }

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

    socket.on("receiveMessage", (message) => {
      // Only add the message if it is from the recipient
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
        await axios.post("http://localhost:9090/api/chat/send", messageData);
        // Emit message only via socket without updating local messages here
        socket.emit("sendMessage", messageData);
        setNewMessage("");
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
