import { useState, useEffect } from "react";
import { Drawer, Box, IconButton, Badge } from "@mui/material";
import ChatComponent from "../components/chat";
import ChatIcon from "@mui/icons-material/Chat";

const TableComponent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [admin, setAdmin] = useState({});
  const [recipientId, setRecipientId] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");
    if (storedAdmin && storedAdmin._id) {
      setAdmin(storedAdmin);
    }
  }, []);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:9090/api/students/getStudent"
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  const showModules = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/students/${studentId}/modules`
      );
      const student = await response.json();
      const moduleNames = student.modules.map((module) => module.name);
      alert("Enrolled Modules: " + moduleNames.join(", "));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  const verifyStudent = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/students/verify/${studentId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student._id === studentId
              ? { ...student, isVerified: true }
              : student
          )
        );
      } else {
        console.error("Failed to verify student");
      }
    } catch (error) {
      console.error("Error verifying student:", error);
    }
  };

  const filteredData = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.contact_no.includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleChatDrawer = (studentId) => {
    setRecipientId(studentId);
    setIsChatOpen(!isChatOpen);
  };
  console.log(paginatedData)

  return (
    <div className="p-6 h-full w-full bg-customColor rounded-lg shadow-lg">
      <div className="flex space-x-3 bg-[#49B558] text-white p-3 mb-5 rounded-t-lg rounded-b-lg">
        <h1>
          <b>Student Management</b>
        </h1>
      </div>

      <div className="p-4 w-full bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label htmlFor="show" className="mr-2">
              Show
            </label>
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
                <th className="border border-gray-300 p-2">Message</th>
                <th className="border border-gray-300 p-2">Verification</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
                <tr key={student._id}>
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {student.contact_no}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {student.email}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {new Date(student.birth_day).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {student.department}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {student.level}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => showModules(student._id)}
                    >
                      More
                    </button>
                  </td>
                  <td>
                    <Drawer
                      anchor="right"
                      open={isChatOpen}
                      onClose={() => setIsChatOpen(false)}
                    >
                      <Box sx={{ width: 400, padding: 2 }}>
                        {admin._id && recipientId ? (
                          <ChatComponent
                            userId={admin._id}
                            recipientId={recipientId}
                            role="admin"
                          />
                        ) : (
                          <p>Select a conversation to start chatting</p>
                        )}
                      </Box>
                    </Drawer>
                    <IconButton
                      onClick={() => toggleChatDrawer(student._id)}
                    >
                      <Badge color="secondary">
                        <ChatIcon fontSize="medium" />
                      </Badge>
                    </IconButton>
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
                      <span className="text-white bg-blue-500  px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 mx-1 bg-gray-200 rounded"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === page + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 mx-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
