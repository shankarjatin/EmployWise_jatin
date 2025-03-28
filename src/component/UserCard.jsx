import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, CardActions, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Card sx={{ 
      width: '100%', 
      height: '100%', // Ensures equal height for all cards
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#111827', // gray-900
      border: '1px solid #1f2937', // gray-800
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    }}>
      <CardContent sx={{ pt: 2, pb: 1, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ 
              width: 32, 
              height: 32, 
              mr: 2,
              border: '2px solid #3b82f6', // blue-600
            }}
          />
          <Typography variant="h6" component="div" noWrap sx={{ color: '#e5e7eb' }}> {/* gray-200 */}
            {user.first_name} {user.last_name}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#9ca3af' }} noWrap> {/* gray-400 */}
            <strong>Email:</strong> {user.email}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 1, borderTop: '1px solid #1f2937' }}> {/* gray-800 */}
        <IconButton 
          onClick={() => onEdit(user.id)} 
          sx={{ 
            color: '#3b82f6', // blue-600
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            } 
          }} 
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
          onClick={() => onDelete(user.id)} 
          sx={{ 
            color: '#ef4444', // red-500
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            } 
          }} 
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;