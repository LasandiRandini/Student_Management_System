// import { AppBar, Toolbar, IconButton, InputBase, Badge, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';

// const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
//   const handleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     } else if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
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
//           <Box display="flex" alignItems="center" gap={2} ml="auto">
//             <IconButton onClick={handleFullScreen}>
//               <FullscreenIcon fontSize='medium' />
//             </IconButton>
//             <IconButton>
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon fontSize='medium' />
//               </Badge>
//             </IconButton>
//             <IconButton>
//               <AccountCircle fontSize='medium' />
//             </IconButton>
//           </Box>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

// import { AppBar, Toolbar, IconButton, InputBase, Badge, Box, Menu, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { useState } from 'react';
// import axios from 'axios';

// const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null); // To manage the notifications menu open state

//   const handleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     } else if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   };

//   const handleNotificationsClick = async (event) => {
//     setAnchorEl(event.currentTarget); // Open the notifications menu
//     try {
//       const response = await axios.get('http://localhost:9090/api/inquiries/inquiry/'); // Fetch notifications from the backend
//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null); // Close the notifications menu
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
//       >
//         {notifications.length === 0 ? (
//           <MenuItem>No notifications</MenuItem>
//         ) : (
//           notifications.map((notification, index) => (
//             <MenuItem key={index}>
//               <strong>{notification.title}</strong>: {notification.message} (Submitted by {notification.studentId} at {new Date(notification.timestamp).toLocaleString()})
//             </MenuItem>
//           ))
//         )}
//       </Menu>
//     </AppBar>
//   );
// };

// export default Navbar;

// import { AppBar, Toolbar, IconButton, InputBase, Badge, Box, Menu, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { useState } from 'react';
// import axios from 'axios';

// const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
//   const [notifications, setNotifications] = useState([]); // Notification list
//   const [anchorEl, setAnchorEl] = useState(null); // Manages the notifications menu state

//   // Toggle fullscreen mode
//   const handleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     } else if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   };

//   // Fetch notifications when the notification icon is clicked
//   const handleNotificationsClick = async (event) => {
//     setAnchorEl(event.currentTarget); // Open the notifications menu
//     try {
//       const response = await axios.get('http://localhost:9090/api/inquiries/inquiries'); // Backend API call
//       setNotifications(response.data.notifications);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   // Close the notifications menu
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
//             maxHeight: 300,
//             width: '320px',
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
//               <small>By {notification.studentId} at {new Date(notification.timestamp).toLocaleString()}</small>
//             </MenuItem>
//           ))
//         )}
//       </Menu>
//     </AppBar>
//   );
// };

// export default Navbar;


import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  const [notifications, setNotifications] = useState([]); // Initialize notifications
  const [anchorEl, setAnchorEl] = useState(null); // Manages the notifications menu state

  // Toggle fullscreen mode
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Fetch notifications when the notification icon is clicked
  const handleNotificationsClick = async (event) => {
    setAnchorEl(event.currentTarget); // Open the notifications menu
    try {
      const response = await axios.get('http://localhost:9090/api/inquiries/inquiries'); // Backend API call
      
      // Safely handle notifications
      const fetchedNotifications = response.data.notifications || [];
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Close the notifications menu
  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the notifications menu
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1200,
        marginLeft: isSidebarVisible ? '240px' : '0',
        width: isSidebarVisible ? `calc(100% - 240px)` : '100%',
        backgroundColor: '#10447b',
        color: 'white',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          {/* Search Box */}
          <Box
            sx={{
              position: 'relative',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#cfe0e0',
              borderRadius: '10px',
              padding: '0 1px',
            }}
          >
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px 0',
                  paddingLeft: `calc(1em + 32px)`,
                  transition: 'width 0.3s',
                  width: '100%',
                  '@media (min-width: 960px)': {
                    width: '20ch',
                  },
                },
              }}
            />
            <IconButton type="button" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Icons Section */}
          <Box display="flex" alignItems="center" gap={2} ml="auto">
            <IconButton onClick={handleFullScreen}>
              <FullscreenIcon fontSize='medium' />
            </IconButton>
            <IconButton onClick={handleNotificationsClick}>
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon fontSize='medium' />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle fontSize='medium' />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: '320px',
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem>No notifications</MenuItem>
        ) : (
          notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleCloseMenu}>
              <strong>{notification.title}</strong>: {notification.message} 
              <br />
              <small>By {notification.studentId} at {new Date(notification.timestamp).toLocaleString()}</small>
            </MenuItem>
          ))
        )}
      </Menu>
    </AppBar>
  );
};

export default Navbar;
