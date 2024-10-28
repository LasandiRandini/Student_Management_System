
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

 
  const items = [
    { text: 'Dashboard', src: Dashboard, path: '/dashboard' },
    { text: 'Course Management', src: Incident, path: '/departments' },
    { text: 'Student Management', src: Customer, path: '/student_mng' },
    { text: 'Reports', src: Report, path: '/reports' },
    { text: 'Settings', src: Setting, path: '/settings' },
  ];

 
  const getSelectedIndex = () => {
    return items.findIndex(item => item.path === location.pathname);
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());

  useEffect(() => {
    
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
          background: 'linear-gradient(to bottom, #0F407B, #24AF77)',
          color: 'white',
          overflow: 'hidden', 
        },
      }}
    >
    
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
              padding: '10px 20px',
              borderRadius: '10px', 
              margin: '4px auto', 
              maxWidth: '200px', 
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
                  
    

        ))}
      </List>

      
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

