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
import DarkModeToggle from "./DarkModeToggle";

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
    <Box sx={{ width: 300, height: "100%", bgcolor: "background.paper" }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "primary.50",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          TechGadgets
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DarkModeToggle />
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              bgcolor: "background.paper",
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 3 }}>
        {/* Main Navigation */}
        <Typography
          variant="overline"
          fontWeight="bold"
          color="text.secondary"
          sx={{ mb: 2, display: "block" }}
        >
          Navigation
        </Typography>

        <List disablePadding sx={{ mb: 3 }}>
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
                bgcolor: isActivePage(item.path)
                  ? "primary.main"
                  : "transparent",
                color: isActivePage(item.path)
                  ? "primary.contrastText"
                  : "text.primary",
                border: "1px solid",
                borderColor: isActivePage(item.path)
                  ? "primary.main"
                  : "divider",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: isActivePage(item.path)
                    ? "primary.dark"
                    : "primary.50",
                  borderColor: "primary.main",
                  transform: "translateX(4px)",
                  boxShadow: `0 4px 12px ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)"
                  }`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActivePage(item.path)
                    ? "primary.contrastText"
                    : "primary.main",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: "medium",
                    fontSize: "0.95rem",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>

        {user ? (
          <>
            {/* User Section */}
            <Typography
              variant="overline"
              fontWeight="bold"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Account
            </Typography>

            {/* User Info Card */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  bgcolor: "primary.50",
                  borderRadius: 2,
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      noWrap
                      sx={{ color: "primary.main", mb: 0.5 }}
                    >
                      {user.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {user.email}
                    </Typography>
                    <Chip
                      label={user.isAdmin ? "Administrator" : "User"}
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: user.isAdmin
                          ? "secondary.main"
                          : "success.main",
                        color: user.isAdmin
                          ? "secondary.contrastText"
                          : "success.contrastText",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* User Menu Items */}
            <List disablePadding sx={{ mb: 3 }}>
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
                  color: isActivePage("/orders")
                    ? "primary.contrastText"
                    : "text.primary",
                  border: "1px solid",
                  borderColor: isActivePage("/orders")
                    ? "primary.main"
                    : "divider",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: isActivePage("/orders")
                      ? "primary.dark"
                      : "primary.50",
                    borderColor: "primary.main",
                    transform: "translateX(4px)",
                    boxShadow: `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)"
                    }`,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActivePage("/orders")
                      ? "primary.contrastText"
                      : "primary.main",
                    minWidth: 40,
                  }}
                >
                  <OrdersIcon />
                </ListItemIcon>
                <ListItemText
                  primary="My Orders"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: "medium",
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItem>

              <ListItem
                component={Link}
                to="/profile"
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  textDecoration: "none",
                  bgcolor: isActivePage("/profile")
                    ? "primary.main"
                    : "transparent",
                  color: isActivePage("/profile")
                    ? "primary.contrastText"
                    : "text.primary",
                  border: "1px solid",
                  borderColor: isActivePage("/profile")
                    ? "primary.main"
                    : "divider",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: isActivePage("/profile")
                      ? "primary.dark"
                      : "primary.50",
                    borderColor: "primary.main",
                    transform: "translateX(4px)",
                    boxShadow: `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)"
                    }`,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActivePage("/profile")
                      ? "primary.contrastText"
                      : "primary.main",
                    minWidth: 40,
                  }}
                >
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary="My Profile"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: "medium",
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItem>
            </List>

            {/* Logout Button */}
            <Button
              onClick={() => {
                handleDrawerToggle();
                handleLogout();
              }}
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: 2,
                py: 1.5,
                textTransform: "none",
                fontWeight: "medium",
                border: "1px solid",
                borderColor: "error.main",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "error.50",
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 12px ${
                    theme.palette.mode === "dark"
                      ? "rgba(244, 67, 54, 0.3)"
                      : "rgba(244, 67, 54, 0.2)"
                  }`,
                },
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            {/* Auth Section */}
            <Typography
              variant="overline"
              fontWeight="bold"
              color="text.secondary"
              sx={{ mb: 2, display: "block" }}
            >
              Get Started
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                onClick={handleDrawerToggle}
                variant="outlined"
                fullWidth
                startIcon={<LoginIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "medium",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)"
                    }`,
                  },
                }}
              >
                Sign In
              </Button>

              <Button
                component={Link}
                to="/register"
                onClick={handleDrawerToggle}
                variant="contained"
                fullWidth
                startIcon={<SignUpIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 16px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.15)"
                    }`,
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(18, 18, 18, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          backdropFilter: "blur(20px)",
          boxShadow: `0 2px 12px ${
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.3)"
              : "rgba(0,0,0,0.08)"
          }`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 }, py: 1.5 }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  bgcolor: "primary.50",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    bgcolor: "primary.100",
                  },
                }}
              >
                <MenuIcon sx={{ color: "primary.main" }} />
              </IconButton>
            )}

            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                textDecoration: "none",
                fontWeight: "bold",
                mr: 4,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #74b9ff 0%, #a29bfe 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
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
                        ? "primary.contrastText"
                        : "text.primary",
                      fontWeight: "medium",
                      bgcolor: isActivePage(item.path)
                        ? "primary.main"
                        : "transparent",
                      border: "1px solid",
                      borderColor: isActivePage(item.path)
                        ? "primary.main"
                        : "transparent",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: isActivePage(item.path)
                          ? "primary.dark"
                          : "primary.50",
                        borderColor: "primary.main",
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 12px ${
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)"
                        }`,
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {/* Right side actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Dark Mode Toggle */}
              <DarkModeToggle />

              {/* Cart Icon */}
              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "primary.50",
                    borderColor: "primary.main",
                    color: "primary.main",
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)"
                    }`,
                  },
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      minWidth: "20px",
                      height: "20px",
                      fontWeight: "bold",
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
                      <Button
                        onClick={handleUserMenuOpen}
                        variant="outlined"
                        sx={{
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: "divider",
                          bgcolor: "background.paper",
                          color: "text.primary",
                          textTransform: "none",
                          px: 2,
                          py: 1,
                          minWidth: 200,
                          justifyContent: "flex-start",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            bgcolor: "primary.50",
                            borderColor: "primary.main",
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 12px ${
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.1)"
                            }`,
                          },
                        }}
                        startIcon={
                          <Avatar
                            sx={{
                              bgcolor: "primary.main",
                              width: 32,
                              height: 32,
                            }}
                          >
                            <PersonIcon sx={{ fontSize: "1rem" }} />
                          </Avatar>
                        }
                      >
                        <Box sx={{ textAlign: "left", ml: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{ lineHeight: 1.2 }}
                          >
                            {user.username}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ lineHeight: 1.2 }}
                          >
                            {user.isAdmin ? "Administrator" : "User Account"}
                          </Typography>
                        </Box>
                      </Button>

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
                            minWidth: 320,
                            borderRadius: 3,
                            boxShadow: `0 12px 40px ${
                              theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.5)"
                                : "rgba(0,0,0,0.15)"
                            }`,
                            border: "1px solid",
                            borderColor: "divider",
                            p: 2,
                          },
                        }}
                      >
                        {/* User Info Header */}
                        <Box sx={{ px: 2, py: 2, mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 48,
                                height: 48,
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                noWrap
                                sx={{ color: "primary.main", mb: 0.5 }}
                              >
                                {user.username}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                sx={{ fontSize: "0.875rem" }}
                              >
                                {user.email}
                              </Typography>
                              <Chip
                                label={user.isAdmin ? "Administrator" : "User"}
                                size="small"
                                sx={{
                                  mt: 1,
                                  bgcolor: user.isAdmin
                                    ? "secondary.main"
                                    : "success.main",
                                  color: user.isAdmin
                                    ? "secondary.contrastText"
                                    : "success.contrastText",
                                  fontWeight: "bold",
                                  fontSize: "0.75rem",
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Divider sx={{ mb: 1 }} />

                        <MenuItem
                          component={Link}
                          to="/orders"
                          onClick={handleUserMenuClose}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            p: 2,
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              bgcolor: "primary.50",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          <OrdersIcon sx={{ color: "primary.main", mr: 2 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              My Orders
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              View order history
                            </Typography>
                          </Box>
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          to="/profile"
                          onClick={handleUserMenuClose}
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            p: 2,
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              bgcolor: "primary.50",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          <PersonIcon sx={{ color: "primary.main", mr: 2 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              My Profile
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Manage account settings
                            </Typography>
                          </Box>
                        </MenuItem>

                        {user.isAdmin && (
                          <MenuItem
                            component={Link}
                            to="/admin"
                            onClick={handleUserMenuClose}
                            sx={{
                              borderRadius: 2,
                              mb: 1,
                              p: 2,
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                bgcolor: "secondary.50",
                                transform: "translateX(4px)",
                              },
                            }}
                          >
                            <AdminIcon
                              sx={{ color: "secondary.main", mr: 2 }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                Admin Dashboard
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Manage system settings
                              </Typography>
                            </Box>
                          </MenuItem>
                        )}

                        <Divider sx={{ my: 1 }} />

                        <MenuItem
                          onClick={handleLogout}
                          sx={{
                            borderRadius: 2,
                            p: 2,
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              bgcolor: "error.50",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          <LogoutIcon sx={{ color: "error.main", mr: 2 }} />
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              color="error.main"
                            >
                              Sign Out
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              End your session
                            </Typography>
                          </Box>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        startIcon={<LoginIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: "medium",
                          px: 3,
                          py: 1,
                          border: "1px solid",
                          borderColor: "divider",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            borderColor: "primary.main",
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 12px ${
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.1)"
                            }`,
                          },
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        startIcon={<SignUpIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: "bold",
                          px: 3,
                          py: 1,
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 6px 16px ${
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.15)"
                                : "rgba(0,0,0,0.15)"
                            }`,
                          },
                        }}
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
            width: 300,
            boxShadow: `0 12px 40px ${
              theme.palette.mode === "dark"
                ? "rgba(0,0,0,0.5)"
                : "rgba(0,0,0,0.15)"
            }`,
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
