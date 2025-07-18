import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, isAdmin = false, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (isAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute; 