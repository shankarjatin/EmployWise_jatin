import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, IconButton, Tooltip, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import UserTable from '../component/UserTable';
import UserTableCard from '../component/UserTableCard';
import { AuthContext } from '../context/AuthContext';
// Import your video directly from assets
import backgroundVideo from '../assets/earth.mp4';
import Footer from '../component/Footer';

// Create a dark theme similar to the Tailwind styling
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // blue-600
    },
    error: {
      main: '#ef4444', // red-500
    },
    background: {
      paper: '#111827', // gray-900
      default: '#030712', // gray-950
    },
    text: {
      primary: '#e5e7eb', // gray-200
      secondary: '#9ca3af', // gray-400
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827', // gray-900
          borderRadius: '0.5rem',
          border: '1px solid #1f2937', // gray-800
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
});

const HomePage = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle video load event
  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
      };
      
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
      
      // Clean up event listener on unmount
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadeddata', handleLoadedData);
        }
      };
    }
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Redirect to login page
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* Background Video Container */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundColor: '#030712', // Keep current background until video loads
          overflow: 'hidden',
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translateX(-50%) translateY(-50%)',
            opacity: videoLoaded ? 0.4 : 0, // Show video only when loaded
            transition: 'opacity 1s ease-in-out',
            objectFit: 'cover',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(3, 7, 18, 0.7)', // Semi-transparent dark overlay
            zIndex: 1,
          }}
        />
      </Box>
      
      {/* Main Content */}
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 2,  // Ensure content is above the background
        padding: { xs: 2, sm: 3, md: 4 },
      }}>
        <Box 
          sx={{ 
            maxWidth: 1200, 
            margin: 'auto',
            mb: 4
          }}
        >
          <Paper sx={{ 
            padding: 3, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(17, 24, 39, 0.85)', // Semi-transparent paper
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#e5e7eb', // gray-200
                }}
              >
                Users
              </Typography>
              
              {/* Logout Button */}
              <Tooltip title="Logout">
                <IconButton 
                  onClick={handleLogout}
                  sx={{
                    ml: 2,
                    color: '#ef4444', // red-500
                    border: '1px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(239, 68, 68, 0.1)', // red with opacity
                      border: '1px solid #ef4444', // red-500
                    }
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Table View">
                <IconButton 
                  onClick={() => setViewMode('table')} 
                  color={viewMode === 'table' ? 'primary' : 'default'}
                  sx={{
                    backgroundColor: viewMode === 'table' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    border: viewMode === 'table' ? '1px solid #3b82f6' : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: viewMode === 'table' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    }
                  }}
                >
                  <TableViewIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Card View">
                <IconButton 
                  onClick={() => setViewMode('card')} 
                  color={viewMode === 'card' ? 'primary' : 'default'}
                  sx={{
                    backgroundColor: viewMode === 'card' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    border: viewMode === 'card' ? '1px solid #3b82f6' : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: viewMode === 'card' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    }
                  }}
                >
                  <ViewModuleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
          
          {/* Conditionally render the appropriate view */}
          {viewMode === 'table' ? <UserTable /> : <UserTableCard />}
        </Box>
      </Box>
       <Footer />
    </ThemeProvider>
  );
};

export default HomePage;