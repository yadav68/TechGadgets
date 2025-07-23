import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../services/api";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, CircularProgress, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminProducts = ({ user, onDelete, onLogout, cartItemCount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await adminAPI.getProducts();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await onDelete(productId);
      fetchProducts();
    }
  };

  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const categoryName = product.category?.name || 'Uncategorized';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    }, {});
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
          Product Management
        </Typography>
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <Button component={Link} to="/admin" variant="outlined">
            Back to Dashboard
          </Button>
          <Button component={Link} to="/products/new" variant="contained">
            Add New Product
          </Button>
        </Box>

        {products.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">No products found.</Typography>
            <Button component={Link} to="/products/new" variant="contained" sx={{ mt: 2 }}>
              Add Your First Product
            </Button>
          </Box>
        ) : (
          Object.entries(groupByCategory(products)).map(([category, catProducts]) => (
            <Box key={category} sx={{ mb: 5 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {category}
              </Typography>
              <Grid container spacing={4}>
                {catProducts.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component={Link}
                        to={`/products/${product._id}`}
                        sx={{ pt: '56.25%' }}
                        image={product.image || 'https://source.unsplash.com/random?tech,gadget'}
                        title={product.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h3">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Stock: {product.stock}
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                          ${product.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/products/${product._id}`} size="small">View</Button>
                        <Button component={Link} to={`/products/${product._id}/edit`} size="small">Edit</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(product._id)}>Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AdminProducts; 