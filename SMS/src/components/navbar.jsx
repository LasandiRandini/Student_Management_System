
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Box,
  Menu,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import ChatComponent from "../components/chat";

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [recipientId, setRecipientId] = useState(null);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin") || "{}");
    if (storedAdmin && storedAdmin._id) {
      setAdmin(storedAdmin);
    }
  }, []);

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
      const response = await axios.get("http://localhost:9090/api/inquiries/getinquiries");
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

  const toggleChatDrawer = (studentId) => {
    setRecipientId(studentId);
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
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
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
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
              <IconButton onClick={() => toggleChatDrawer("student_id_placeholder")}>
                <Badge color="secondary">
                  <ChatIcon fontSize="medium" />
                </Badge>
              </IconButton>
              <IconButton>
                <AccountCircle fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>

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
                onClick={() => {
                  handleCloseMenu();
                  toggleChatDrawer(notification.studentId);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-sm font-semibold text-gray-800">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  From Student (Code: {notification.studentCode}) <br />
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

      <Drawer anchor="right" open={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <Box sx={{ width: 400, padding: 2 }}>
          {admin._id && recipientId ? (
           
            <ChatComponent userId={admin._id} recipientId={recipientId} role="admin" />

          ) : (
            <p>Select a conversation to start chatting</p>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
