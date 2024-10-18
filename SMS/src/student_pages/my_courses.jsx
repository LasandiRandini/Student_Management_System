import { Link } from "react-router-dom";

import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img3 from '../assets/image3.png';
import img4 from '../assets/image4.png';
import img5 from '../assets/image5.png';
import img6 from '../assets/image6.jpg';

const departments = [
    { id: 1, name: "Data Structure(22/23)", image: img1 },
    { id: 2, name: "Data Structure(22/23)", image: img2 },
    { id: 3, name: "Data Structure(22/23)", image: img3 },
    { id: 4, name: "Data Structure(22/23)", image: img4 },
    { id: 5, name: "Data Structure(22/23)", image: img5 },
    { id: 6, name: "Data Structure(22/23)", image: img6 },
];

const S_Courses = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-900 via-green-900 to-blue-700 rounded-lg shadow-md relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Course Overview</h1>
        <select className="px-3 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">ALL</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
        </select>
        <input
          type="text"
          placeholder="Search Courses"
          className="px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transition hover:shadow-xl"
          >
            {/* Render Department Image */}
            <img
              src={department.image}
              alt={department.name}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* Department Name */}
            <h2 className="text-xl font-semibold">{department.name}</h2>

            {/* Visit Courses Button */}
            <Link to="/student/my_courses">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                Visit Courses
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default S_Courses;



