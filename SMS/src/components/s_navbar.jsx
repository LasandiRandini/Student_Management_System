// import { FiMenu, FiUser } from "react-icons/fi";
// import SLT from "../assets/SLT_logo_b.png";

// const S_Navbar = () => {
//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="flex  py-4">
//         <div className="max-w-1xl mx-auto px-5">
//           <div
//             className="hidden md:block   bg-cover  "
//             style={{ backgroundImage: `url(${SLT})` }}
//           >
//             {/* Nav Links */}
//             <div className="hidden md:flex space-x-6">
//               <a href="#" className="text-gray-700 hover:text-blue-500">
//                 Dashboard
//               </a>
//               <a href="#" className="text-gray-700 hover:text-blue-500">
//                 My Courses
//               </a>
//             </div>

//             {/* User Profile */}
//             <div className="flex items-center space-x-3">
//               <FiUser className="text-2xl text-gray-600" />
//               <span className="text-gray-700">John Fernando</span>
//               <FiMenu className="text-2xl md:hidden" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default S_Navbar;

import { FiMenu, FiUser } from "react-icons/fi";
import SLT from "../assets/SLT_logo_b.png";

const S_Navbar = () => {
  return (
    <nav className="bg-blue-100 shadow-lg">
      <div className="max-w-ful mx-auto px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <div className="flex-shrink-0 ">
            <img src={SLT} alt="SLT Logo" className="w-34 h-12" />
          </div>

          {/* Nav Links - Center */}
          <div className="hidden md:flex space-x-8 text-center">
            <a href="/s_dashboard" className="text-gray-700 hover:text-blue-500  font-bold">
              Dashboard
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 font-bold">
              My Courses
            </a>
          </div>

          {/* User Profile Section - Right */}
          <div className="flex items-center space-x-4">
            <FiUser className="text-3xl  text-gray-600" />
            <span className="text-gray-700 font-bold">John Fernando</span>
            <FiMenu className="text-2xl md:hidden" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default S_Navbar;
