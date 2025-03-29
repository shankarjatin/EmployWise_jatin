import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(17, 24, 39, 0.85)', // Semi-transparent dark background
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid #1f2937',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#9ca3af',
          fontWeight: 500,
        }}
      >
        Assignment submitted by Jatin Shankar Srivastava
      </Typography>
      
      <Box>
        <IconButton 
          component={Link} 
          href="https://github.com/shankarjatin" 
          target="_blank"
          aria-label="GitHub"
          sx={{ 
            color: '#e5e7eb',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#3b82f6',
              transform: 'translateY(-3px)'
            }
          }}
        >
          <GitHubIcon />
        </IconButton>
        
        <IconButton 
          component={Link} 
          href="https://www.linkedin.com/in/jatin-shankar-srivastava/" 
          target="_blank"
          aria-label="LinkedIn"
          sx={{ 
            color: '#e5e7eb',
            transition: 'all 0.2s',
            '&:hover': {
              color: '#3b82f6',
              transform: 'translateY(-3px)'
            }
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;