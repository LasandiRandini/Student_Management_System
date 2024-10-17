

import { useState } from "react";

const ReportTable = () => {
  
  const [data] = useState([
    {
      id: 1,
      incident: "Signal Interapt",
      customerName: "Name 1",
      customerTel: "0746998198",
      customerEmail: "customer1@test.com",
      incidentDescription: "Test Signal",
      assignedEmployee: "Nimal",
      status: "Assigned",
    },
    {
      id: 2,
      incident: "Signal Interapt",
      customerName: "Name 2",
      customerTel: "0746998198",
      customerEmail: "customer2@test.com",
      incidentDescription: "Signal Intatrapt",
      assignedEmployee: "Kmal",
      status: "Not Assigned",
    },
    {
      id: 3,
      incident: "Signal Interapt",
      customerName: "Name 3",
      customerTel: "0746998198",
      customerEmail: "customer3@test.com",
      incidentDescription: "Signal Intatrapt",
      assignedEmployee: "Nimal",
      status: "Completed",
    },
    {
      id: 4,
      incident: "Signal Interapt",
      customerName: "Name 4",
      customerTel: "0746998198",
      customerEmail: "customer4@test.com",
      incidentDescription: "Test Brand",
      assignedEmployee: "brand_manager",
      status: "Not Assigned",
    },
    {
      id: 5,
      incident: "Signal Interapt",
      customerName: "Name 5",
      customerTel: "0746998198",
      customerEmail: "customer5@test.com",
      incidentDescription: "Test Brand",
      assignedEmployee: "brand_manager",
      status: "Assigned",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredData = data.filter(item =>
    item.incident.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customerTel.includes(searchQuery) ||
    item.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.incidentDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.assignedEmployee.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  

  return (
    <div className="p-6 h-full w-full bg-customColor rounded-lg shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1><b>Reports</b></h1>
      </div>
      <div className="p-4 w-full bg-white rounded-lg shadow-lg">
        {/* Add Button */}
        <div className="flex justify-between items-center mb-4">
       

          {/* Filter Section */}
          <div className="flex items-center space-x-3">
            <div>
              <label htmlFor="show" className="mr-2">Show</label>
              <select id="show" className="border border-gray-300 p-1 rounded">
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </select>
            </div>
            <div className="relative">
              <input type="text" placeholder="Search" className="border border-gray-300 p-2 rounded w-64"
                   value={searchQuery} 
                   onChange={(e) => setSearchQuery(e.target.value)}  />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 border-rounded-lg text-left">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 rounded-tl-lg">#</th>
                <th className="border border-gray-300 p-2">Incident</th>
                <th className="border border-gray-300 p-2">Customer Name</th>
                <th className="border border-gray-300 p-2">Customer Tel. No</th>
                <th className="border border-gray-300 p-2">Customer Email</th>
                <th className="border border-gray-300 p-2">Incident Description</th>
                <th className="border border-gray-300 p-2">Assigned Employee</th>
                <th className="border border-gray-300 p-2 rounded-tr-lg">Progress Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td className={`border border-gray-300 p-2 text-center ${index === paginatedData.length - 1 ? 'rounded-bl-lg' : ''}`}>
                    {item.id}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{item.incident}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.customerName}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.customerTel}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.customerEmail}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.incidentDescription}</td>
                  <td className="border border-gray-300 p-2 text-center">{item.assignedEmployee}</td>
                  <td className={`border border-gray-300 p-2 text-center ${index === paginatedData.length - 1 ? 'rounded-br-lg' : ''}`}>
                    <span className={`px-2 py-1 rounded ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
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

        {/* Download Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Download</button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get status class based on the status
const getStatusClass = (status) => {
  switch (status) {
    case 'Assigned': return 'bg-blue-500 text-white';
    case 'Completed': return 'bg-green-500 text-white';
    case 'Not Assigned': return 'bg-red-500 text-white';
    default: return 'text-gray-500';
  }
};

export default ReportTable;
