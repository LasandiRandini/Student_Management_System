

import  { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F407B] to-[#24AF77] p-6">
      

      {/* Welcome Section */}
      <div className="mt-6 mb-8 text-3xl font-bold text-white">
        Hi, 2121 – JOHN FERNANDO! 👋
      </div>

      {/* Main Content - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Dates</h2>
          <Calendar
            onChange={setDate}
            value={date}
            className="mb-4"
          />
          <div className="flex justify-between mt-4">
            <span className="font-medium text-gray-700">Start date:</span>
            <span className="text-gray-600">{date.toLocaleDateString()}</span>
          </div>
        </div>

        {/* Search Courses Button */}
        <div className="bg-white rounded-lg shadow-lg flex justify-center items-center p-6">
          <button className="bg-blue-600 text-white text-lg py-4 px-8 rounded-lg hover:bg-blue-700 transition-all flex items-center">
            <FaSearch className="mr-2" />
            Search Courses to ENROLL &gt;&gt;
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
          <p className="text-gray-500 text-center">Up Coming Events</p>
        </div>
      </div>

      {/* Statistics Section */}
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
