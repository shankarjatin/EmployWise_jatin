import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TablePagination,
  IconButton,
  Tooltip,
  createTheme,
  ThemeProvider,
  Snackbar,
  SnackbarContent,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
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
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontWeight: 600,
            backgroundColor: '#1f2937', // gray-800
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(17, 24, 39, 0.8)', // gray-900 with opacity
          },
          '&:hover': {
            backgroundColor: '#1f2937', // gray-800
            transition: 'background-color 0.2s',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #1f2937', // gray-800
          padding: '12px 16px',
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
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #3b82f6', // blue-600
        },
      },
    },
  },
});

const UserTable = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
    
    // Show success message
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

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#030712', // gray-950
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
       
     
      }}>
        <div className="w-full ">
          <TableContainer 
            component={Paper} 
            sx={{ 
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            //   overflow: 'hidden',
            //   borderRadius: '0.5rem',
              border: '1px solid #1f2937', // gray-800
              
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Avatar</strong></TableCell>
                  <TableCell><strong>First Name</strong></TableCell>
                  <TableCell><strong>Last Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                    <Avatar 
  src={user.avatar} 
  alt={user.first_name}
  sx={{ 
    width: 48, 
    height: 48, 
    border: '2px solid #3b82f6',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.15)',
      boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
      cursor: 'pointer'
    }
  }}
/>
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEdit(user.id)}
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteClick(user.id)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              count={totalPages * rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[6]}
              sx={{
                color: '#9ca3af', // gray-400
                borderTop: '1px solid #1f2937', // gray-800
                '.MuiTablePagination-selectIcon': {
                  color: '#9ca3af', // gray-400
                },
              }}
            />
          </TableContainer>
        
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

          {/* Snackbar for notifications */}
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
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default UserTable;