import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../services/api";
import { Container, Typography, Button, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const AdminUsers = ({ user, onToggleAdmin, onDelete, onLogout, cartItemCount }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminAPI.getUsers();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async (userId) => {
    await onToggleAdmin(userId);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await onDelete(userId);
      fetchUsers();
    }
  };

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          User Management
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Button component={Link} to="/admin" variant="outlined">
            Back to Dashboard
          </Button>
        </Box>

        {users.length === 0 ? (
          <Typography>No users found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {u.username}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.isAdmin ? 'Admin' : 'User'}</TableCell>
                    <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleToggleAdmin(u._id)}
                        sx={{ mr: 1 }}
                      >
                        {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(u._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </>
  );
}; 