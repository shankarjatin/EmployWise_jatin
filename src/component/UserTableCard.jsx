import React, { useEffect, useState, useContext } from 'react';
import { Grid, CircularProgress, Box, Snackbar, TablePagination } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import UserCard from './UserCard';
import { IconButton, SnackbarContent } from '@mui/material';

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

  return (
    <Box sx={{ maxWidth: 1100, margin: 'auto', padding: { xs: 2, sm: 3, md: 4 } }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} alignItems="stretch">
          {users.map((user) => (
            <Grid 
              item 
              xs={12}          // 1 card per row on mobile
              sm={6}           // 2 cards per row on tablets
              md={4}           // Force exactly 3 cards per row on desktop
              lg={4}           // Maintain 3 cards on larger screens too
              key={user.id}
              sx={{ display: 'flex' }}
            >
              <Box sx={{ width: '100%' }}>
                <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
              </Box>
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
        />
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          action={
            <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
              &times;
            </IconButton>
          }
        />
      </Snackbar>
    </Box>
  );
};

export default UserTableCard;
