
// import { useState } from 'react';
// import logo from '../assets/SLT_logo_w.png';
// import image1 from '../assets/image1.png';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login submitted:', { email, password });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left Section - Hidden on small screens */}
//       <div
//         className="hidden md:block w-1/2 bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${image1})` }} // Reference imported image1
//       >
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-80"></div>

//         {/* Content inside the overlay */}
//         <div className="relative flex flex-col justify-center items-center h-full text-white p-8">
//           {/* Logo */}
//           <img src={logo} alt="SLT Mobitel" className="mb-8 w-64" />
//           <h1 className="text-4xl font-bold mb-4">Welcome to SLT Mobitel</h1>
//           <button
//             className="border border-white px-6 py-2 rounded-full"
//             onClick={() => window.location.href = '/'}  // Navigate to registration
//           >
//             Sign up
//           </button>
//         </div>
//       </div>

//       {/* Right Section - Full width on small screens, half width on medium and larger screens */}
//       <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
//         <div className="bg-white p-10 rounded-lg shadow-md w-full md:w-96">
//           <h2 className="text-3xl font-bold text-center mb-6">Sign in</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter your User Name"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div className="flex justify-between items-center mb-6">
//               <label className="inline-flex items-center">
//                 <input type="checkbox" className="form-checkbox" />
//                 <span className="ml-2 text-gray-700">Remember me</span>
//               </label>
//               <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
//               onClick={() => window.location.href = '/dashboard'}
//             >
//               Login
//             </button>
//             <div className="text-center mt-4">
//               <p className="text-gray-500">or continue with</p>
//               <div className="flex justify-center space-x-4 mt-4">
//                 <button>
//                   <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" className="w-8 h-8" />
//                 </button>
//                 <button>
//                   <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Google Chrome" className="w-8 h-8 mr-2" />
//                 </button>
//               </div>
//             </div>
//           </form>
//           {/* Add navigation link to the registration page */}
//           <div className="text-center mt-6">
//             <p className="text-gray-500">
//               Don’t have an account? <a href="/" className="text-blue-500">Register</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../assets/SLT_logo_w.png';
import image1 from '../assets/image1.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:9090/api/admins/alogin', { username: email, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.access_token); 
        localStorage.setItem('admin', JSON.stringify(response.data)); 
        
        navigate('/dashboard');
      })
      .catch((error) => {
        let errorMessage = "Something went wrong. Please try again."; 
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || "Invalid login credentials";
        }


        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      });
  };

  return (
    <div className="flex h-screen">
     
      <div
        className="hidden md:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image1})` }} 
      >
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F407B] to-[#24AF77] opacity-80"></div>

        
        <div className="relative flex flex-col justify-center items-center h-full text-white p-8">
          
          <img src={logo} alt="SLT Mobitel" className="mb-8 w-64" />
          <h1 className="text-4xl font-bold mb-4">Welcome to SLT Mobitel</h1>
          <button
            className="border border-white px-6 py-2 rounded-full"
            onClick={() => window.location.href = '/dashboard'}  
          >
            Sign up
          </button>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md w-full md:w-96">
          <h2 className="text-3xl font-bold text-center mb-6">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your User Name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <p className="text-gray-500">or continue with</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button>
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" className="w-8 h-8" />
                </button>
                <button>
                  <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Google Chrome" className="w-8 h-8 mr-2" />
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-500">
              Don’t have an account? <a href="/" className="text-blue-500">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
