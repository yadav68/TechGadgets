import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoryAPI } from "../services/api";
import { Container, Typography, Button, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminCategories = ({ user, onLogout, cartItemCount }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, form);
        // showToast('Category updated successfully', 'success');
      } else {
        await categoryAPI.create(form);
        // showToast('Category created successfully', 'success');
      }
      setForm({ name: "", description: "", isActive: true });
      setEditingCategory(null);
      setOpenForm(false);
      fetchCategories();
    } catch (err) {
      // showToast('Error saving category', 'error');
      console.error('Error saving category:', err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive
    });
    setOpenForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryAPI.delete(categoryId);
        // showToast('Category deleted successfully', 'success');
        fetchCategories();
      } catch (err) {
        // showToast('Error deleting category', 'error');
        console.error('Error deleting category:', err);
      }
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingCategory(null);
    setForm({ name: "", description: "", isActive: true });
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
          Category Management
        </Typography>
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <Button component={Link} to="/admin" variant="outlined">
            Back to Dashboard
          </Button>
          <Button variant="contained" onClick={() => setOpenForm(true)}>
            Add New Category
          </Button>
        </Box>

        {categories.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">No categories found.</Typography>
            <Button variant="contained" onClick={() => setOpenForm(true)} sx={{ mt: 2 }}>
              Add Your First Category
            </Button>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="category table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow
                    key={category._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.description || 'N/A'}</TableCell>
                    <TableCell>{category.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(category)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(category._id)}
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

        <Dialog open={openForm} onClose={handleCloseForm}>
          <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Category Name"
                type="text"
                fullWidth
                variant="outlined"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    name="isActive"
                    color="primary"
                  />
                }
                label="Active"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
};

export default AdminCategories; 