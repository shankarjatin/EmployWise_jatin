import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box, 
  CircularProgress,
  Typography
} from '@mui/material';
import axios from 'axios';

const EditUserModal = ({ open, onClose, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update form state when user prop changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make PUT request to update user
      const response = await axios.put(
        `https://reqres.in/api/users/${user.id}`, 
        formData
      );
      
      setLoading(false);
      
      // Call success callback with updated user data
      onSuccess({
        ...user,
        ...formData
      });
      
      onClose();
    } catch (err) {
      setLoading(false);
      setError('Failed to update user. Please try again.');
      console.error('Update error:', err);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={loading ? null : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#111827', // gray-900
          border: '1px solid #1f2937', // gray-800
          borderRadius: '0.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }
      }}
    >
      <DialogTitle sx={{ color: '#e5e7eb', borderBottom: '1px solid #1f2937', pb: 2 }}>
        Edit User
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          {error && (
            <Typography 
              color="error" 
              variant="body2" 
              sx={{ mb: 2, backgroundColor: 'rgba(239, 68, 68, 0.1)', p: 1, borderRadius: 1 }}
            >
              {error}
            </Typography>
          )}
          
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#374151', // gray-700
                  },
                  '&:hover fieldset': {
                    borderColor: '#4B5563', // gray-600
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6', // blue-600
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9ca3af', // gray-400
                },
                '& .MuiInputBase-input': {
                  color: '#e5e7eb', // gray-200
                },
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#374151', // gray-700
                  },
                  '&:hover fieldset': {
                    borderColor: '#4B5563', // gray-600
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6', // blue-600
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9ca3af', // gray-400
                },
                '& .MuiInputBase-input': {
                  color: '#e5e7eb', // gray-200
                },
              }}
            />
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="dense"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#374151', // gray-700
                  },
                  '&:hover fieldset': {
                    borderColor: '#4B5563', // gray-600
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6', // blue-600
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#9ca3af', // gray-400
                },
                '& .MuiInputBase-input': {
                  color: '#e5e7eb', // gray-200
                },
              }}
            />
          </Box>
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
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{
              backgroundColor: '#3b82f6', // blue-600
              '&:hover': {
                backgroundColor: '#2563eb', // blue-700
              },
              '&.Mui-disabled': {
                backgroundColor: '#1f2937', // gray-800
                color: '#6b7280', // gray-500
              }
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#e5e7eb' }} /> // gray-200
            ) : (
              'Update User'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserModal;