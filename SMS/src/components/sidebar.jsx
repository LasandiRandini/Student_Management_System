
import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';  
import SLT from '../assets/SLT_logo_w.png';
import SLT2 from '../assets/SLT_back.png';
import Dashboard from '../assets/dashboards.svg';
import Customer from '../assets/person.svg';
import Incident from '../assets/megaphone.svg';
import Report from '../assets/file.svg';
import Setting from '../assets/information.svg';

const drawerWidth = 240;

const SideBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();  

  // Sidebar items
  const items = [
    { text: 'Dashboard', src: Dashboard, path: '/dashboard' },
    { text: 'Course Management', src: Incident, path: '/departments' },
    { text: 'Student Management', src: Customer, path: '/student_mng' },
    { text: 'Reports', src: Report, path: '/reports' },
    { text: 'Settings', src: Setting, path: '/settings' },
  ];

  // Get active route on page load
  const getSelectedIndex = () => {
    return items.findIndex(item => item.path === location.pathname);
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());

  useEffect(() => {
    // When the location changes, update the selectedIndex
    setSelectedIndex(getSelectedIndex());
  }, [location.pathname]);

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
    toggleSidebar();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, #0F407B, #24AF77)', // Gradient background
          color: 'white', // Ensure text color is white
          overflow: 'hidden', // Hide the scrollbar
        },
      }}
    >
      {/* Logo Section */}
      <Box
        component="img"
        src={SLT}
        alt="SLT Mobitel Logo"
        sx={{
          width: '250px',
          margin: '10px auto',
          display: 'block',
        }}
      />

      {/* Sidebar Items */}
      <List>
        {items.map((item, index) => (
            <ListItem
            key={item.text}
            button
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, item.path)}
            sx={{
              color: selectedIndex === index ? 'white' : '#CCC',
              backgroundColor: selectedIndex === index ? '#485DFF' : 'transparent',
              padding: '10px 20px', // Adjust padding here for left and right spaces
              borderRadius: '10px', // Slightly reduce the border-radius
              margin: '4px auto', // Add auto to center it
              maxWidth: '200px', // Restrict the width of the highlighted item
              '&:hover': {
                backgroundColor: '#485DFF',
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedIndex === index ? 'white' : '#CCC' }}>
              <img
                src={item.src}
                alt={`${item.text} icon`}
                style={{
                  width: '24px',
                  height: '24px',
                  filter: selectedIndex === index ? 'invert(1)' : 'none',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography sx={{ fontWeight: selectedIndex === index ? 'bold' : 'normal' }}>{item.text}</Typography>}
            />
          </ListItem>
                  
        //   <ListItem
        //     key={item.text}
        //     button
        //     selected={selectedIndex === index}
        //     onClick={() => handleListItemClick(index, item.path)}
        //     sx={{
        //       color: selectedIndex === index ? 'white' : '#CCC',
        //       backgroundColor: selectedIndex === index ? '#485DFF' : 'transparent',
        //       padding: '10px 5px',
        //       borderRadius: '15px',
        //       margin: '4px ',
        //       '&:hover': {
        //         backgroundColor: '#485DFF',
        //       },
        //     }}
        //   >
        //     <ListItemIcon sx={{ color: selectedIndex === index ? 'white' : '#CCC' }}>
        //       <img
        //         src={item.src}
        //         alt={`${item.text} icon`}
        //         style={{
        //           width: '24px',
        //           height: '24px',
        //           filter: selectedIndex === index ? 'invert(1)' : 'none',
        //         }}
        //       />
        //     </ListItemIcon>
        //     <ListItemText
        //       primary={<Typography sx={{ fontWeight: selectedIndex === index ? 'bold' : 'normal' }}>{item.text}</Typography>}
        //     />
        //   </ListItem>

        ))}
      </List>

      {/* Logo Section */}
      <Box
        component="img"
        src={SLT2}
        alt="SLT Mobitel Logo"
        sx={{
          width: '1500px',
          margin: '45px auto',
          display: 'block',
        }}
      />
    </Drawer>
  );
};

export default SideBar;

