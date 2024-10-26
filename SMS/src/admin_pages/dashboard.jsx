import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [metrics, setMetrics] = useState({});
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [moduleSearch, setModuleSearch] = useState("");
  const [departmentData, setDepartmentData] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [departmentWiseData, setDepartmentWiseData] = useState([]);

  // Fetch total metrics
  useEffect(() => {
    axios.get("http://localhost:9090/api/dashboard/dashboardMetrics").then((response) => {
      setMetrics(response.data);
    });

    axios.get("http://localhost:9090/api/dashboard/departmentWiseData").then((response) => {
      setDepartmentWiseData(response.data);
    });
  }, []);

  // Search for department
  const handleDepartmentSearch = () => {
    axios.get(`http://localhost:9090/api/dashboard/searchDepartment/${departmentSearch}`)
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch(() => setDepartmentData(null));
  };

  // Search for module
  const handleModuleSearch = () => {
    axios.get(`http://localhost:9090/api/dashboard/searchModule/${moduleSearch}`)
      .then((response) => {
        setModuleData(response.data);
      })
      .catch(() => setModuleData(null));
  };

  // Chart data for department-wise students
  const studentChartData = {
    labels: departmentWiseData.map((d) => d.departmentName),
    datasets: [
      {
        label: "Students",
        data: departmentWiseData.map((d) => d.studentCount),
        backgroundColor: ["#4CAF50", "#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED", "#FF9F40"],
      },
    ],
  };

  // Chart data for department-wise courses
  const courseChartData = {
    labels: departmentWiseData.map((d) => d.departmentName),
    datasets: [
      {
        label: "Courses",
        data: departmentWiseData.map((d) => d.moduleCount),
        backgroundColor: ["#FF9F40", "#4CAF50", "#FF6384", "#36A2EB", "#FFCE56", "#E7E9ED"],
      },
    ],
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">

      {/* Top Row: Metrics & Department-wise Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <br/>
          <br/>
          <h2 className="text-xl font-semibold">Total Students</h2>
          <br/>
          <br/>
          <p className="text-6xl font-bold text-blue-600">{metrics.totalStudents}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <br/>
          <br/>
          <h2 className="text-xl font-semibold">Total Departments</h2>
          <br/>
          <br/>
          <p className="text-6xl font-bold text-green-600">{metrics.totalDepartments}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center">
          <br/>
          <br/>
          <h2 className="text-xl font-semibold">Total Courses</h2>
          <br/>
          <br/>
          <p className="text-6xl font-bold text-purple-600">{metrics.totalModules}</p>
        </div>
      </div>

        {/* Department-wise Student Distribution Chart */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Department-wise Students</h2>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={studentChartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Department-wise Courses & Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department-wise Course Distribution Chart */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Department-wise Courses</h2>
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Pie data={courseChartData} />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="p-6 bg-white shadow rounded-lg space-y-6">
          {/* Department Search Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Search Department</h2>
            <input
              type="text"
              placeholder="Enter department name"
              className="border p-2 rounded w-full"
              value={departmentSearch}
              onChange={(e) => setDepartmentSearch(e.target.value)}
            />
            <button
              onClick={handleDepartmentSearch}
              className="bg-blue-500 text-white p-2 rounded w-full mt-2 hover:bg-blue-600 transition"
            >
              Search
            </button>
            {departmentData && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                <p><strong>Department:</strong> {departmentData.department}</p>
                <p><strong>Total Students:</strong> {departmentData.studentCount}</p>
                <p><strong>Total Courses:</strong> {departmentData.courseCount}</p>
              </div>
            )}
          </div>

          {/* Module Search Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Search Course</h2>
            <input
              type="text"
              placeholder="Enter course name"
              className="border p-2 rounded w-full"
              value={moduleSearch}
              onChange={(e) => setModuleSearch(e.target.value)}
            />
            <button
              onClick={handleModuleSearch}
              className="bg-blue-500 text-white p-2 rounded w-full mt-2 hover:bg-blue-600 transition"
            >
              Search
            </button>
            {moduleData && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                <p><strong>Course:</strong> {moduleData.module}</p>
                <p><strong>Total Students:</strong> {moduleData.studentCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
