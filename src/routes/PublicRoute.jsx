import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
