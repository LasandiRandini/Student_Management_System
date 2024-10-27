import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [events] = useState([
    { title: 'Physics Seminar', date: '2024-10-30' },
    { title: 'Mathematics Workshop', date: '2024-11-05' },
    { title: 'Open Day', date: '2024-11-12' }
  ]);

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser.first_name && storedUser.last_name) {
      setUser(storedUser);
    }
  }, []);

  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/student_modules/search?courseCode=${searchTerm}`);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Could not retrieve courses. Please try again.');
    }
  };


  const enrollInCourse = async (courseCode) => {
    try {
      const studentId = user.id;
      await axios.post(`http://localhost:9090/api/student_modules/enroll`, { studentId, courseCode });
      alert(`Successfully enrolled in course ${courseCode}`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Enrollment failed. Please try again.');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F407B] to-[#24AF77] p-6">
      <div className="mt-6 mb-8 text-3xl font-bold text-white">
        Hi, {user.first_name?.toUpperCase()} {user.last_name?.toUpperCase()}! 👋
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Dates</h2>
          <Calendar onChange={setDate} value={date} className="mb-4" />
          <div className="flex justify-between mt-4">
            <span className="font-medium text-gray-700">Start date:</span>
            <span className="text-gray-600">{date.toLocaleDateString()}</span>
          </div>
        </div>

       
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Courses to Enroll</h3>
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
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">{course.name}</span>
                  <button
                    onClick={() => enrollInCourse(course.courseCode)}
                    className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                  >
                    Enroll
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No courses found. Try searching for a valid course code.</p>
            )}
          </div>
        </div>

        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h3>
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
            <p className="text-gray-700 font-semibold">Total no of completed courses</p>
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
    </div>
  );
};

export default Dashboard;
