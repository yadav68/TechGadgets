import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productsAPI, categoryAPI } from "../services/api";
import { Container, Typography, TextField, Button, Grid, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductEdit = ({ user, onEdit, onDelete, onLogout, cartItemCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productsAPI.getById(id);
      setProduct(data.product);
      setForm({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price || "",
        image: data.product.image || "",
        category: data.product.category?._id || data.product.category || "",
        stock: data.product.stock || ""
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryAPI.getAll();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await onEdit({ ...form, _id: id });
    if (result.success) {
      navigate(`/products/${id}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await onDelete(id);
      navigate('/products');
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

  if (!product) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            Product not found.
          </Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
      <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Edit Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Product Name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                required
                fullWidth
                id="price"
                label="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="stock"
                required
                fullWidth
                id="stock"
                label="Stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="image"
                fullWidth
                id="image"
                label="Image URL"
                value={form.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={form.category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to={`/products/${product._id}`} sx={{ mr: 2 }}>
              Back to Product
            </Button>
            <Box>
              <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                Update Product
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Product
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductEdit; 