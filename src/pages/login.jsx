import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-xl">
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                autoFocus
              />
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <Button variant="outlined"
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900"
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
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
