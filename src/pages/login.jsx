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
  // Pre-filled with the required credentials
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Enhanced video loading detection
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log("Video element initialized");
      
      // Check if video is already loaded
      if (video.readyState >= 3) {
        console.log("Video already loaded");
        setVideoLoaded(true);
      }
      
      // Set up multiple event listeners for better detection
      const handleVideoReady = () => {
        console.log("Video is ready to play");
        setVideoLoaded(true);
      };
      
      video.addEventListener('loadeddata', handleVideoReady);
      video.addEventListener('canplay', handleVideoReady);
      video.addEventListener('playing', handleVideoReady);
      
      // Force video to show after a timeout as fallback
      const timer = setTimeout(() => {
        console.log("Forcing video display via timeout");
        setVideoLoaded(true);
      }, 1000);
      
      return () => {
        clearTimeout(timer);
        video.removeEventListener('loadeddata', handleVideoReady);
        video.removeEventListener('canplay', handleVideoReady);
        video.removeEventListener('playing', handleVideoReady);
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
      {/* Background Video Container with fixed z-index */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0, // Changed from -2 to 0
          backgroundColor: '#030712',
          overflow: 'hidden',
        }}
      >
        {/* Video Element with fixed z-index */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute object-cover w-full h-full"
          style={{
            zIndex: -1, // Changed from 4 to -1 so it appears behind the overlay
            opacity: videoLoaded ? 0.4 : 0, // Changed from 1 to 0.4 for better readability
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(3, 7, 18, 0.7)',
            zIndex: 1, // Changed from 0 to 1 so it appears above the video
          }}
        />
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-xl bg-opacity-85 backdrop-blur-sm z-10 relative">
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
      <ToastContainer position="top-center" zIndex={9999} />
    </div>
  );
};

export default LoginPage;