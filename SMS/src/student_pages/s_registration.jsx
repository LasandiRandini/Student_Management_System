import { useState, useEffect } from 'react';
import logo from '../assets/SLT_logo_w.png';  
import image2 from '../assets/register.png'; 
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {
    const [formData, setFormData] = useState({
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

    const [error, setError] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const [departments, setDepartments] = useState([]); 
  
    const navigate = useNavigate(); 
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validate = () => {
      const errors = {};

      if (!formData.first_name) errors.first_name = "First name is required";
      if (!formData.last_name) errors.last_name = "Last name is required";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        errors.email = "Email address is required";
      } else if (!emailPattern.test(formData.email)) {
        errors.email = "Invalid email address";
      }
  
      const contactNoPattern = /^[0-9]{10}$/;
      if (!formData.contact_no) {
        errors.contact_no = "Contact No is required";
      } else if (!contactNoPattern.test(formData.contact_no)) {
        errors.contact_no = "Contact No must be 10 digits";
      }

      if (!formData.username) {
        errors.username = "Username is required";
      } else if (formData.username.length < 5) {
        errors.username = "Username must be at least 5 characters long";
      }

      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }

      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match!";
      }

      return errors;
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      try {
        const response = await axios.post('http://localhost:9090/api/students/sregister', {
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
        Swal.fire({
          title: 'Registration Successful!',
          text: 'You will receive an email after verifying your details.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

     
           navigate('/slogin'); 

      } catch (err) {
        
        const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
        setError(errorMessage);
        setSuccessMessage('');
      }
    };

   
    useEffect(() => {
      const fetchDepartments = async () => {
        try {
          const response = await axios.get('http://localhost:9090/api/departments/getdepartmentnames');
          setDepartments(response.data);
        } catch (error) {
          console.error("Failed to fetch departments:", error);
        }
      };

      fetchDepartments();
    }, []);

    return (
      <div className="flex h-screen flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 flex justify-center items-center bg-[rgb(245,248,248)] p-3">
          <div className='bg-whit e border shadow-md rounded-lg mt-18 w-full max-w-md '>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center">Register</h2>
              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>} 
              <form onSubmit={handleSubmit}>
                <div className="mb-1 mt-3">
                  <label className="block text-gray-700 mb-1">First Name</label>
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
                  <label className="block text-gray-700 mb-1">Last Name</label>
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
                  <label className="block text-gray-700 mb-1">Birth Day</label>
                  <input
                    type="date" 
                    name="birth_day"
                    value={formData.birth_day}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-1">Contact Number</label>
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
                  <label className="block text-gray-700 mb-1">Email</label>
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
                  <label className="block text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select a Department</option>
                    {/* {departments.map((dept) => (
                      <option key={dept._id} value={dept.name}>{dept.name}</option>
                    ))} */}
                    <option value="IT">IT</option>
                    <option value="SE">SE</option>
                    <option value="CS">CS</option>
                    <option value="DS">DS</option>
                  </select>
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-1">Level</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select a Level</option>
                    {[1, 2, 3, 4].map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-1">
                  <label className="block text-gray-700 mb-1">Username</label>
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
                  <label className="block text-gray-700 mb-1">Password</label>
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
                  <label className="block text-gray-700 mb-1">Confirm Password</label>
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
                  className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700 mt-2"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
       
       
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${image2})` }} 
        >
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-70">
            <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white p-8">
             
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
