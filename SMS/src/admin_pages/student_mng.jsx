

// import { useState, useEffect } from "react";

// const TableComponent = () => {
//   const [students, setStudents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const itemsPerPage = 10;

//   // Fetch students data from the backend
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/students/getStudent');
//         const data = await response.json();
//         setStudents(data);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Filtering and Pagination Logic
//   const filteredData = students.filter(student =>
//     student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.contact_no.includes(searchQuery) ||
//     student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.department.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Show popup with modules
//   const showModules = (modules) => {
//     alert("Enrolled Modules: " + modules.join(", "));
//   };

//   return (
//     <div className="p-6 h-full w-full bg-customColor rounded-lg shadow-lg">
//       <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
//         <h1><b>Student Management</b></h1>
//       </div>

//       <div className="p-4 w-full bg-white rounded-lg shadow-lg">
       

//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <label htmlFor="show" className="mr-2">Show</label>
//             <select id="show" className="border border-gray-300 p-1 rounded">
//               <option>10</option>
//               <option>20</option>
//               <option>30</option>
//             </select>
//           </div>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search"
//               className="border border-gray-300 p-2 rounded w-64"
//               value={searchQuery} 
//               onChange={(e) => setSearchQuery(e.target.value)} 
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300 text-left">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">#</th>
//                 <th className="border border-gray-300 p-2">Student Name</th>
//                 <th className="border border-gray-300 p-2">Tel. No</th>
//                 <th className="border border-gray-300 p-2">Email</th>
//                 <th className="border border-gray-300 p-2">Birth Day</th>
//                 <th className="border border-gray-300 p-2">Department</th>
//                 <th className="border border-gray-300 p-2">Actions</th>
//                 <th className="border border-gray-300 p-2">Verification</th>
//                 <th className="border border-gray-300 p-2">Active Status</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedData.map((student, index) => (
//                 <tr key={student._id}>
//                   <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.first_name} {student.last_name}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.contact_no}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.email}</td>
//                   <td className="border border-gray-300 p-2 text-center">{new Date(student.birth_day).toLocaleDateString()}</td>
//                   <td className="border border-gray-300 p-2 text-center">{student.department}</td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <button
//                       className="bg-blue-500 text-white px-2 py-1 rounded"
//                       onClick={() => showModules(student.modules)}
//                     >
//                       More
//                     </button>
//                   </td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <button
//                       className={`px-2 py-1 rounded text-center ${student.isVerified ? 'bg-green-500' : 'bg-red-500'} text-white`}
//                     >
//                       {student.isVerified ? 'Verified' : 'Not Verified'}
//                     </button>
//                   </td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <button
//                       className={`px-2 py-1 rounded text-center ${student.isActive ? 'bg-green-500' : 'bg-gray-500'} text-white`}
//                     >
//                       {student.isActive ? 'Active' : 'Inactive'}
//                     </button>
//                   </td>
                  
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-4">
//           <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 mx-1 bg-gray-200 rounded">Previous</button>
//           {[...Array(totalPages).keys()].map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page + 1)}
//               className={`px-3 py-1 mx-1 ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             >
//               {page + 1}
//             </button>
//           ))}
//           <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 mx-1 bg-gray-200 rounded">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableComponent;
import { useState, useEffect } from "react";

const TableComponent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // Fetch students data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/students/getStudent');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  // Function to verify student
  const verifyStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/students/verify/${studentId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === studentId ? { ...student, isVerified: true } : student
          )
        );
      } else {
        console.error("Failed to verify student");
      }
    } catch (error) {
      console.error("Error verifying student:", error);
    }
  };

  // Filtering and Pagination Logic
  const filteredData = students.filter(student =>
    student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.contact_no.includes(searchQuery) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Show popup with modules
  const showModules = (modules) => {
    alert("Enrolled Modules: " + modules.join(", "));
  };

  return (
    <div className="p-6 h-full w-full bg-customColor rounded-lg shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Student Management</b></h1>
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="show" className="mr-2">Show</label>
            <select id="show" className="border border-gray-300 p-1 rounded">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-2 rounded w-64"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Student Name</th>
                <th className="border border-gray-300 p-2">Tel. No</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Birth Day</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Current Level</th>
                <th className="border border-gray-300 p-2">Modules</th>
                <th className="border border-gray-300 p-2">Verification</th>
                
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
                <tr key={student._id}>
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.first_name} {student.last_name}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.contact_no}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.email}</td>
                  <td className="border border-gray-300 p-2 text-center">{new Date(student.birth_day).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.department}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.level}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => showModules(student.modules)}
                    >
                      More
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {!student.isVerified ? (
                      <button
                        onClick={() => verifyStudent(student._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Verify
                      </button>
                    ) : (
                      <span className="text-white bg-blue-500  px-2 py-1 rounded">Verified</span>
                    )}
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-3 py-1 mx-1 bg-gray-200 rounded">Previous</button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 mx-1 ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {page + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-3 py-1 mx-1 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
