import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';

const Layout = ({ user, onLogout, cartItemCount, children }) => {
  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container component="main" sx={{ my: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout; 