import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const S_Courses = () => {
  const [user, setUser] = useState(null);
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser && storedUser._id) {
      setUser(storedUser);
      fetchStudentModules(storedUser._id);
    }
  }, []);

  const fetchStudentModules = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:9090/api/student_modules/${studentId}/modules`);
      setModules(response.data);
      setFilteredModules(response.data); 
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };


  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = modules.filter((module) =>
      module.name.toLowerCase().includes(lowercasedSearchTerm) &&
      (selectedFilter === "all" || module.level === parseInt(selectedFilter))
    );
    setFilteredModules(filtered);
  }, [searchTerm, selectedFilter, modules]);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-900 via-green-900 to-blue-700 rounded-lg shadow-md h-screen">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Course Overview</h1>

        
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-3 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">ALL Levels</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>

        
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <div
              key={module._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transition hover:shadow-xl"
            >
              
            <img
  src={module.image ? `http://localhost:9090/${module.image}` : '/images/default-placeholder.jpg'}
  alt={module.name}
  className="w-full h-40 object-cover rounded-lg"
/>
              <h2 className="text-xl font-semibold">{module.name}</h2>
              <Link to={`/student/my_courses/${module._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                  View Course
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No modules found.</p>
        )}
      </div>

      
      <div className="absolute bottom-4 right-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default S_Courses;

