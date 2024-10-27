import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
//import amqp from 'amqplib/callback_api';
import axios from "axios";


const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [events] = useState([
    { title: "Physics Seminar", date: "2024-10-30" },
    { title: "Mathematics Workshop", date: "2024-11-05" },
    { title: "Open Day", date: "2024-11-12" },
  ]);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser.first_name && storedUser.last_name) {
      setUser(storedUser);
    }
  }, []);

  const handleSearch = async () => {
    try {
      const { department, level } = user;
      const queryParams = new URLSearchParams();

      if (searchTerm) queryParams.append("courseCode", searchTerm);
      if (department) queryParams.append("departmentId", department);
      if (level) queryParams.append("level", level);

      const response = await axios.get(
        `http://localhost:9090/api/student_modules/search?${queryParams.toString()}`
      );
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);

      Swal.fire({
        icon: "error",
        title: "Enrollment Failed",
        text: "You can’t enroll in this course. Please contact support.",
        confirmButtonText: "OK",
      });
    }
  };
  const enrollInCourse = async (moduleId) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const studentId = storedUser._id;

    try {
      await axios.post(`http://localhost:9090/api/student_modules/enroll`, {
        studentId,
        moduleId,
      });
      alert(`Successfully enrolled in course with ID ${moduleId}`);
      console.log({ studentId, moduleId });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Enrollment failed. Please try again.");
    }
  };
  const submitInquiry = async () => {
    try {
      await axios.post(`http://localhost:9090/api/inquiries/inquiry`, {
        studentId: user._id,
        title: inquiryTitle,
        message: inquiryMessage
      });
      Swal.fire({
        icon: 'success',
        title: 'Inquiry Sent',
        text: 'Your inquiry has been successfully sent to the admin.',
        confirmButtonText: 'OK'
      });
      setInquiryTitle('');
      setInquiryMessage('');
    } catch (error) {
      console.error('Error sending inquiry:', error);
      Swal.fire({
        icon: 'error',
        title: 'Inquiry Failed',
        text: 'Could not send your inquiry. Please try again.',
        confirmButtonText: 'OK'
      });
    }
  };
  // const submitInquiry = async () => {
  //   try {
  //     // Connect to RabbitMQ
  //     amqp.connect('amqp://localhost', (connectErr, connection) => {
  //       if (connectErr) throw connectErr;
        
  //       connection.createChannel((channelErr, channel) => {
  //         if (channelErr) throw channelErr;
  
  //         const queue = 'inquiryQueue';
  //         const message = JSON.stringify({
  //           studentId: user._id,
  //           title: inquiryTitle,
  //           message: inquiryMessage,
  //           timestamp: new Date().toISOString(),
  //         });
  
  //         // Assert queue (create if not exists)
  //         channel.assertQueue(queue, { durable: false });
  
  //         // Send inquiry message to queue
  //         channel.sendToQueue(queue, Buffer.from(message));
  //         console.log("Inquiry sent to RabbitMQ");
  
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Inquiry Sent',
  //           text: 'Your inquiry has been successfully sent to the admin.',
  //           confirmButtonText: 'OK'
  //         });
  
  //         // Clear inquiry fields
  //         setInquiryTitle('');
  //         setInquiryMessage('');
  //       });
  
  //       // Close connection after a timeout
  //       setTimeout(() => {
  //         connection.close();
  //       }, 500);
  //     });
  //   } catch (error) {
  //     console.error('Error sending inquiry:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Inquiry Failed',
  //       text: 'Could not send your inquiry. Please try again.',
  //       confirmButtonText: 'OK'
  //     });
  //   }
  // };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F407B] to-[#24AF77] p-6">
      <div className=" mb-6 text-3xl font-bold text-white">
        Hi, {user.first_name?.toUpperCase()} {user.last_name?.toUpperCase()}! 👋
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Select Dates
          </h2>
          <Calendar onChange={setDate} value={date} className="mb-4" />
          <div className="flex justify-between mt-4">
            <span className="font-medium text-gray-700">Start date:</span>
            <span className="text-gray-600">{date.toLocaleDateString()}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Search Courses to Enroll
          </h3>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter Course Code"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="font-medium text-gray-800">
                    {course.name}
                  </span>
                  <button
                    onClick={() => enrollInCourse(course._id)} // Correctly passing moduleId
                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Enroll
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No courses found. Try searching for a valid course code.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Events
          </h3>
          <ul className="text-gray-700">
            {events.map((event, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{event.date}:</span> {event.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-700 font-semibold">
              Total no of completed courses
            </p>
            <p className="text-4xl font-bold text-gray-800">31</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            View
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-700 font-semibold">Total no of courses</p>
            <p className="text-4xl font-bold text-gray-800">70</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Inquiry to Admin</h3>
          <input
            type="text"
            placeholder="Inquiry Title"
            value={inquiryTitle}
            onChange={(e) => setInquiryTitle(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Enter your message here"
            value={inquiryMessage}
            onChange={(e) => setInquiryMessage(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg h-24"
          />
          <button
            onClick={submitInquiry}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Send Inquiry
          </button>
        </div>
    </div>
  );
};

export default Dashboard;
