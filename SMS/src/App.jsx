import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Dashboardpage from "./admin_pages/dashboard";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import A_Login from "./admin_pages/a_login";
import A_Registration from "./admin_pages/a_registration";
import S_Login from "./student_pages/s_login";
import S_Registration from "./student_pages/s_registration";
import Department from "./admin_pages/departments";
import Course from "./admin_pages/courses";
import SubCourse from "./admin_pages/sub_courses";
import Report from "./admin_pages/reports";
import Student from "./admin_pages/student_mng";
import S_Dashboard from "./student_pages/s_dashboard";
import S_Navbar from "./components/s_navbar";
import S_Courses from "./student_pages/my_courses";

const AdminLayout = () => {
  const navbarHeight = "60px";
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div style={{ height: navbarHeight }}>
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {isSidebarVisible && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Sidebar
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        )}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// const StudentLayout = () => {
//   return (
//     <>
//       <S_Navbar />
//       <Outlet />
//      \
//     </>
//   );
// };
const StudentLayout = () => {
  const navbarHeight = "60px";
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div style={{ height: navbarHeight }}>
        <S_Navbar
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
       
      </div>
      <div >
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/Alogin",
    element: <A_Login />,
  },
  {
    path: "/",
    element: <A_Registration />,
  },
  {
    path: "/Slogin",
    element: <S_Login />,
  },
  {
    path: "/Sregistration",
    element: <S_Registration />,
  },
 
  {
    path: "/",
    element: <StudentLayout />,
    children: [
    { path: "/s_dashboard", element: <S_Dashboard /> },
    {path: "/my_courses", element: <S_Courses /> },
    ]
    ,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/dashboard", element: <Dashboardpage /> },
      { path: "/departments", element: <Department /> },
      // { path: "/course", element: <Course /> },
      { path: "/courses/:departmentId/:level", element: <Course /> },
      { path: "/reports", element: <Report /> },
      { path: "/student_mng", element: <Student /> },
      { path: "/subcourse", element: <SubCourse /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
