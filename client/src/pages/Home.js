import {
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  ShoppingCart as ShoppingCartIcon,
  Support as SupportIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { categoryAPI, productsAPI } from "../services/api";

const Home = ({ user, onLogout, cartItemCount, onAddToCart }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoryAPI.getAll(),
      ]);

      setCategories(categoriesData.categories || []);
      setFeaturedProducts((productsData.products || []).slice(0, 6));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId) => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  const features = [
    {
      icon: <ShippingIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
  ];

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
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Loading amazing products...
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography
                    component="h1"
                    variant={isMobile ? "h3" : "h2"}
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      background:
                        "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Discover the Future of Tech
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}
                  >
                    Premium gadgets, cutting-edge technology, and unbeatable
                    prices. Welcome to your tech paradise.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: "white",
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: "grey.100",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                        borderRadius: 2,
                        px: 4,
                      }}
                    >
                      Shop Now
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                          borderColor: "white",
                          bgcolor: "rgba(255,255,255,0.1)",
                        },
                        borderRadius: 2,
                        px: 4,
                      }}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in timeout={1500}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Tech Gadgets"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      borderRadius: "20px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    height: "100%",
                    border: "1px solid",
                    borderColor: "grey.200",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {feature.icon}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 2, mb: 1 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      {categories.length > 0 && (
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Shop by Category
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              Discover our wide range of tech categories
            </Typography>
            <Grid container spacing={3}>
              {categories.slice(0, 8).map((category) => (
                <Grid item xs={6} sm={4} md={3} key={category._id}>
                  <Paper
                    component={Link}
                    to={`/products?category=${category._id}`}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      textDecoration: "none",
                      color: "inherit",
                      border: "1px solid",
                      borderColor: "grey.200",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        borderColor: "primary.main",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {category.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <Box sx={{ py: 8, bgcolor: "grey.50" }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 6,
              }}
            >
              <TrendingUpIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                textAlign="center"
              >
                Featured Products
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {featuredProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                      },
                      transition: "all 0.3s ease",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={
                          product.image ||
                          `https://source.unsplash.com/400x250/?${
                            product.name || "tech,gadget"
                          }`
                        }
                        alt={product.name}
                        sx={{
                          transition: "transform 0.3s ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      />
                      {product.category && (
                        <Chip
                          label={product.category.name}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: "primary.main",
                            color: "white",
                          }}
                        />
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={4.5}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          (4.5)
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        ${product.price ? product.price.toFixed(2) : "0.00"}
                      </Typography>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                      <Button
                        component={Link}
                        to={`/products/${product._id}`}
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{ color: "text.secondary" }}
                      >
                        View Details
                      </Button>
                      <IconButton
                        onClick={() => handleAddToCart(product._id)}
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": {
                            bgcolor: "primary.dark",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 6 }}>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                }}
              >
                View All Products
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* Newsletter Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Get the latest updates on new products and exclusive offers
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ maxWidth: 500, mx: "auto" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "16px",
                  }}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.100" },
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
