

// import axios from 'axios';

// const AdminNotifications = () => {
// //   const sendNotification = async (type) => {
// //     let endpoint = '';
// //     if (type === 'assessment') endpoint = 'http://localhost:9090/api/admins/send-assessment';
// //     else if (type === 'result') endpoint = 'http://localhost:9090/api/admins/send-result';
// //     else if (type === 'event') endpoint = 'http://localhost:9090/api/admins/send-event';

// //     try {
// //       const response = await axios.post(endpoint);
// //       alert(response.data.message);
// //     } catch (error) {
// //       console.error("Error sending notification:", error);
// //       alert("Failed to send notification.");
// //     }
// //   };
// const sendNotification = async (type, studentId) => {
//     let endpoint = '';
//     if (type === 'assessment') endpoint = 'http://localhost:9090/api/admins/send-assessment';
//     else if (type === 'result') endpoint = 'http://localhost:9090/api/admins/send-result';
//     else if (type === 'event') endpoint = 'http://localhost:9090/api/admins/send-event';
  
//     try {
//       const response = await axios.post(endpoint, { studentId });
//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       alert("Failed to send notification.");
//     }
//   };
//   return (
//     <div>
//       <h2>Admin Notifications</h2>
//       <button onClick={() => sendNotification('assessment')}>Send Assessment Reminder</button>
//       <button onClick={() => sendNotification('result')}>Send Exam Result</button>
//       <button onClick={() => sendNotification('event')}>Send Event Reminder</button>
//     </div>
//   );
// };

// export default AdminNotifications;

import axios from "axios";
import { useState } from "react";

const AdminNotifications = () => {
  const [studentId, setStudentId] = useState("");

  const sendNotification = async (type) => {
    let endpoint = "";
    if (type === "assessment") endpoint = "http://localhost:9090/api/admins/send-assessment";
    else if (type === "result") endpoint = "http://localhost:9090/api/admins/send-result";
    else if (type === "event") endpoint = "http://localhost:9090/api/admins/send-event";

    try {
      const response = await axios.post(endpoint, { studentId });
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div>
      <h2>Admin Notifications</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={() => sendNotification("assessment")}>Send Assessment Reminder</button>
      <button onClick={() => sendNotification("result")}>Send Exam Result</button>
      <button onClick={() => sendNotification("event")}>Send Event Reminder</button>
    </div>
  );
};

export default AdminNotifications;
