import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  Inventory as InventoryIcon,
  Security as SecurityIcon,
  Share as ShareIcon,
  LocalShipping as ShippingIcon,
  ShoppingCart as ShoppingCartIcon,
  Support as SupportIcon,
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
  Grid,
  IconButton,
  Paper,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { productsAPI } from "../services/api";

const ProductDetail = ({
  user,
  onAddToCart,
  onDelete,
  onLogout,
  cartItemCount,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productsAPI.getById(id);
        setProduct(data.product);
        if (data.product && data.product.category) {
          fetchRelatedProducts(data.product.category, data.product._id);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const data = await productsAPI.getAll();
      const related = data.products.filter(
        (p) => p.category?._id === category?._id && p._id !== currentProductId
      );
      setRelatedProducts(related.slice(0, 4));
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await onDelete(id);
      navigate("/products");
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product._id);
      }
    }
  };

  const features = [
    {
      icon: <ShippingIcon />,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: <SupportIcon />,
      title: "24/7 Support",
      description: "Dedicated customer support",
    },
  ];

  if (loading) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" sx={{ fontSize: "2rem", mb: 2 }} />
              <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 2 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={50} />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Product not found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The product you're looking for doesn't exist or may have been
            removed.
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            Back to Products
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  const productImages = product.images || [
    product.image ||
      `https://source.unsplash.com/600x600/?${product.name || "tech,gadget"}`,
  ];

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Container>

      {/* Product Details */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Fade in timeout={500}>
          <Grid container spacing={4}>
            {/* Product Images */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "sticky", top: 100 }}>
                <Paper sx={{ borderRadius: 3, overflow: "hidden", mb: 2 }}>
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </Paper>

                {productImages.length > 1 && (
                  <Grid container spacing={1}>
                    {productImages.map((image, index) => (
                      <Grid item xs={3} key={index}>
                        <Paper
                          sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            cursor: "pointer",
                            border:
                              selectedImage === index ? "2px solid" : "none",
                            borderColor: "primary.main",
                          }}
                          onClick={() => setSelectedImage(index)}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: { xs: "static", md: "sticky" },
                  top: 100,
                  pt: { xs: 2, md: 0 },
                }}
              >
                {/* Category & Stock */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  {product.category && (
                    <Chip
                      label={product.category.name}
                      color="primary"
                      variant="outlined"
                      sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
                    />
                  )}
                  {product.stock && (
                    <Chip
                      icon={<InventoryIcon />}
                      label={`${product.stock} in stock`}
                      color={product.stock < 10 ? "warning" : "success"}
                      variant="outlined"
                      sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
                    />
                  )}
                </Stack>

                {/* Product Name */}
                <Typography
                  variant={{ xs: "h4", md: "h3" }}
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ lineHeight: 1.2 }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Rating value={4.5} precision={0.5} readOnly />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    (4.5) • 127 reviews
                  </Typography>
                </Box>

                {/* Price */}
                <Typography
                  variant={{ xs: "h5", md: "h4" }}
                  color="primary.main"
                  fontWeight="bold"
                  sx={{ mb: 3 }}
                >
                  ${product.price ? product.price.toFixed(2) : "0.00"}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    mb: 4,
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  {product.description}
                </Typography>

                {/* Quantity & Actions */}
                <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 3 }}>
                  <Stack spacing={3}>
                    {/* Quantity Selector */}
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Quantity
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          sx={{ minWidth: "40px" }}
                        >
                          -
                        </Button>
                        <Typography
                          variant="h6"
                          sx={{
                            minWidth: "40px",
                            textAlign: "center",
                            py: 1,
                          }}
                        >
                          {quantity}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setQuantity(quantity + 1)}
                          sx={{ minWidth: "40px" }}
                        >
                          +
                        </Button>
                      </Stack>
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        sx={{
                          flexGrow: 1,
                          py: 1.5,
                          borderRadius: 2,
                          order: { xs: 1, sm: 0 },
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          justifyContent: { xs: "center", sm: "flex-start" },
                          order: { xs: 2, sm: 0 },
                        }}
                      >
                        <IconButton
                          size="large"
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <ShareIcon />
                        </IconButton>
                      </Stack>
                    </Stack>

                    {/* Admin Actions */}
                    {user && user.isAdmin && (
                      <>
                        <Divider />
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                        >
                          <Button
                            component={Link}
                            to={`/products/${product._id}/edit`}
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{ flexGrow: 1 }}
                          >
                            Edit Product
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </>
                    )}
                  </Stack>
                </Paper>

                {/* Features */}
                <Grid container spacing={2}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "background.default",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box sx={{ color: "primary.main" }}>
                            {feature.icon}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Fade>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 4 }}
            >
              You might also like
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item key={relatedProduct._id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) =>
                          `0 8px 25px ${
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(0,0,0,0.12)"
                          }`,
                      },
                      borderRadius: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        relatedProduct.image ||
                        `https://source.unsplash.com/300x200/?${
                          relatedProduct.name || "tech,gadget"
                        }`
                      }
                      alt={relatedProduct.name}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {relatedProduct.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Rating
                          value={4.3}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          (4.3)
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        fontWeight="bold"
                        sx={{ mt: 1 }}
                      >
                        $
                        {relatedProduct.price
                          ? relatedProduct.price.toFixed(2)
                          : "0.00"}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                      <Button
                        component={Link}
                        to={`/products/${relatedProduct._id}`}
                        size="small"
                      >
                        View Details
                      </Button>
                      <IconButton
                        onClick={() =>
                          onAddToCart && onAddToCart(relatedProduct._id)
                        }
                        color="primary"
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Back to Products Button */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            size="large"
            sx={{ borderRadius: 2 }}
          >
            Back to All Products
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default ProductDetail;
