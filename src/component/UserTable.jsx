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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

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
  const { token } = useContext(AuthContext); // Get token from context
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage] = useState(6);

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
    console.log('Edit user:', userId);
    // Add your edit logic here
  };

  const handleDelete = (userId) => {
    console.log('Delete user:', userId);
    // Add your delete logic here
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex justify-center bg-gray-950 p-4">
        <TableContainer 
          component={Paper} 
          sx={{ 
            maxWidth: 900,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            borderRadius: '0.5rem',
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
                      sx={{ width: 36, height: 36, border: '2px solid #3b82f6' }}
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
                        onClick={() => handleDelete(user.id)}
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
      </div>
    </ThemeProvider>
  );
};

export default UserTable;