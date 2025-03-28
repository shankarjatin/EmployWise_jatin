import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
// Import your video directly from assets
import backgroundVideo from '../assets/earth.mp4';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle video load event with improved loading detection
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to set loaded state if video is already loaded
      if (video.readyState >= 3) {
        setVideoLoaded(true);
      }

      const handleLoadedData = () => {
        console.log('Video loaded successfully');
        setVideoLoaded(true);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      
      // Add canplaythrough event as a backup
      video.addEventListener('canplaythrough', handleLoadedData);
      
      // Clean up event listeners on unmount
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplaythrough', handleLoadedData);
      };
    }
  }, []);

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      toast.success('Login successful!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-950">
      {/* Background Video Container */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute h-full w-full object-cover"
          style={{
            opacity: videoLoaded ? 0.4 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-950 bg-opacity-70"></div>
      </div>

      <div className="w-full max-w-md overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-xl bg-opacity-85 backdrop-blur-sm z-10">
        <div className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-blue-600 text-center text-2xl font-bold leading-[48px] text-white">
              L
            </div>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-gray-200">
              Please sign-in to your account and start the adventure
            </h1>
          </div>

          <form noValidate autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email or username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim()) setEmailError('');
                }}
                className={`w-full rounded-md border ${emailError ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600`}
                autoFocus
              />
              {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="············"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.trim()) setPasswordError('');
                }}
                className={`w-full rounded-md border ${passwordError ? 'border-red-500' : 'border-gray-700'} bg-gray-800 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600`}
              />
              {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
            </div>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                bgcolor: '#2563eb', // blue-600
                '&:hover': {
                  bgcolor: '#1d4ed8', // blue-700
                },
                py: 1.5,
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              Login
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-400">New on our platform?</p>
              <a href="/" className="font-semibold text-blue-500 hover:text-blue-400">
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default LoginPage;