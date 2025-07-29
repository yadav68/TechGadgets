import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { adminAPI } from "../services/api";

const AdminDashboard = ({ user, onToggleAdmin, onLogout, cartItemCount }) => {
  const [dashboardData, setDashboardData] = useState({
    products: [],
    users: [],
    newsletters: [],
    totalProducts: 0,
    totalUsers: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalNewsletters: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await adminAPI.getDashboard();
      setDashboardData(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
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
          Admin Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Total Products
                </Typography>
                <Typography variant="h4" color="primary">
                  {dashboardData.totalProducts}
                </Typography>
                <Button
                  component={Link}
                  to="/admin/products"
                  variant="text"
                  sx={{ mt: 2 }}
                >
                  Manage Products
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Total Users
                </Typography>
                <Typography variant="h4" color="primary">
                  {dashboardData.totalUsers}
                </Typography>
                <Button
                  component={Link}
                  to="/admin/users"
                  variant="text"
                  sx={{ mt: 2 }}
                >
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Total Categories
                </Typography>
                <Typography variant="h4" color="primary">
                  {dashboardData.totalCategories || 0}
                </Typography>
                <Button
                  component={Link}
                  to="/admin/categories"
                  variant="text"
                  sx={{ mt: 2 }}
                >
                  Manage Categories
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Total Orders
                </Typography>
                <Typography variant="h4" color="primary">
                  {dashboardData.totalOrders || 0}
                </Typography>
                <Button
                  component={Link}
                  to="/admin/orders"
                  variant="text"
                  sx={{ mt: 2 }}
                >
                  Manage Orders
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Newsletter Subs
                </Typography>
                <Typography variant="h4" color="primary">
                  {dashboardData.totalNewsletters || 0}
                </Typography>
                <Button
                  component={Link}
                  to="/admin/newsletters"
                  variant="text"
                  sx={{ mt: 2 }}
                >
                  Manage Newsletters
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Recent Products
                </Typography>
                {dashboardData.products.length === 0 ? (
                  <Typography>No products found.</Typography>
                ) : (
                  <Box>
                    {dashboardData.products.map((product) => (
                      <Box
                        key={product._id}
                        sx={{ mb: 2, pb: 2, borderBottom: "1px solid #eee" }}
                      >
                        <Typography variant="subtitle1">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${product.price.toFixed(2)} -{" "}
                          {product.category?.name || "No Category"}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Button
                            component={Link}
                            to={`/products/${product._id}`}
                            size="small"
                            sx={{ mr: 1 }}
                          >
                            View
                          </Button>
                          <Button
                            component={Link}
                            to={`/products/${product._id}/edit`}
                            size="small"
                          >
                            Edit
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Recent Users
                </Typography>
                {dashboardData.users.length === 0 ? (
                  <Typography>No users found.</Typography>
                ) : (
                  <Box>
                    {dashboardData.users.map((u) => (
                      <Box
                        key={u._id}
                        sx={{ mb: 2, pb: 2, borderBottom: "1px solid #eee" }}
                      >
                        <Typography variant="subtitle1">
                          {u.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {u.email} - {u.isAdmin ? "Admin" : "User"}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => onToggleAdmin(u._id)}
                          sx={{ mt: 1 }}
                        >
                          {u.isAdmin ? "Remove Admin" : "Make Admin"}
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button component={Link} to="/products/new" variant="contained">
            Add New Product
          </Button>
          <Button component={Link} to="/admin/products" variant="outlined">
            View All Products
          </Button>
          <Button component={Link} to="/admin/users" variant="outlined">
            View All Users
          </Button>
          <Button component={Link} to="/admin/categories" variant="outlined">
            Manage Categories
          </Button>
          <Button component={Link} to="/admin/orders" variant="outlined">
            Manage Orders
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AdminDashboard;
