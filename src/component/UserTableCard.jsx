import React, { useEffect, useState, useContext } from 'react';
import { Grid, CircularProgress, Box, Snackbar, TablePagination, ThemeProvider, createTheme, Container } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import UserCard from './UserCard';
import { IconButton, SnackbarContent } from '@mui/material';

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
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827', // gray-900
          border: '1px solid #1f2937', // gray-800
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #3b82f6', // blue-600
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#9ca3af', // gray-400
        },
        select: {
          backgroundColor: '#1f2937', // gray-800
        },
      },
    },
  },
});

const UserTableCard = () => {
  const { token } = useContext(AuthContext); // Get token from context
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage] = useState(6);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchUsers = async (pageNumber) => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${pageNumber + 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page, token]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleEdit = (userId) => {
    setSnackbarMessage(`Editing user with ID: ${userId}`);
    setSnackbarOpen(true);
  };

  const handleDelete = (userId) => {
    setSnackbarMessage(`Deleted user with ID: ${userId}`);
    setSnackbarOpen(true);

    // Simulate delete request (you can implement actual API call here)
    setUsers(users.filter(user => user.id !== userId));
  };

  // Make sure we always have exactly 3 columns for large screens by calculating width
  const getGridItemProps = () => {
    return {
      xs: 12,          // Full width on mobile (1 card)
      sm: 6,           // Half width on tablets (2 cards)
      md: 4,           // One-third width on desktop (3 cards)
    };
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#030712', // gray-950
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pt: 4, 
        pb: 4,
      }}>
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ 
            width: '100%',
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#111827', // gray-900
            borderRadius: '0.5rem',
            border: '1px solid #1f2937', // gray-800
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress sx={{ color: '#3b82f6' }} /> {/* blue-600 */}
              </Box>
            ) : (
              <Grid 
                container 
                spacing={3}
                sx={{
                  width: '100%',
                  margin: 0 // Remove default margin from Grid container
                }}
              >
                {users.map((user) => (
                  <Grid 
                    item 
                    {...getGridItemProps()}
                    key={user.id}
                  >
                    <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
                  </Grid>
                ))}
              </Grid>
            )}

            <Box mt={3} display="flex" justifyContent="center">
              <TablePagination
                component="div"
                count={totalPages * rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[6]}
                sx={{
                  color: '#9ca3af', // gray-400
                  '.MuiTablePagination-selectIcon': {
                    color: '#9ca3af', // gray-400
                  },
                }}
              />
            </Box>
          </Box>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <SnackbarContent
              sx={{
                backgroundColor: '#1f2937', // gray-800
                color: '#e5e7eb', // gray-200
                border: '1px solid #374151', // gray-700
              }}
              message={snackbarMessage}
              action={
                <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
                  &times;
                </IconButton>
              }
            />
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserTableCard;