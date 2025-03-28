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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

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
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: 'auto', marginTop: 4 }}>
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
                <Avatar src={user.avatar} alt={user.first_name} />
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
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(user.id)}
                    size="small"
                  >
                    <DeleteIcon />
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
      />
    </TableContainer>
  );
};

export default UserTable;