

// import { useState, useEffect } from "react";
// import { FaUniversity } from "react-icons/fa"; 
// import axios from "axios"; 

// const Department = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [departmentName, setDepartmentName] = useState("");
//   const [departmentHead, setDepartmentHead] = useState("");
//   const [departments, setDepartments] = useState([]);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/departments/getdepartment');
//       setDepartments(response.data); 
//     } catch (error) {
//       console.error("Error fetching departments: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleAddDepartment = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/departments/createdepartment', {
//         name: departmentName,
//         headOfDepartment: departmentHead
//       });
//       console.log(response.data);
//       setShowForm(false);
//       alert("Department added successfully!");
//       fetchDepartments(); 
//     } catch (error) {
//       console.error("Error adding department: ", error);
//       alert("Error adding department");
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">All Departments</h1>
//         <button 
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//           onClick={() => setShowForm(!showForm)} 
//         >
//           Add Department
//         </button>
//       </div>

//       {showForm && (
//         <form onSubmit={handleAddDepartment} className="mb-6">
//           <div className="flex items-center space-x-4">
//             <input
//               type="text"
//               value={departmentName}
//               onChange={(e) => setDepartmentName(e.target.value)}
//               placeholder="Department Name"
//               className="border border-gray-300 rounded px-4 py-2"
//               required
//             />
//             <input
//               type="text"
//               value={departmentHead}
//               onChange={(e) => setDepartmentHead(e.target.value)}
//               placeholder="Department Head"
//               className="border border-gray-300 rounded px-4 py-2"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               Save Department
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {departments.map((department) => (
//           <div
//             key={department._id}  
//             className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transition hover:shadow-xl"
//           >
//             <div className="bg-blue-500 text-white p-4 rounded-full">
//               <FaUniversity className="text-3xl" />
//             </div>

//             <h2 className="text-xl font-semibold">{department.name}</h2>
//             <p className="text-gray-600">Head: {department.headOfDepartment}</p>

//             {/* Buttons to navigate to different levels of courses */}
//             <div className="flex space-x-2">
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={() => window.location.href = `/courses/${department._id}/Level_01`}
//               >
//                 Level 1
//               </button>
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={() => window.location.href = `/courses/${department._id}/Level_02`}
//               >
//                 Level 2
//               </button>
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={() => window.location.href = `/courses/${department._id}/Level_03`}
//               >
//                 Level 3
//               </button>
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                 onClick={() => window.location.href = `/courses/${department._id}/Level_04`}
//               >
//                 Level 4
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Department;

import { useState, useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation

const Department = () => {
  const [showForm, setShowForm] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/departments/getdepartment');
      setDepartments(response.data); 
    } catch (error) {
      console.error("Error fetching departments: ", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/departments/createdepartment', {
        name: departmentName,
        headOfDepartment: departmentHead
      });
      console.log(response.data);
      setShowForm(false);
      alert("Department added successfully!");
      fetchDepartments(); 
    } catch (error) {
      console.error("Error adding department: ", error);
      alert("Error adding department");
    }
  };

  const handleNavigateToModules = (departmentId, level) => {
    navigate(`/courses/${departmentId}/${level}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">All Departments</h1>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setShowForm(!showForm)}
        >
          Add Department
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddDepartment} className="mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Department Name"
              className="border border-gray-300 rounded px-4 py-2"
              required
            />
            <input
              type="text"
              value={departmentHead}
              onChange={(e) => setDepartmentHead(e.target.value)}
              placeholder="Department Head"
              className="border border-gray-300 rounded px-4 py-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save Department
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div
            key={department._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transition hover:shadow-xl"
          >
            <div className="bg-blue-500 text-white p-4 rounded-full">
              <FaUniversity className="text-3xl" />
            </div>

            <h2 className="text-xl font-semibold">{department.name}</h2>
            <p className="text-gray-600">Head: {department.headOfDepartment}</p>

            {/* Buttons to navigate to different levels of courses */}
            <div className="flex space-x-2">
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleNavigateToModules(department._id, 1)}
              >
                Level 1
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleNavigateToModules(department._id, 2)}
              >
                Level 2
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleNavigateToModules(department._id, 3)}
              >
                Level 3
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => handleNavigateToModules(department._id, 4)}
              >
                Level 4
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
