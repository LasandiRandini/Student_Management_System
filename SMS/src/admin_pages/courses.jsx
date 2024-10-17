import  { useState } from 'react';


const departmentCourses = [
  {
    name: 'IT Department',
    courses: [
      {
        courseName: 'Web Development',
        head: 'John Doe',
        students: { Level_01: 50, Level_02: 40,  Level_03: 30, Level_04: 20 },
      },
      {
        courseName: 'Cyber Security',
        head: 'Jane Smith',
        students: { Level_01: 35,  Level_02: 45,  Level_03: 25,  Level_04: 10 },
      },
      {
        courseName: 'Cyber Security',
        head: 'Jane Smith',
        students: { Level_01: 35,  Level_02: 45,  Level_03: 25,  Level_04: 10 },
      },
      {
        courseName: 'Cyber Security',
        head: 'Jane Smith',
        students: { Level_01: 35,  Level_02: 45,  Level_03: 25,  Level_04: 10 },
      },
      {
        courseName: 'Cyber Security',
        head: 'Jane Smith',
        students: { Level_01: 35,  Level_02: 45,  Level_03: 25,  Level_04: 10 },
      },
      {
        courseName: 'Cyber Security',
        head: 'Jane Smith',
        students: { Level_01: 35,  Level_02: 45,  Level_03: 25,  Level_04: 10 },
      },
    ],
  },
  // Add other departments and courses here
];

const CourseCard = ({ course }) => {
  const [selectedLevel, setSelectedLevel] = useState('Beginner');

  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full sm:w-96">
        
      <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
      <p className="text-gray-600">Course Head: <strong>{course.head}</strong></p>

      {/* Level Selection */}
      <div className="mt-4">
        <label className="block mb-2 font-medium">Select Level:</label>
        <select
          className="border p-2 rounded-lg w-full"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {Object.keys(course.students).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Student Count */}
      <div className="mt-4">
        <p className="text-gray-700">
          Students Enrolled in {selectedLevel}: {course.students[selectedLevel]}
        </p>
      </div>

      {/* Visit Course Button */}
      <div className="mt-4">
        <button className="bg-[#10447b] text-white py-2 px-4 rounded-lg hover:bg-blue-600"
         onClick={() => window.location.href = '/subcourse'}  >
          Visit Course
        </button>
      </div>
    </div>
  );
};

const DepartmentCourses = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(departmentCourses[0]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold  space-x-3 bg-[#49B558] text-white p-3 rounded-t-lg rounded-b-lg">
          {selectedDepartment.name} - Courses
        </h1>
        <button className="bg-[#49B558] text-white py-3 px-4    rounded-lg hover:bg-green-400">
          Add Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {selectedDepartment.courses.map((course) => (
          <CourseCard key={course.courseName} course={course} />
        ))}
      </div>
    </div>
  );
};

export default DepartmentCourses;
