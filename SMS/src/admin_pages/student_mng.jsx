import { useState } from "react";

const TableComponent = () => {
  const [isVerified, setIsVerified] = useState(true); // Starts as "Verified"
  const [isActive, setIsActive] = useState(true); // Starts as "Active"

  // Toggle functions
  const toggleVerified = () => {
    setIsVerified(!isVerified); // Switch between true and false
  };

  const toggleActive = () => {
    setIsActive(!isActive); // Switch between true and false
  };
  const [data] = useState([
    { id: 16, incident: "Signal Interapt", name: "Crucial", tel: "0763557789", email: "kh.lara....@gmail.com", description: "Test Signal", employee: "Nimal", progress: "Assigned" },
    { id: 15, incident: "Signal Interapt", name: "Urgent", tel: "0763658890", email: "kh.lara....@gmail.com", description: "Signal Intatrapt", employee: "Kamal", progress: "Completed" },
    { id: 14, incident: "Signal Interapt", name: "Not Urgent", tel: "076567889", email: "kh.lara....@gmail.com", description: "Signal Intatrapt", employee: "Nimal", progress: "Not Assigned" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

 
  const filteredData = data.filter(item =>
    item.incident.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tel.includes(searchQuery) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.progress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 h-full w-full bg-customColor rounded-lg shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Student Management</b></h1>
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg">
        {/* Add Button */}
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded"
           onClick={() => window.location.href = '/add_incident'}>Add New Student</button>
        </div>

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
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Student ID</th>
                <th className="border border-gray-300 p-2">Student Name</th>
                <th className="border border-gray-300 p-2">Tel. No</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Student Current Year</th>
                <th className="border border-gray-300 p-2">Birth Day</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Verification</th>
                <th className="border border-gray-300 p-2">Active Status</th>
               
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.incident}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.name}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.tel}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.email}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.description}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.employee}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.employee}</td>
                 
                <td className="border border-gray-300 p-2 text-center">
            <button
              onClick={toggleVerified}
              className="bg-blue-500 text-white px-2 py-1  rounded text-center"
            >
              {isVerified ? 'Verified' : 'Not Verified'}
            </button>
          </td>

          <td className="border border-gray-300 p-2 text-center">
            <button
              onClick={toggleActive}
              className="bg-blue-500 text-white px-2 py-1 rounded text-center"
            >
              {isActive ? 'Active' : 'Deactivate'}
            </button>
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

// const getStatusClass = (status) => {
//   switch (status) {
//     case 'Crucial': return 'text-red-500 font-bold';
//     case 'Urgent': return 'text-green-500 font-bold';
//     case 'Not Urgent': return 'text-blue-500 font-bold';
//     default: return 'text-gray-500';
//   }
// };



export default TableComponent;
