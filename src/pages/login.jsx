import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext'; // import context

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext); // use context
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
      setToken(token); // update context
      toast.success('Login successful!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#A888B5] to-[#441752]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-[#441752] mb-6">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#441752]" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#441752]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#441752] text-white font-semibold rounded-lg shadow-md hover:bg-[#8174A0] focus:outline-none focus:ring-2 focus:ring-[#8174A0]"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#441752]">
              Don't have an account?{' '}
              <a href="/" className="text-[#A888B5] hover:underline">Sign up</a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
