import { AppBar, Toolbar, IconButton, InputBase, Badge, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ toggleSidebar, isSidebarVisible }) => {
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
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
          <Box display="flex" alignItems="center" gap={2} ml="auto">
            <IconButton onClick={handleFullScreen}>
              <FullscreenIcon fontSize='medium' />
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon fontSize='medium' />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle fontSize='medium' />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

