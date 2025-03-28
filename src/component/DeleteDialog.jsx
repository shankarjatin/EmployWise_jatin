import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  Avatar,
  CircularProgress
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import axios from 'axios';

const DeleteConfirmDialog = ({ open, onClose, user, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Make DELETE request to remove user
      await axios.delete(`https://reqres.in/api/users/${user.id}`);
      
      setLoading(false);
      // Call success callback after successful deletion
      onSuccess(user.id);
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Failed to delete user. Please try again.');
      console.error('Delete error:', err);
    }
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#111827', // gray-900
          border: '1px solid #1f2937', // gray-800
          borderRadius: '0.5rem',
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }
      }}
    >
      <DialogTitle sx={{ 
        color: '#e5e7eb', // gray-200
        borderBottom: '1px solid #1f2937', // gray-800
        pb: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        <WarningIcon sx={{ color: '#ef4444', mr: 1.5 }} />
        <Typography component="span" fontWeight="medium">
          Confirm Delete
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        {error && (
          <Typography 
            color="error" 
            variant="body2" 
            sx={{ mb: 2, backgroundColor: 'rgba(239, 68, 68, 0.1)', p: 1.5, borderRadius: 1 }}
          >
            {error}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 2,
              border: '2px solid #3b82f6' // blue-600
            }}
          />
          <Typography variant="h6" color="#e5e7eb">
            {user.first_name} {user.last_name}
          </Typography>
        </Box>
        
        <Typography variant="body1" color="#9ca3af" sx={{ mb: 1 }}>
          Are you sure you want to delete this user? This action cannot be undone.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ borderTop: '1px solid #1f2937', px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{ 
            color: '#9ca3af', // gray-400
            '&:hover': {
              backgroundColor: 'rgba(75, 85, 99, 0.1)', // gray-600 with opacity
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleDelete} 
          disabled={loading}
          sx={{
            backgroundColor: '#ef4444', // red-500
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#dc2626', // red-600
            },
            '&.Mui-disabled': {
              backgroundColor: '#991b1b', // red-800
              opacity: 0.7,
              color: '#f3f4f6', // gray-100
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#f3f4f6' }} />
          ) : (
            'Delete User'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;