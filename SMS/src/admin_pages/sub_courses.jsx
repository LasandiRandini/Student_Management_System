

// import { useState } from 'react';
// import { FaUser, FaUserGraduate } from 'react-icons/fa';

// const mockCourseData = {
//   course: {
//     courseName: "Data Structures 101",
//     students: {
//       Beginner: 120,
//       Intermediate: 80,
//       Advanced: 45,
//     },
//   },
//   selectedLevel: "Beginner",
// };

// const CourseDetail = () => {
//   const { course, selectedLevel } = mockCourseData;  // Simulate location.state

//   const [content, setContent] = useState(['Introduction to Data Structures', 'Arrays and Linked Lists']);
//   const [staffMembers, setStaffMembers] = useState(['Member 1', 'Member 2']);
//   const [status] = useState('In Progress');

//   const handleContentChange = (index, newValue) => {
//     const updatedContent = [...content];
//     updatedContent[index] = newValue;
//     setContent(updatedContent);
//   };

//   const addContentItem = () => {
//     setContent([...content, '']);
//   };

//   const deleteContentItem = (index) => {
//     const updatedContent = content.filter((_, i) => i !== index);
//     setContent(updatedContent);
//   };

//   const addStaffMember = () => {
//     const newStaff = prompt('Enter new staff member name:');
//     if (newStaff) {
//       setStaffMembers([...staffMembers, newStaff]);
//     }
//   };

//   const deleteStaffMember = (index) => {
//     const updatedStaff = staffMembers.filter((_, i) => i !== index);
//     setStaffMembers(updatedStaff);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-blue-700">
//           {course.courseName} - {selectedLevel}
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
//         {/* Students Enrolled */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-2">No. of Students Enrolled</h2>
//           <p className="text-3xl font-bold text-center">{course.students[selectedLevel]}</p>
//         </div>

//         {/* Course Status */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-2">Status</h2>
//           <div className="flex items-center justify-center mt-4">
//             <span className="px-4 py-2 bg-green-100 text-green-600 rounded-lg">{status}</span>
//           </div>
//         </div>

//         {/* Staff Members */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-2">Staff Members</h2>
//           <ul className="mt-4">
//             {staffMembers.map((member, index) => (
//               <li key={index} className="flex justify-between">
//                 <span>{member}</span>
//                 <button onClick={() => deleteStaffMember(index)} className="text-red-600 hover:text-red-800">
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={addStaffMember}
//             className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
//           >
//             Add Staff Member
//           </button>
//         </div>
//       </div>

//       {/* Course Content */}
//       <div className="mt-6 bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Course Content</h2>
//         <ul>
//           {content.map((item, index) => (
//             <li key={index} className="flex items-center mb-4">
//               <input
//                 type="text"
//                 className="border p-2 rounded-lg w-full"
//                 value={item}
//                 onChange={(e) => handleContentChange(index, e.target.value)}
//               />
//               <button onClick={() => deleteContentItem(index)} className="ml-4 text-red-600 hover:text-red-800">
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//         <button
//           onClick={addContentItem}
//           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//         >
//           Add Content
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;
import { useState } from 'react';
import { FaUser, FaUserGraduate } from 'react-icons/fa';  // Import icons from react-icons

const mockCourseData = {
  course: {
    courseName: "Web Development",
    students: {
    Level_01  : 120,
      Intermediate: 80,
      Advanced: 45,
    },
  },
  selectedLevel: "Level_01",
};

const CourseDetail = () => {
  const { course, selectedLevel } = mockCourseData;

  const [content, setContent] = useState(['Introduction to Data Structures', 'Arrays and Linked Lists']);
  const [staffMembers, setStaffMembers] = useState(['Member 1', 'Member 2']);
  const [status] = useState('In Progress');

  // Determine the student count for the selected level
  const studentCount = course.students[selectedLevel];

  // Icon condition: change icon based on student count
  const studentIcon = studentCount > 100 ? <FaUserGraduate className='mt-8 mr-10 ' size={50} color="green" /> : <FaUser size={50} color="blue" />;

  const handleContentChange = (index, newValue) => {
    const updatedContent = [...content];
    updatedContent[index] = newValue;
    setContent(updatedContent);
  };

  const addContentItem = () => {
    setContent([...content, '']);
  };

  const deleteContentItem = (index) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
  };

  const addStaffMember = () => {
    const newStaff = prompt('Enter new staff member name:');
    if (newStaff) {
      setStaffMembers([...staffMembers, newStaff]);
    }
  };

  const deleteStaffMember = (index) => {
    const updatedStaff = staffMembers.filter((_, i) => i !== index);
    setStaffMembers(updatedStaff);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          {course.courseName} - {selectedLevel}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        {/* Students Enrolled */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">No. of Students Enrolled</h2>
          <div className="flex items-center justify-center">
            {studentIcon} 
            <p className="text-5xl font-bold text-center mt-7 ml-4">{studentCount}</p>
          </div>
        </div>

        {/* Course Status */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Status</h2>
          <div className="flex items-center justify-center mt-4">
            <span className="px-4 py-2 font-bold bg-green-100 text-green-600 rounded-lg">{status}</span>
          </div>
        </div>

        {/* Staff Members */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Staff Members</h2>
          <ul className="mt-4">
            {staffMembers.map((member, index) => (
              <li key={index} className="flex justify-between">
                <span>{member}</span>
                <button onClick={() => deleteStaffMember(index)} className="text-red-600 hover:text-red-800 font-bold">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={addStaffMember}
            className="mt-4 bg-green-500 text-white py-2 px-4 font-bold rounded-lg hover:bg-green-600"
          >
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <ul>
          {content.map((item, index) => (
            <li key={index} className="flex items-center mb-4">
              <input
                type="text"
                className="border p-2 rounded-lg w-full"
                value={item}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
              <button onClick={() => deleteContentItem(index)} className="ml-4 text-red-600 font-bold hover:text-red-800">
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={addContentItem}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600"
        >
          Add Content
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
