import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  ShoppingCart as ShoppingCartIcon,
  Support as SupportIcon,
  TrendingUp as TrendingUpIcon,
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
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { categoryAPI, productsAPI } from "../services/api";

const Home = ({ user, onLogout, cartItemCount, onAddToCart, onDelete }) => {
  // ==================== STATE MANAGEMENT ====================
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [email, setEmail] = useState("");

  // ==================== RESPONSIVE BREAKPOINTS ====================
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ==================== DATA FETCHING ====================
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fetches products and categories data from API
   */
  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoryAPI.getWithProductCount(), // Use new API endpoint for categories with product count
      ]);

      setCategories(categoriesData.categories || []);
      setFeaturedProducts((productsData.products || []).slice(0, 6));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== EVENT HANDLERS ====================
  /**
   * Handles adding product to cart
   */
  const handleAddToCart = (productId) => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  /**
   * Handles product deletion (admin only)
   */
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      if (onDelete) {
        await onDelete(productId);
        // Refresh the featured products list
        fetchData();
      }
    }
  };

  /**
   * Handles newsletter subscription
   */
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: Implement newsletter subscription API call
      console.log("Subscribing email:", email);
      setEmail("");
      // You can show a success message here
    }
  };

  // ==================== COMPONENT DEFINITIONS ====================
  /**
   * Reusable Product Card Component
   * Displays product with image, details, rating, and actions
   */
  const ProductCard = ({ product }) => {
    const handleCardClick = () => {
      // Navigate to product detail page using React Router
      navigate(`/products/${product._id}`);
    };

    const handleActionClick = (e) => {
      // Prevent card click when clicking action buttons
      e.stopPropagation();
    };

    return (
      <Card
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
          },
          borderRadius: 3,
          overflow: "hidden",
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <CardMedia
            component="img"
            height="220"
            image={
              product.image ||
              `https://placeholder.com/400x220/0066CC/FFFFFF?text=${encodeURIComponent(
                product.name || "Tech Gadget"
              )}`
            }
            alt={product.name}
            sx={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
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
                fontWeight: "bold",
              }}
            />
          )}
          {product.stock < 10 && (
            <Chip
              label="Low Stock"
              size="small"
              color="warning"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                fontWeight: "bold",
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
              mb: 1,
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
              lineHeight: 1.4,
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={4.2} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              (4.2)
            </Typography>
          </Box>

          <Typography
            variant="h5"
            color="primary.main"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            ${product.price ? product.price.toFixed(2) : "0.00"}
          </Typography>

          {product.stock && (
            <Typography variant="body2" color="text.secondary">
              {product.stock} in stock
            </Typography>
          )}
        </CardContent>

        <Divider />

        <CardActions
          sx={{
            p: 2,
            justifyContent: "flex-end",
            bgcolor: "grey.50",
          }}
          onClick={handleActionClick}
        >
          {user && user.isAdmin ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component={Link}
                to={`/products/${product._id}/edit`}
                size="small"
                sx={{
                  color: "info.main",
                  "&:hover": {
                    bgcolor: "info.light",
                    color: "white",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={handleActionClick}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  handleActionClick(e);
                  handleDelete(product._id);
                }}
                size="small"
                sx={{
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "error.light",
                    color: "white",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              onClick={(e) => {
                handleActionClick(e);
                handleAddToCart(product._id);
              }}
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.05)",
                  boxShadow: 4,
                },
                transition: "all 0.2s ease",
              }}
            >
              Add to Cart
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };

  /**
   * Feature Card Component
   * Displays service features (shipping, security, support)
   */
  const FeatureCard = ({ icon, title, description }) => (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        textAlign: "center",
        height: "100%",
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          borderColor: "primary.main",
        },
      }}
    >
      {icon}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ mt: 2, mb: 1, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );

  /**
   * Category Card Component
   * Displays clickable category cards with product count
   */
  const CategoryCard = ({ category }) => (
    <Paper
      component={Link}
      to={`/products?category=${category._id}`}
      sx={{
        p: { xs: 3, sm: 4 },
        textAlign: "center",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        height: "200px", // Fixed height for consistency
        width: "100%", // Full width within grid
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          borderColor: "primary.main",
        },
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
          mb: 1,
          color: "primary.main",
        }}
      >
        {category.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2, textAlign: "center" }}
      >
        {category.description}
      </Typography>
      <Chip
        label={`${category.productCount} Products`}
        size="small"
        color="primary"
        sx={{ fontWeight: "bold" }}
      />
    </Paper>
  );

  // ==================== CONFIGURATION DATA ====================
  const features = [
    {
      icon: (
        <ShippingIcon
          sx={{ fontSize: { xs: 35, sm: 40 }, color: "primary.main" }}
        />
      ),
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: (
        <SecurityIcon
          sx={{ fontSize: { xs: 35, sm: 40 }, color: "primary.main" }}
        />
      ),
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: (
        <SupportIcon
          sx={{ fontSize: { xs: 35, sm: 40 }, color: "primary.main" }}
        />
      ),
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
  ];

  // ==================== LOADING STATE ====================
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

  // ==================== MAIN RENDER ====================
  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* ==================== HERO SECTION ==================== */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 6, sm: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Hero Text Content */}
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
                      fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                    }}
                  >
                    Discover the Future of Tech
                  </Typography>
                  <Typography
                    variant={isMobile ? "body1" : "h5"}
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontWeight: 300,
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    Premium gadgets, cutting-edge technology, and unbeatable
                    prices. Welcome to your tech paradise.
                  </Typography>

                  {/* Hero Action Buttons */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ maxWidth: { xs: "100%", sm: "auto" } }}
                  >
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
                        py: 1.5,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
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
                        py: 1.5,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>

            {/* Hero Image */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1500}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Tech Gadgets"
                    style={{
                      width: "100%",
                      maxWidth: isMobile ? "300px" : "500px",
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

      {/* ==================== FEATURES SECTION ==================== */}
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: "grey.50" }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} lg={4} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ==================== CATEGORIES SECTION ==================== */}
      {categories.length > 0 && (
        <Box sx={{ py: { xs: 6, sm: 8 } }}>
          <Container maxWidth="lg">
            {/* Section Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 } }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h2"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Top Categories
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
              >
                Browse our most popular product categories
              </Typography>
            </Box>

            {/* Categories Grid - Up to 6 categories: 2 rows x 3 columns on desktop */}
            <Grid
              container
              spacing={{ xs: 2, sm: 3, md: 4 }}
              justifyContent="center"
            >
              {categories.map((category) => (
                <Grid
                  item
                  key={category._id}
                  xs={12} // Full width on mobile
                  sm={6} // Half width on small screens
                  lg={4} // One-third width on large screens
                  sx={{
                    display: "flex",
                    maxWidth: { xs: "100%", sm: "40%", lg: "30%" },
                    minWidth: { xs: "100%", sm: "40%", lg: "30%" },
                    width: "100%",
                    margin: "0 auto",
                  }}
                >
                  <CategoryCard category={category} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* ==================== FEATURED PRODUCTS SECTION ==================== */}
      {featuredProducts.length > 0 && (
        <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: "grey.50" }}>
          <Container maxWidth="lg">
            {/* Section Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 4, sm: 6 },
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
              }}
            >
              <TrendingUpIcon
                sx={{
                  color: "primary.main",
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                }}
              />
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h2"
                fontWeight="bold"
                textAlign="center"
              >
                Featured Products
              </Typography>
            </Box>

            {/* Products Grid - Bootstrap col-12 (mobile) and col-4 (large) equivalent */}
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {featuredProducts.map((product) => (
                <Grid
                  item
                  key={product._id}
                  xs={12} // Mobile: Full width (1 per row) = Bootstrap col-12
                  sm={6} // Tablet: Half width (2 per row) = Bootstrap col-6
                  lg={4} // Large: One-third width (3 per row) = Bootstrap col-4
                  sx={{
                    display: "flex",
                    maxWidth: { xs: "100%", sm: "40%", lg: "30%" },
                    minWidth: { xs: "100%", sm: "40%", lg: "30%" },
                    width: "100%",
                    margin: "0 auto",
                  }}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {/* Show More Button */}
            <Box sx={{ textAlign: "center", mt: { xs: 4, sm: 6 } }}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 2,
                  px: { xs: 3, sm: 4 },
                  py: 1.5,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: "bold",
                  minWidth: { xs: "200px", sm: "auto" },
                }}
              >
                Show More Products
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* ==================== NEWSLETTER SECTION ==================== */}
      <Box
        sx={{
          py: { xs: 6, sm: 8 },
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              gutterBottom
            >
              Stay Updated
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Get the latest updates on new products and exclusive offers
            </Typography>

            {/* Newsletter Form */}
            <Stack
              component="form"
              onSubmit={handleSubscribe}
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ maxWidth: 500, mx: "auto" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "16px",
                    fontFamily: "inherit",
                  }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  "&:hover": { bgcolor: "grey.100" },
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  minWidth: { xs: "100%", sm: "auto" },
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