// import { useState, useEffect } from 'react';
// import {
//   Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Box, Typography,
// } from '@mui/material';
// import { ExpandLess, ExpandMore } from '@mui/icons-material'; // For showing expand/collapse arrows
// import { useNavigate, useLocation } from 'react-router-dom';
// import SLT from '../assets/SLT_logo_w.png';
// import SLT2 from '../assets/SLT_back.png';
// import Dashboard from '../assets/dashboards.svg';
// import Customer from '../assets/person.svg';
// import Incident from '../assets/megaphone.svg';
// import Report from '../assets/file.svg';
// import Setting from '../assets/information.svg';

// const drawerWidth = 240;

// const SideBar = ({ toggleSidebar }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Sidebar items
//   const items = [
//     { text: 'Dashboard', src: Dashboard, path: '/dashboard' },
//     { text: 'Student Management', src: Customer, path: '/student_mng' },
//     { text: 'Reports', src: Report, path: '/reports' },
//     { text: 'Settings', src: Setting, path: '/settings' },
//   ];

//   // Departments (Sub-navigation for Course Management)
//   const departments = [
//     { text: 'IT Department', path: '/departments/it' },
//     { text: 'Engineering', path: '/departments/engineering' },
//     { text: 'Mechanical', path: '/departments/mechanical' },
//     { text: 'Business', path: '/departments/business' },
//     { text: 'Arts', path: '/departments/arts' },
//   ];

//   // State to track selected index and expanded sub-menu
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [courseManagementOpen, setCourseManagementOpen] = useState(false);

//   useEffect(() => {
//     // Update selected index based on the current route
//     const selected = items.findIndex(item => item.path === location.pathname);
//     if (selected !== -1) {
//       setSelectedIndex(selected);
//     }
//   }, [location.pathname]);

//   const handleListItemClick = (index, path) => {
//     setSelectedIndex(index);
//     navigate(path);
//     toggleSidebar();
//   };

//   const handleCourseManagementClick = () => {
//     setCourseManagementOpen(!courseManagementOpen);
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           background: 'linear-gradient(to bottom, #0F407B, #24AF77)',
//           color: 'white',
//         },
//       }}
//     >
//       {/* Logo Section */}
//       <Box
//         component="img"
//         src={SLT}
//         alt="SLT Mobitel Logo"
//         sx={{
//           width: '250px',
//           margin: '10px auto',
//           display: 'block',
//         }}
//       />

//       {/* Sidebar Items */}
//       <List>
//         {items.map((item, index) => (
//           <ListItem
//             key={item.text}
//             button
//             selected={selectedIndex === index}
//             onClick={() => handleListItemClick(index, item.path)}
//             sx={{
//               color: selectedIndex === index ? 'white' : '#CCC',
//               backgroundColor: selectedIndex === index ? '#485DFF' : 'transparent',
//               padding: '10px 20px',
//               borderRadius: '10px',
//               margin: '4px auto',
//               maxWidth: '200px',
//               '&:hover': {
//                 backgroundColor: '#485DFF',
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: selectedIndex === index ? 'white' : '#CCC' }}>
//               <img
//                 src={item.src}
//                 alt={`${item.text} icon`}
//                 style={{
//                   width: '24px',
//                   height: '24px',
//                   filter: selectedIndex === index ? 'invert(1)' : 'none',
//                 }}
//               />
//             </ListItemIcon>
//             <ListItemText
//               primary={<Typography sx={{ fontWeight: selectedIndex === index ? 'bold' : 'normal' }}>{item.text}</Typography>}
//             />
//           </ListItem>
//         ))}

//         {/* Course Management with Sub-navigation */}
//         <ListItem button onClick={handleCourseManagementClick}>
//           <ListItemIcon sx={{ color: '#CCC' }}>
//             <img
//               src={Incident}
//               alt="Course Management icon"
//               style={{ width: '24px', height: '24px' }}
//             />
//           </ListItemIcon>
//           <ListItemText primary={<Typography>Course Management</Typography>} />
//           {courseManagementOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={courseManagementOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {departments.map((department, index) => (
//               <ListItem
//                 key={department.text}
//                 button
//                 onClick={() => navigate(department.path)}
//                 sx={{ pl: 4, color: '#CCC', '&:hover': { color: 'white' } }}
//               >
//                 <ListItemText primary={department.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Collapse>
//       </List>

//       {/* Logo Section */}
//       <Box
//         component="img"
//         src={SLT2}
//         alt="SLT Mobitel Logo"
//         sx={{
//           width: '150px',
//           margin: '45px auto',
//           display: 'block',
//         }}
//       />
//     </Drawer>
//   );
// };

// export default SideBar;
