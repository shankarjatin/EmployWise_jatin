import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Email:</strong> {user.email}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton onClick={() => onEdit(user.id)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(user.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;
