import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, CardActions, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserCard = ({ user, onEdit, onDelete, sx = {} }) => {
  return (
    <Card sx={{ 
      width: '100%',
      minWidth: '280px',
      maxWidth: '100%',
      height: '180px',
      minHeight: '180px',
      maxHeight: '180px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#111827',
      border: '1px solid #1f2937',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 15px 25px rgba(59, 130, 246, 0.5)',
      },
      ...sx // Apply any additional styling props
    }}>
      <CardContent sx={{ 
        pt: 2, 
        pb: 1, 
        height: 'calc(180px - 48px)',
        maxHeight: 'calc(180px - 48px)',
        flexGrow: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 1.5,
          minHeight: '48px',
        }}>
          <Avatar 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ 
              width: 48, 
              height: 48, 
              mr: 2,
              flexShrink: 0,
              border: '2px solid #3b82f6',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.15)',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                cursor: 'pointer'
              }
            }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            noWrap 
            sx={{ 
              color: '#e5e7eb',
              width: '100%',
              textOverflow: 'ellipsis',
            }}
          >
            {user.first_name} {user.last_name}
          </Typography>
        </Box>
        
        <Box sx={{ 
          mt: 1,
          maxHeight: '60px',
          overflow: 'hidden',
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#9ca3af',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <strong>Email:</strong> {user.email}
          </Typography>
        </Box>
      </CardContent>

      <CardActions 
        sx={{ 
          justifyContent: 'flex-end', 
          p: 1, 
          borderTop: '1px solid #1f2937',
          height: '48px',
          minHeight: '48px',
          maxHeight: '48px',
          flexShrink: 0,
          backgroundColor: 'rgba(31, 41, 55, 0.3)',
        }}
      >
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(user.id);
          }}
          sx={{ 
            color: '#3b82f6',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            } 
          }} 
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(user.id);
          }}
          sx={{ 
            color: '#ef4444',
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