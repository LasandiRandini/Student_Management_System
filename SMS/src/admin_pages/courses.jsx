import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddModule = () => {
  const { departmentId, level } = useParams();
  const [departmentName, setDepartmentName] = useState(""); 
  const [modules, setModules] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [moduleName, setModuleName] = useState("");
  const [moduleCredits, setModuleCredits] = useState("");
  const [moduleLecturer, setModuleLecturer] = useState("");
  const [moduleImage, setModuleImage] = useState(null);
  
  const fetchDepartmentName = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/departments/getdepname/${departmentId}`);
      setDepartmentName(response.data.name); 
    } catch (error) {
      console.error("Error fetching department name: ", error);
    }
  };

 
  const fetchModules = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/modules/getmodule/${departmentId}/${level}`);
      setModules(response.data);
    } catch (error) {
      console.error("Error fetching modules: ", error);
    }
  };

 
  // useEffect(() => {
  //   console.log("Department ID:", departmentId, "Level:", level); 
  //   fetchDepartmentName();
  //   fetchModules();
  // });
  useEffect(() => {
    console.log("Department ID:", departmentId, "Level:", level); 
    fetchDepartmentName();
    fetchModules();
  }, [departmentId, level]);
  
  // const handleAddModule = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:9090/api/modules/createmodule', {
  //       name: moduleName,
  //       credits: moduleCredits,
  //       lecturer: moduleLecturer,
  //       departmentId,
  //       level, 
  //     });
  //     setModules([...modules, response.data]); 
  //     setShowModal(false); 
  //     setModuleName("");
  //     setModuleCredits("");
  //     setModuleLecturer("");
  //   } catch (error) {
  //     console.error("Error adding module: ", error);
  //   }
  // };
  const handleAddModule = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); 
    formData.append("name", moduleName);
    formData.append("credits", moduleCredits);
    formData.append("lecturer", moduleLecturer);
    formData.append("departmentId", departmentId);
    formData.append("level", level);
    if (moduleImage) {
      formData.append("image", moduleImage); 
    }
  
    try {
      const response = await axios.post('http://localhost:9090/api/modules/createmodule', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setModules([...modules, response.data]);
      setShowModal(false);
      setModuleName("");
      setModuleCredits("");
      setModuleLecturer("");
      setModuleImage(null); 
    } catch (error) {
      console.error("Error adding module: ", error);
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{departmentName} - Level {level}</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => setShowModal(true)} 
        >
          Add Module
        </button>
      </div>

      
      <div className="mt-6">
        <h2 className="text-xl font-bold">Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {modules.map((module) => (
            <div
              key={module._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
            <h3 className="text-lg font-semibold">{module.courseCode}</h3>
              <h3 className="text-lg font-semibold">{module.name}</h3>

              <p className="text-gray-500">Credits: {module.credits}</p>
              <p className="text-gray-500">Lecturer: {module.lecturer}</p>

              
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => console.log("Edit module", module._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => console.log("Delete module", module._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Module</h2>
            <form onSubmit={handleAddModule}>
              <div className="mb-4">
                <label className="block text-gray-700">Module Name:</label>
                <input
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Credits:</label>
                <input
                  type="number"
                  value={moduleCredits}
                  onChange={(e) => setModuleCredits(e.target.value)}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Lecturer:</label>
                <input
                  type="text"
                  value={moduleLecturer}
                  onChange={(e) => setModuleLecturer(e.target.value)}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
    <label className="block text-gray-700">Upload Image:</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setModuleImage(e.target.files[0])}
      className="border border-gray-300 rounded w-full p-2"
      required
    />
  </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)} 
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddModule;
