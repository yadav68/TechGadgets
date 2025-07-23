import {
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Receipt as OrdersIcon,
  Person as PersonIcon,
  Inventory as ProductsIcon,
  ShoppingCart as ShoppingCartIcon,
  PersonAdd as SignUpIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ user, onLogout, cartItemCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleLogout = async () => {
    setUserMenuAnchor(null);
    if (onLogout) {
      await onLogout();
      navigate("/");
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Products", path: "/products", icon: <ProductsIcon /> },
    ...(user && user.isAdmin
      ? [{ text: "Admin", path: "/admin", icon: <AdminIcon /> }]
      : []),
  ];

  const drawer = (
    <Box sx={{ width: 280, height: "100%", bgcolor: "background.paper" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          TechGadgets
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 2, py: 2 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 1,
              textDecoration: "none",
              bgcolor: isActivePage(item.path) ? "primary.main" : "transparent",
              color: isActivePage(item.path) ? "white" : "text.primary",
              "&:hover": {
                bgcolor: isActivePage(item.path)
                  ? "primary.dark"
                  : "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActivePage(item.path) ? "white" : "text.secondary",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        <Divider sx={{ my: 2 }} />

        {user ? (
          <>
            <ListItem
              component={Link}
              to="/orders"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mb: 1,
                textDecoration: "none",
                bgcolor: isActivePage("/orders")
                  ? "primary.main"
                  : "transparent",
                color: isActivePage("/orders") ? "white" : "text.primary",
                "&:hover": {
                  bgcolor: isActivePage("/orders")
                    ? "primary.dark"
                    : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActivePage("/orders") ? "white" : "text.secondary",
                  minWidth: 40,
                }}
              >
                <OrdersIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem
              onClick={() => {
                handleDrawerToggle();
                handleLogout();
              }}
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon sx={{ color: "text.secondary", minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mb: 1,
                color: "inherit",
                textDecoration: "none",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon sx={{ color: "text.secondary", minWidth: 40 }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                color: "inherit",
                textDecoration: "none",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon sx={{ color: "text.secondary", minWidth: 40 }}>
                <SignUpIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                color: "primary.main",
                textDecoration: "none",
                fontWeight: "bold",
                mr: 4,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              TechGadgets
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: isActivePage(item.path)
                        ? "primary.main"
                        : "text.primary",
                      fontWeight: isActivePage(item.path) ? "bold" : "normal",
                      bgcolor: isActivePage(item.path)
                        ? "primary.50"
                        : "transparent",
                      "&:hover": {
                        bgcolor: "action.hover",
                        color: "primary.main",
                      },
                      borderRadius: 2,
                      px: 2,
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right side actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Cart Icon */}
              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
                sx={{
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: "action.hover",
                    color: "primary.main",
                  },
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      minWidth: "18px",
                      height: "18px",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Desktop User Menu */}
              {!isMobile && (
                <>
                  {user ? (
                    <>
                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: "primary.main" }}>
                            <PersonIcon />
                          </Avatar>
                        }
                        label={user.name || user.email}
                        onClick={handleUserMenuOpen}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      />
                      <Menu
                        anchorEl={userMenuAnchor}
                        open={Boolean(userMenuAnchor)}
                        onClose={handleUserMenuClose}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                        PaperProps={{
                          sx: {
                            mt: 1,
                            minWidth: 200,
                            borderRadius: 2,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/orders"
                          onClick={handleUserMenuClose}
                          sx={{ gap: 2 }}
                        >
                          <OrdersIcon fontSize="small" />
                          My Orders
                        </MenuItem>
                        {user.isAdmin && (
                          <MenuItem
                            component={Link}
                            to="/admin"
                            onClick={handleUserMenuClose}
                            sx={{ gap: 2 }}
                          >
                            <AdminIcon fontSize="small" />
                            Admin Dashboard
                          </MenuItem>
                        )}
                        <Divider />
                        <MenuItem
                          onClick={handleLogout}
                          sx={{ gap: 2, color: "error.main" }}
                        >
                          <LogoutIcon fontSize="small" />
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 2 }}
                      >
                        Login
                      </Button>
                      <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        size="small"
                        sx={{ borderRadius: 2 }}
                      >
                        Sign Up
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
