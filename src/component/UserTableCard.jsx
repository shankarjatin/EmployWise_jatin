import React, { useEffect, useState, useContext } from 'react';
import { Grid, CircularProgress, Box, Snackbar, TablePagination, ThemeProvider, createTheme, Container } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import UserCard from './UserCard';
import { IconButton, SnackbarContent } from '@mui/material';
import EditUserModal from './EditUserModal';
import DeleteConfirmDialog from './DeleteDialog'; // Import the delete confirmation dialog

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
  
  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
    // Find the user to edit
    const userToEdit = users.find(user => user.id === userId);
    setCurrentUser(userToEdit);
    setEditModalOpen(true);
  };

  const handleUpdateSuccess = (updatedUser) => {
    // Update the user in the state
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    
    setSnackbarMessage(`User ${updatedUser.first_name} updated successfully!`);
    setSnackbarOpen(true);
  };

  const handleDeleteClick = (userId) => {
    // Find the user to delete
    const userToDelete = users.find(user => user.id === userId);
    setUserToDelete(userToDelete);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = (userId) => {
    // Remove the user from the state
    setUsers(users.filter(user => user.id !== userId));
    
    // Show success message
    setSnackbarMessage(`User deleted successfully!`);
    setSnackbarOpen(true);
  };

  // Updated Grid item props with center alignment
  const getGridItemProps = () => {
    return {
      xs: 12,          // Full width on mobile (1 card)
      sm: 6,           // Half width on tablets (2 cards)
      md: 4,           // One-third width on desktop (3 cards)
      sx: {
        display: 'flex',
        justifyContent: 'center', // Center the card horizontally in the grid cell
      }
    };
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
       width: '100%',
       backgroundColor: '#030712', // gray-950
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'flex-start', // Changed from 'center' to 'flex-start' to remove extra space
     
       pb: 4,
      }}>
        <Container maxWidth="lg" disableGutters>
          <Box sx={{ 
            width: '100%',
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#111827', // gray-900
            borderRadius: '0.5rem',
           
            border: '1px solid #1f2937', // gray-800
            boxShadow: '0 20px 25px -5px rgba(28, 17, 17, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress sx={{ color: '#3b82f6' }} /> {/* blue-600 */}
              </Box>
            ) : (
              <Grid 
                container 
                spacing={3}
                justifyContent="center" // Center the grid items horizontally
                sx={{
                  width: '100%',
                  margin: 0, // Remove default margin from Grid container
                  
                }}
              >
                {users.map((user) => (
                  <Grid 
                    item 
                    {...getGridItemProps()}
                    key={user.id}
                  >
                    <UserCard 
                      user={user} 
                      onEdit={handleEdit} 
                      onDelete={handleDeleteClick}
                      sx={{ 
                        width: { xs: '100%', sm: '280px' }, // Fixed width on larger screens
                        maxWidth: '100%',
                      }}
                    />
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
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top-center instead of bottom
  sx={{
    zIndex: 1500, // Higher than the footer's z-index (100)
  }}
>
  <SnackbarContent
    sx={{
      backgroundColor: '#1f2937', // gray-800
      color: '#e5e7eb', // gray-200
      border: '1px solid #374151', // gray-700
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      marginBottom: 2, // Add some margin so it's not flush with the top
    }}
    message={snackbarMessage}
    action={
      <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
        &times;
      </IconButton>
    }
  />
</Snackbar>
          
          {/* Edit modal */}
          <EditUserModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            user={currentUser}
            onSuccess={handleUpdateSuccess}
          />
          
          {/* Delete confirmation dialog */}
          <DeleteConfirmDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            user={userToDelete}
            onSuccess={handleDeleteSuccess}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserTableCard;