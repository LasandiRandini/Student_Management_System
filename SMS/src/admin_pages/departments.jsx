import { useState, useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Department = () => {
  const [showForm, setShowForm] = useState(false);
  const [departmentId, setDepartmentId] = useState(null); 
  const [departmentName, setDepartmentName] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/departments/getdepartment');
      setDepartments(response.data); 
    } catch (error) {
      console.error("Error fetching departments: ", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddOrUpdateDepartment = async (e) => {
    e.preventDefault();
    try {
      if (departmentId) {
        
        await axios.put(`http://localhost:9090/api/departments/updatedepartment/${departmentId}`, {
          name: departmentName,
          headOfDepartment: departmentHead
        });
        Swal.fire({
          icon: 'success',
          title: 'Department updated successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
       
        await axios.post('http://localhost:9090/api/departments/createdepartment', {
          name: departmentName,
          headOfDepartment: departmentHead
        });
        Swal.fire({
          icon: 'success',
          title: 'Department added successfully!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      setShowForm(false);
      setDepartmentId(null); 
      setDepartmentName("");
      setDepartmentHead("");
      fetchDepartments();
    } catch (error) {
      console.error("Error saving department: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error saving department',
      });
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:9090/api/departments/deletedepartment/${departmentId}`);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Department deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        fetchDepartments();
      }
    } catch (error) {
      console.error("Error deleting department: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error deleting department',
      });
    }
  };

  const handleEditDepartment = (department) => {
    setDepartmentId(department._id);
    setDepartmentName(department.name);
    setDepartmentHead(department.headOfDepartment);
    setShowForm(true);
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
          onClick={() => {
            setShowForm(!showForm);
            setDepartmentId(null); 
            setDepartmentName("");
            setDepartmentHead("");
          }}
        >
          {departmentId ? "Edit Department" : "Add Department"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddOrUpdateDepartment} className="mb-6">
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
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {departmentId ? "Update Department" : "Save Department"}
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
            <div className="bg-blue-900 text-white p-4 rounded-full">
              <FaUniversity className="text-3xl" />
            </div>

            <h2 className="text-xl font-semibold">{department.name}</h2>
            <p className="text-gray-600">Head: {department.headOfDepartment}</p>

            <div className="flex space-x-2">
              {[1, 2, 3, 4].map(level => (
                <button 
                  key={level}
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => handleNavigateToModules(department._id, level)}
                >
                  Level {level}
                </button>
              ))}
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                onClick={() => handleEditDepartment(department)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleDeleteDepartment(department._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
