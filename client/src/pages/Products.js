import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  GridView as GridViewIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { categoryAPI, productsAPI } from "../services/api";

const Products = ({ user, onLogout, cartItemCount, onAddToCart, onDelete }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle URL query parameters - run after categories are loaded
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.length > 0) {
      // Verify the category exists in the loaded categories
      const categoryExists = categories.some(
        (cat) => cat._id === categoryFromUrl
      );
      if (categoryExists) {
        setSelectedCategory(categoryFromUrl);
      }
    }
  }, [searchParams, categories]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterAndSortProducts = () => {
      let filtered = products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" ||
          product.category?._id === selectedCategory;
        return matchesSearch && matchesCategory;
      });

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "name":
            return a.name.localeCompare(b.name);
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });

      setFilteredProducts(filtered);
    };

    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoryAPI.getAll(),
      ]);
      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await onDelete(productId);
      fetchData();
    }
  };

  const handleAddToCart = (productId) => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  const ProductCard = ({ product }) => (
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
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        },
        borderRadius: 3,
        overflow: "hidden",
      }}
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

      <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          component={Link}
          to={`/products/${product._id}`}
          size="small"
          startIcon={<VisibilityIcon />}
          sx={{ color: "text.secondary" }}
        >
          View
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          {user && user.isAdmin ? (
            <>
              <IconButton
                component={Link}
                to={`/products/${product._id}/edit`}
                size="small"
                sx={{ color: "info.main" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(product._id)}
                size="small"
                sx={{ color: "error.main" }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
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
          )}
        </Box>
      </CardActions>
    </Card>
  );

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                key={index}
                sx={{
                  display: "flex",
                  minWidth: 0,
                  width: "100%",
                }}
              >
                <Card
                  sx={{ height: 400, width: "100%", maxWidth: "100%", flex: 1 }}
                >
                  <Skeleton variant="rectangular" height={220} width="100%" />
                  <Box sx={{ p: 2 }}>
                    <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <Box sx={{ bgcolor: "grey.50", py: 6 }}>
        <Container maxWidth="xl">
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
            <Typography color="text.primary">Products</Typography>
          </Breadcrumbs>

          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 1 }}
          >
            Discover Amazing Products
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Find the perfect tech gadgets for your needs
          </Typography>

          {user && user.isAdmin && (
            <Button
              component={Link}
              to="/products/new"
              variant="contained"
              startIcon={<AddIcon />}
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Add New Product
            </Button>
          )}
        </Container>
      </Box>

      {/* Filters Section */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 3 }}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            {/* Search */}
            <TextField
              placeholder="Search products..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: { xs: "100%", md: 300 },
                flexGrow: 1,
                order: { xs: 1, md: 0 },
              }}
            />

            {/* Category Filter */}
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 200 },
                order: { xs: 2, md: 0 },
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort */}
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 200 },
                order: { xs: 3, md: 0 },
              }}
            >
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="price-low">Price (Low to High)</MenuItem>
                <MenuItem value="price-high">Price (High to Low)</MenuItem>
                <MenuItem value="newest">Newest First</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Results Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="h6" color="text.secondary">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"} found
          </Typography>
          <IconButton sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
            <GridViewIcon />
          </IconButton>
        </Box>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Paper
            sx={{ p: { xs: 4, md: 8 }, textAlign: "center", borderRadius: 3 }}
          >
            <Typography variant="h5" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filters
            </Typography>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outlined"
              size="large"
            >
              Clear Filters
            </Button>
          </Paper>
        ) : (
          <Fade in timeout={500}>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid
                  item
                  xs={12} // Full width on mobile
                  sm={6} // Half width on small screens
                  lg={4} // One-third width on large screens
                  key={product._id}
                  sx={{
                    display: "flex",
                    // Responsive maxWidth and minWidth
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
          </Fade>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Products;
