import {
  AccountCircle,
  Email,
  Lock,
  Person,
  Save,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { useDarkMode } from "../contexts/DarkModeContext";
import { authAPI } from "../services/api";

// Use memo to prevent unnecessary re-renders
const Profile = memo(({ user, onLogout, cartItemCount, onUserUpdate }) => {
  const { isDarkMode } = useDarkMode();

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Profile form state - initialize with user data immediately
  const [profileData, setProfileData] = useState(() => ({
    username: user?.username || "",
    email: user?.email || "",
  }));

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Update profile data only when user prop changes and is different
  useEffect(() => {
    if (user) {
      setProfileData((prevData) => {
        if (
          prevData.username !== user.username ||
          prevData.email !== user.email
        ) {
          return {
            username: user.username || "",
            email: user.email || "",
          };
        }
        return prevData;
      });
    }
  }, [user]);

  // Theme-aware styles
  const styles = useMemo(
    () => ({
      headerBackground: {
        background: isDarkMode
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      },
      cardStyle: {
        backgroundColor: isDarkMode
          ? "rgba(45, 45, 45, 0.8)"
          : "rgba(255, 255, 255, 0.9)",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        backdropFilter: "blur(10px)",
        borderRadius: 3,
      },
      textFieldStyle: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          backgroundColor: isDarkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.02)",
          "&:hover": {
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
          },
          "&.Mui-focused": {
            backgroundColor: isDarkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.06)",
          },
        },
      },
      buttonStyle: {
        borderRadius: 2,
        px: 4,
        py: 1.5,
        textTransform: "none",
        fontWeight: "bold",
        background: isDarkMode
          ? "linear-gradient(45deg, #667eea 30%, #764ba2 90%)"
          : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        "&:hover": {
          background: isDarkMode
            ? "linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)"
            : "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
        },
      },
    }),
    [isDarkMode]
  );

  // Memoize tab change handler to prevent recreation on render
  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setSuccess("");
  }, []);

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors for this specific field if it exists
    setErrors((prev) => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors for this specific field if it exists
    setErrors((prev) => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const handleUpdateProfile = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors({});

      try {
        const response = await authAPI.updateProfile(profileData);
        setSuccess("Profile updated successfully!");
        setToast({
          open: true,
          message: "Profile updated successfully!",
          type: "success",
        });

        // Update user data in parent component
        if (onUserUpdate) {
          onUserUpdate(response.user);
        }
      } catch (err) {
        if (err.errors) {
          const errorMap = {};
          err.errors.forEach((error) => {
            if (error.msg.includes("Email")) {
              errorMap.email = error.msg;
            } else if (error.msg.includes("Username")) {
              errorMap.username = error.msg;
            } else {
              errorMap.general = error.msg;
            }
          });
          setErrors(errorMap);
        } else {
          setErrors({ general: err.error || "An error occurred" });
        }
      } finally {
        setLoading(false);
      }
    },
    [profileData, onUserUpdate]
  );

  const handleUpdatePassword = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors({});

      try {
        await authAPI.updatePassword(passwordData);
        setSuccess("Password updated successfully!");
        setToast({
          open: true,
          message: "Password updated successfully!",
          type: "success",
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        if (err.errors) {
          const errorMap = {};
          err.errors.forEach((error) => {
            if (error.msg.includes("Current password")) {
              errorMap.currentPassword = error.msg;
            } else if (error.msg.includes("match")) {
              errorMap.confirmPassword = error.msg;
            } else if (error.msg.includes("6 characters")) {
              errorMap.newPassword = error.msg;
            } else {
              errorMap.general = error.msg;
            }
          });
          setErrors(errorMap);
        } else {
          setErrors({ general: err.error || "An error occurred" });
        }
      } finally {
        setLoading(false);
      }
    },
    [passwordData]
  );

  // Memoize the TabPanel component to prevent unnecessary re-renders
  const TabPanel = useCallback(
    ({ children, value, index }) => (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
      </div>
    ),
    []
  );

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ ...styles.cardStyle, overflow: "hidden" }}>
          {/* Header Section */}
          <Box sx={{ ...styles.headerBackground, color: "common.white", p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AccountCircle sx={{ fontSize: 48, opacity: 0.9 }} />
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    // textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    color: "white",
                  }}
                >
                  My Profile
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    // textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    color: "white",
                  }}
                >
                  Manage your account settings
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tabs */}
          <Box
            sx={{
              bgcolor: isDarkMode
                ? "rgba(30, 30, 30, 0.8)"
                : "rgba(245, 245, 245, 0.8)",
              px: 4,
              borderBottom: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              }`,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
                  color: isDarkMode
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                  "&.Mui-selected": {
                    color: isDarkMode ? "#90caf9" : "#1976d2",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: isDarkMode ? "#90caf9" : "#1976d2",
                  height: 3,
                  borderRadius: "2px 2px 0 0",
                },
              }}
            >
              <Tab
                label="Profile Information"
                icon={<Person />}
                iconPosition="start"
              />
              <Tab
                label="Change Password"
                icon={<Lock />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <CardContent
            sx={{
              p: 4,
              bgcolor: isDarkMode
                ? "rgba(18, 18, 18, 0.6)"
                : "rgba(255, 255, 255, 0.8)",
            }}
          >
            {errors.general && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: isDarkMode ? "rgba(244, 67, 54, 0.1)" : undefined,
                  color: isDarkMode ? "#ffcdd2" : undefined,
                }}
              >
                {errors.general}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: isDarkMode ? "rgba(76, 175, 80, 0.1)" : undefined,
                  color: isDarkMode ? "#c8e6c9" : undefined,
                }}
              >
                {success}
              </Alert>
            )}

            {/* Profile Information Tab */}
            <TabPanel value={activeTab} index={0}>
              <Card elevation={0} sx={{ ...styles.cardStyle }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      color: isDarkMode ? "#e3f2fd" : "#1565c0",
                    }}
                  >
                    Update Profile Information
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, opacity: 0.8 }}
                  >
                    Update your username and email address
                  </Typography>

                  <Box component="form" onSubmit={handleUpdateProfile}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          key={`username-field-${profileData.username}`}
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          value={profileData.username}
                          onChange={handleProfileChange}
                          error={!!errors.username}
                          helperText={errors.username}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={styles.textFieldStyle}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          key={`email-field-${profileData.email}`}
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          sx={styles.textFieldStyle}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          startIcon={<Save />}
                          sx={styles.buttonStyle}
                        >
                          {loading ? "Updating..." : "Update Profile"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Change Password Tab */}
            <TabPanel value={activeTab} index={1}>
              <Card elevation={0} sx={{ ...styles.cardStyle }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      color: isDarkMode ? "#e3f2fd" : "#1565c0",
                    }}
                  >
                    Change Password
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, opacity: 0.8 }}
                  >
                    Ensure your account is using a long, random password to stay
                    secure
                  </Typography>

                  <Box component="form" onSubmit={handleUpdatePassword}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          key={`current-password-field-${activeTab}`}
                          required
                          fullWidth
                          id="currentPassword"
                          label="Current Password"
                          name="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          error={!!errors.currentPassword}
                          helperText={errors.currentPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("current")
                                  }
                                  edge="end"
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                >
                                  {showPasswords.current ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={styles.textFieldStyle}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          key={`new-password-field-${activeTab}`}
                          required
                          fullWidth
                          id="newPassword"
                          label="New Password"
                          name="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          error={!!errors.newPassword}
                          helperText={
                            errors.newPassword ||
                            "Password must be at least 6 characters"
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("new")
                                  }
                                  edge="end"
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                >
                                  {showPasswords.new ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={styles.textFieldStyle}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          key={`confirm-password-field-${activeTab}`}
                          required
                          fullWidth
                          id="confirmPassword"
                          label="Confirm New Password"
                          name="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("confirm")
                                  }
                                  edge="end"
                                  sx={{
                                    color: isDarkMode ? "#90caf9" : "#1976d2",
                                  }}
                                >
                                  {showPasswords.confirm ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={styles.textFieldStyle}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          startIcon={<Save />}
                          sx={styles.buttonStyle}
                        >
                          {loading ? "Updating..." : "Update Password"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>
          </CardContent>
        </Paper>
      </Container>

      <Footer />

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
});

export default Profile;
