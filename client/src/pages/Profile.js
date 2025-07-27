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
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { authAPI } from "../services/api";

const Profile = ({ user, onLogout, cartItemCount, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setSuccess("");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdateProfile = async (e) => {
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
  };

  const handleUpdatePassword = async (e) => {
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
  };

  const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <>
      <Header user={user} onLogout={onLogout} cartItemCount={cartItemCount} />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
          {/* Header Section */}
          <Box sx={{ bgcolor: "primary.main", color: "white", p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AccountCircle sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  My Profile
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Manage your account settings
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tabs */}
          <Box sx={{ bgcolor: "grey.50", px: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "medium",
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
          <CardContent sx={{ p: 4 }}>
            {errors.general && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errors.general}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {/* Profile Information Tab */}
            <TabPanel value={activeTab} index={0}>
              <Card elevation={0} sx={{ border: 1, borderColor: "grey.200" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Update Profile Information
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Update your username and email address
                  </Typography>

                  <Box component="form" onSubmit={handleUpdateProfile}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
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
                                <Person />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
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
                                <Email />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          startIcon={<Save />}
                          sx={{
                            borderRadius: 1.5,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
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
              <Card elevation={0} sx={{ border: 1, borderColor: "grey.200" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Change Password
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Ensure your account is using a long, random password to stay
                    secure
                  </Typography>

                  <Box component="form" onSubmit={handleUpdatePassword}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
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
                                <Lock />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("current")
                                  }
                                  edge="end"
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
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
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
                                <Lock />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("new")
                                  }
                                  edge="end"
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
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
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
                                <Lock />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    togglePasswordVisibility("confirm")
                                  }
                                  edge="end"
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
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading}
                          startIcon={<Save />}
                          sx={{
                            borderRadius: 1.5,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
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
};

export default Profile;
