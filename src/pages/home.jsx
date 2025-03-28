import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Paper, Typography, ThemeProvider, createTheme } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import UserTable from '../component/UserTable';
import UserTableCard from '../component/UserTableCard';

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

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: '#030712', // gray-950
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
            mb: 4
          }}>
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
    </ThemeProvider>
  );
};

export default HomePage;