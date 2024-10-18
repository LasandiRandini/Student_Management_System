
// import { FaUniversity } from "react-icons/fa"; 

// const departments = [
//   { id: 1, name: "IT Department" },
//   { id: 2, name: "HR Department" },
//   { id: 3, name: "Finance Department" },
//   { id: 4, name: "Marketing Department" },
//   { id: 5, name: "Engineering Department" },
//   { id: 6, name: "Design Department" },
// ];

// const DepartmentCard = () => {
//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">All Departments</h1>
//         <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
//           Add Department
//         </button>
//       </div>

//       {/* Grid of Department Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {departments.map((department) => (
//           <div
//             key={department.id}
//             className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transition hover:shadow-xl"
//           >
//             {/* Icon */}
//             <div className="bg-blue-500 text-white p-4 rounded-full">
//               <FaUniversity className="text-3xl" />
//             </div>

//             {/* Department Name */}
//             <h2 className="text-xl font-semibold">{department.name}</h2>

//             {/* Visit Courses Button */}
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
//              onClick={() => window.location.href = '/course'} >
//               Visit Courses
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DepartmentCard;

import { useState } from "react";
import { FaUniversity } from "react-icons/fa"; 
import axios from "axios"; 

const departments = [
  { id: 1, name: "IT Department" },
  { id: 2, name: "HR Department" },
  { id: 3, name: "Finance Department" },
  { id: 4, name: "Marketing Department" },
  { id: 5, name: "Engineering Department" },
  { id: 6, name: "Design Department" },
];

const DepartmentCard = () => {
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [departmentName, setDepartmentName] = useState(""); 
  const [departmentHead, setDepartmentHead] = useState("");

  // Function to handle form submission
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/departments/createdepartment', {
        name: departmentName,
        headOfDepartment : departmentHead
      });
      console.log(response.data);
      setShowForm(false); // Close form after successful addition
      alert("Department added successfully!");
    } catch (error) {
      console.error("Error adding department: ", error);
      alert("Error adding department");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">All Departments</h1>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => setShowForm(!showForm)} // Show/hide form on button click
        >
          Add Department
        </button>
      </div>

      {/* Form to add department */}
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

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transition hover:shadow-xl"
          >
            {/* Icon */}
            <div className="bg-blue-500 text-white p-4 rounded-full">
              <FaUniversity className="text-3xl" />
            </div>

            {/* Department Name */}
            <h2 className="text-xl font-semibold">{department.name}</h2>

            {/* Visit Courses Button */}
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              onClick={() => window.location.href = '/course'}
            >
              Visit Courses
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentCard;
