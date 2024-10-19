

// import { useState } from 'react';
// import logo from '../assets/SLT_logo_w.png';  
// import image2 from '../assets/image2.png'; 

// const Registration = () => {
//     const [formData, setFormData] = useState({
//       firstName: '',
//       lastName: '',
//       email: '',
//       contactNumber: '',
//       username: '',
//       password: '',
//       confirmPassword: '',
//     });
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('Registration submitted:', formData);
//     };
  
//     return (
//       <div className="flex h-screen flex-col md:flex-row">

//         {/* Left Section - Form */}
//         <div className="w-full md:w-1/2 flex justify-center items-center bg-[rgb(245,248,248)] p-4">
//           <div className='bg-white border shadow-md rounded-lg mt-10 mb-10 w-full max-w-md'>
//             <div className="p-5">
//               <h2 className="text-3xl font-bold text-center ">Register</h2>
    
//               <form onSubmit={handleSubmit}>
                
//                 <div className="mb-1 mt-4">
//                   <label className="block text-gray-700 mb-2">Admin First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="Enter your First Name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border  border-gray-300 rounded-lg"
//                   />
//                 </div>
    
//                 <div className="mb-1">
//                   <label className="block text-gray-700 mb-2">Admin Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Enter your Last Name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border  border-gray-300 rounded-lg"
//                   />
//                 </div>
    
//                 <div className="mb-1">
//                   <label className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border   border-gray-300 rounded-lg"
//                   />
//                 </div>
    
//                 <div className="mb-1">
//                   <label className="block text-gray-700 mb-2">Contact Number</label>
//                   <input
//                     type="text"
//                     name="contactNumber"
//                     placeholder="Enter your Contact Number"
//                     value={formData.contactNumber}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border  border-gray-300 rounded-lg"
//                   />
//                 </div>
    
//                 <div className="mb-1">
//                   <label className="block text-gray-700 mb-2">Username</label>
//                   <input
//                     type="text"
//                     name="username"
//                     placeholder="Enter your Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border   border-gray-300 rounded-lg"
//                   />
//                 </div>
    
//                 <div className="mb-1">
//                   <label className="block text-gray-700 mb-2">Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Enter your Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border   border-gray-300 rounded-lg"
//                   />
//                 </div>
    
//                 <div className="mb-1">
//                   <label className="block text-gray-700 mb-2">Confirm Password</label>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm your Password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border   border-gray-300 rounded-lg"
//                   />
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700 mt-4"
//                 >
//                   Register
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
       
//         {/* Right Section - Background with Image */}
//         <div
//           className="hidden md:flex w-1/2 bg-cover bg-center relative"
//           style={{ backgroundImage: `url(${image2})` }} 
//         >
//           {/* Gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-70">
//             <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white p-8">
//               {/* Logo */}
//               <img src={logo} alt="SLT Mobitel" className="mb-8 w-64" />  
//               <h1 className="text-4xl font-bold mb-4">Welcome to SLT Mobitel</h1>
//               <p className="text-lg mb-6">The Connection</p>
//               <button 
//                 className="border border-white px-6 py-2 rounded-full"
//                 onClick={() => window.location.href = '/login'}  
//               >
//                 Sign in
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     );
// };
  
// export default Registration;

import { useState } from 'react';
import logo from '../assets/SLT_logo_w.png';  
import image2 from '../assets/image2.png'; 
import axios from 'axios'; // Import axios to handle API requests

const Registration = () => {
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      birth_day: '',
      contact_no: '',
      email: '',
      department: '', // Add department field
      level: '', // Add level field
      username: '',
      password: '',
      confirmPassword: '',
    });

    const [error, setError] = useState(''); // State for error messages
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try {
        // Make API call to register student
        const response = await axios.post('http://localhost:8080/api/students/sregister', {
          first_name: formData.first_name,
          last_name: formData.last_name,
          birth_day: formData.birth_day,
          contact_no: formData.contact_no,
          email: formData.email,
          department: formData.department,
          level: formData.level,
          username: formData.username,
          password: formData.password,
        });

        setSuccessMessage(response.data.message);
        setError('');
        // Clear form data if needed
        setFormData({
          first_name: '',
          last_name: '',
          birth_day: '',
          contact_no: '',
          email: '',
          department: '',
          level: '',
          username: '',
          password: '',
          confirmPassword: '',
        });

      } catch (err) {
        setError(err.response?.data || "Registration failed. Please try again.");
        setSuccessMessage('');
      }
    };

    return (
      <div className="flex h-screen flex-col md:flex-row">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-[rgb(245,248,248)] p-4">
          <div className='bg-white border shadow-md rounded-lg mt-10 mb-10 w-full max-w-md'>
            <div className="p-5">
              <h2 className="text-3xl font-bold text-center">Register</h2>
              {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}
              <form onSubmit={handleSubmit}>
                <div className="mb-1 mt-4">
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Enter your First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Enter your Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Birth Day</label>
                  <input
                    type="date" // Updated to date input
                    name="birth_day"
                    value={formData.birth_day}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Contact Number</label>
                  <input
                    type="text"
                    name="contact_no"
                    placeholder="Enter your Contact Number"
                    value={formData.contact_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Enter your Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Level</label>
                  <input
                    type="text"
                    name="level"
                    placeholder="Enter your Level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700 mt-4"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
       
        {/* Right Section - Background with Image */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${image2})` }} 
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-70">
            <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white p-8">
              {/* Logo */}
              <img src={logo} alt="SLT Mobitel" className="mb-8 w-64" />  
              <h1 className="text-4xl font-bold mb-4">Welcome to SLT Mobitel</h1>
              <p className="text-lg mb-6">The Connection</p>
              <button 
                className="border border-white px-6 py-2 rounded-full"
                onClick={() => window.location.href = '/slogin'}  
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
  
export default Registration;
