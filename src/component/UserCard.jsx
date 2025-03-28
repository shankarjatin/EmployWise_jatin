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
      boxShadow: 2,
      borderRadius: 2,
    }}>
      <CardContent sx={{ pt: 2, pb: 1, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ width: 32, height: 32, mr: 2 }}
          />
          <Typography variant="h6" component="div" noWrap>
            {user.first_name} {user.last_name}
          </Typography>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" noWrap>
            <strong>Email:</strong> {user.email}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
        <IconButton onClick={() => onEdit(user.id)} color="primary" size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => onDelete(user.id)} color="error" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
