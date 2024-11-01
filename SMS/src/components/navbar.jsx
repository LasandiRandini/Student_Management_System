// import { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   InputBase,
//   Badge,
//   Box,
//   Menu,
//   MenuItem
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import axios from 'axios';

// const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     } else if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   };

//   const handleNotificationsClick = async (event) => {
//     setAnchorEl(event.currentTarget);
//     try {
//       const response = await axios.get('http://localhost:9090/api/inquiries/getinquiries');

//       // Ensure the notification structure includes title, message, studentId, and studentName
//       const fetchedNotifications = response.data.notifications.map((inquiry) => ({
//         title: inquiry.title,
//         message: inquiry.message,
//         studentId: inquiry.studentId,
//         studentName: inquiry.studentName,
//         timestamp: inquiry.timestamp
//       })) || [];

//       setNotifications(fetchedNotifications);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: 1200,
//         marginLeft: isSidebarVisible ? '240px' : '0',
//         width: isSidebarVisible ? `calc(100% - 240px)` : '100%',
//         backgroundColor: '#10447b',
//         color: 'white',
//         boxShadow: 'none',
//       }}
//     >
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
//           <MenuIcon />
//         </IconButton>

//         <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
//           {/* Search Box */}
//           <Box
//             sx={{
//               position: 'relative',
//               marginRight: '16px',
//               display: 'flex',
//               alignItems: 'center',
//               backgroundColor: '#cfe0e0',
//               borderRadius: '10px',
//               padding: '0 1px',
//             }}
//           >
//             <InputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//               sx={{
//                 color: 'inherit',
//                 '& .MuiInputBase-input': {
//                   padding: '8px 8px 8px 0',
//                   paddingLeft: `calc(1em + 32px)`,
//                   transition: 'width 0.3s',
//                   width: '100%',
//                   '@media (min-width: 960px)': {
//                     width: '20ch',
//                   },
//                 },
//               }}
//             />
//             <IconButton type="button" sx={{ p: '10px' }}>
//               <SearchIcon />
//             </IconButton>
//           </Box>

//           {/* Icons Section */}
//           <Box display="flex" alignItems="center" gap={2} ml="auto">
//             <IconButton onClick={handleFullScreen}>
//               <FullscreenIcon fontSize='medium' />
//             </IconButton>
//             <IconButton onClick={handleNotificationsClick}>
//               <Badge badgeContent={notifications.length} color="secondary">
//                 <NotificationsIcon fontSize='medium' />
//               </Badge>
//             </IconButton>
//             <IconButton>
//               <AccountCircle fontSize='medium' />
//             </IconButton>
//           </Box>
//         </Box>
//       </Toolbar>

//       {/* Notifications Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//         PaperProps={{
//           style: {
//             maxHeight: 400,
//             width: '700px',
//           },
//         }}
//       >
//         {notifications.length === 0 ? (
//           <MenuItem>No notifications</MenuItem>
//         ) : (
//           notifications.map((notification, index) => (
//             <MenuItem key={index} onClick={handleCloseMenu}>
//               <strong>{notification.title}</strong>: {notification.message}
//               <br />
//               <small>By {notification.studentName} (ID: {notification.studentId}) at {new Date(notification.timestamp).toLocaleString()}</small>
//             </MenuItem>
//           ))
//         )}
//       </Menu>
//     </AppBar>
//   );
// };

// export default Navbar;

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleNotificationsClick = async (event) => {
    setAnchorEl(event.currentTarget);
    try {
      const response = await axios.get(
        "http://localhost:9090/api/inquiries/getinquiries"
      );

      // Map fetched data to match the notification structure with student_name and student_code
      const fetchedNotifications =
        response.data.notifications.map((inquiry) => ({
          title: inquiry.title || "Notification",
          message: inquiry.message || "No message available",
          studentId: inquiry.studentId || "Unknown ID",

          studentCode: inquiry.student_code || "Unknown Code",
          timestamp: inquiry.timestamp || new Date().toISOString(),
        })) || [];

      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1200,
        marginLeft: isSidebarVisible ? "240px" : "0",
        width: isSidebarVisible ? `calc(100% - 240px)` : "100%",
        backgroundColor: "#10447b",
        color: "white",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          {/* Search Box */}
          <Box
            sx={{
              position: "relative",
              marginRight: "16px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#cfe0e0",
              borderRadius: "10px",
              padding: "0 1px",
            }}
          >
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "inherit",
                "& .MuiInputBase-input": {
                  padding: "8px 8px 8px 0",
                  paddingLeft: `calc(1em + 32px)`,
                  transition: "width 0.3s",
                  width: "100%",
                  "@media (min-width: 960px)": {
                    width: "20ch",
                  },
                },
              }}
            />
            <IconButton type="button" sx={{ p: "10px" }}>
              <SearchIcon />
            </IconButton>
          </Box>

          
          <Box display="flex" alignItems="center" gap={2} ml="auto">
            <IconButton onClick={handleFullScreen}>
              <FullscreenIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={handleNotificationsClick}>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

{/*       
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: "400px",
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <MenuItem
              key={index}
              onClick={handleCloseMenu}
              sx={{ whiteSpace: "normal" }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {notification.title}
              </Typography>
              <Typography variant="body2">{notification.message}</Typography>
              <Typography variant="caption" color="text.secondary">
                From {notification.studentName} (Code:{" "}
                {notification.studentCode}) <br />
                at {new Date(notification.timestamp).toLocaleString()}
              </Typography>
              {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
            </MenuItem>
          ))
        )}
      </Menu> */}

<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
  PaperProps={{
    style: {
      maxHeight: '400px',
      width: '400px',
    },
  }}
>
  {notifications.length === 0 ? (
    <div className="px-4 py-2 text-gray-700">No notifications</div>
  ) : (
    notifications.map((notification, index) => (
      <div
        key={index}
        onClick={handleCloseMenu}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <p className="text-sm font-semibold text-gray-800">
          {notification.title}
        </p>
        <p className="text-sm text-gray-700">{notification.message}</p>
        <p className="text-xs text-gray-500">
          From {notification.studentName} (Code: {notification.studentCode}) <br />
          at {new Date(notification.timestamp).toLocaleString()}
        </p>
        {index < notifications.length - 1 && (
          <div className="my-2 border-t border-gray-200" />
        )}
      </div>
    ))
  )}
</Menu>

    </AppBar>
  );
};

export default Navbar;
