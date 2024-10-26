import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [moduleSearch, setModuleSearch] = useState("");
  const [departmentData, setDepartmentData] = useState(null);
  const [moduleData, setModuleData] = useState(null);

  // Fetch total metrics
  useEffect(() => {
    axios.get("http://localhost:9090/api/dashboard/dashboardMetrics").then((response) => {
      setMetrics(response.data);
    });
  }, []);

  // Search for department
  const handleDepartmentSearch = () => {
    axios.get(`http://localhost:9090/api/dashboard/searchDepartment/${departmentSearch}`).then((response) => {
      setDepartmentData(response.data);
    }).catch(() => setDepartmentData(null));
  };

  // Search for module
  const handleModuleSearch = () => {
    axios.get(`http://localhost:9090/api/dashboard/searchModule/${moduleSearch}`).then((response) => {
      setModuleData(response.data);
    }).catch(() => setModuleData(null));
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-2xl">{metrics.totalStudents}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Departments</h2>
          <p className="text-2xl">{metrics.totalDepartments}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-2xl">{metrics.totalModules}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Search Department</h2>
        <input
          type="text"
          placeholder="Enter department name"
          className="border p-2 rounded w-full"
          value={departmentSearch}
          onChange={(e) => setDepartmentSearch(e.target.value)}
        />
        <button onClick={handleDepartmentSearch} className="bg-blue-500 text-white p-2 rounded mt-2">Search</button>

        {departmentData && (
          <div className="p-4 bg-white shadow rounded-lg">
            <p><strong>Department:</strong> {departmentData.department}</p>
            <p><strong>Total Students:</strong> {departmentData.studentCount}</p>
            <p><strong>Total Courses:</strong> {departmentData.courseCount}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Search Course</h2>
        <input
          type="text"
          placeholder="Enter course name"
          className="border p-2 rounded w-full"
          value={moduleSearch}
          onChange={(e) => setModuleSearch(e.target.value)}
        />
        <button onClick={handleModuleSearch} className="bg-blue-500 text-white p-2 rounded mt-2">Search</button>

        {moduleData && (
          <div className="p-4 bg-white shadow rounded-lg">
            <p><strong>Course:</strong> {moduleData.module}</p>
            <p><strong>Total Students:</strong> {moduleData.studentCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}
