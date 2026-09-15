import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('accessToken');

  
  const isTokenValid = () => {
    
    if (!token) return false;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  if (!user || !isTokenValid() || (allowedRoles && !allowedRoles.includes(String(user.userCategoryId)))) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
