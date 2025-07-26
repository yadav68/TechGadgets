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
  // ==================== STATE MANAGEMENT ====================
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [email, setEmail] = useState("");

  // ==================== RESPONSIVE BREAKPOINTS ====================
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
  const ProductCard = ({ product }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        },
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Product Image Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height={isMobile ? "200" : "220"}
          image={
            product.image ||
            `https://placeholder.com/400x220/0066CC/FFFFFF?text=${encodeURIComponent(
              product.name || "Tech Gadget"
            )}`
          }
          alt={product.name}
          sx={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />

        {/* Category Badge */}
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
              fontSize: "0.75rem",
            }}
          />
        )}

        {/* Low Stock Badge */}
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

      {/* Product Details Section */}
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        {/* Product Name */}
        <Typography
          gutterBottom
          variant={isMobile ? "subtitle1" : "h6"}
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

        {/* Product Description */}
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
            minHeight: "2.8em",
          }}
        >
          {product.description}
        </Typography>

        {/* Rating Section */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating value={4.2} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (4.2)
          </Typography>
        </Box>

        {/* Price */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          color="primary.main"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          ${product.price ? product.price.toFixed(2) : "0.00"}
        </Typography>

        {/* Stock Information */}
        {product.stock && (
          <Typography variant="body2" color="text.secondary">
            {product.stock} in stock
          </Typography>
        )}
      </CardContent>

      <Divider />

      {/* Action Buttons */}
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
  );

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
   * Displays clickable category cards
   */
  const CategoryCard = ({ category }) => (
    <Paper
      component={Link}
      to={`/products?category=${category._id}`}
      sx={{
        p: { xs: 2, sm: 3 },
        textAlign: "center",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          borderColor: "primary.main",
        },
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
      >
        {category.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {category.description}
      </Typography>
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
                Shop by Category
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                color="text.secondary"
              >
                Discover our wide range of tech categories
              </Typography>
            </Box>

            {/* Categories Grid */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {categories.slice(0, 6).map((category) => (
                <Grid item xs={12} sm={6} lg={4} key={category._id}>
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
