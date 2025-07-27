import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const postRegister = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: "Email already registered" });
      return res.status(400).json({ errors });
    }

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Auto-authenticate the user after successful registration
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    res.status(201).json({
      message: "Registration successful! You are now logged in.",
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];

  if (!email || !password) {
    errors.push({ msg: "Please fill in all fields" });
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.push({ msg: "Invalid email or password" });
      return res.status(400).json({ errors });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push({ msg: "Invalid email or password" });
      return res.status(400).json({ errors });
    }

    // Set user session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    res.json({
      message: "You are now logged in",
      user: req.session.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "You are logged out" });
  });
};

// Get current user
export const getCurrentUser = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  let errors = [];

  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!username || !email) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    errors.push({ msg: "Please enter a valid email address" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const userId = req.session.user._id;

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      errors.push({ msg: "Email already registered" });
      return res.status(400).json({ errors });
    }

    // Check if username is already taken by another user
    const existingUsername = await User.findOne({
      username,
      _id: { $ne: userId },
    });
    if (existingUsername) {
      errors.push({ msg: "Username already taken" });
      return res.status(400).json({ errors });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update session
    req.session.user = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    };

    res.json({
      message: "Profile updated successfully",
      user: req.session.user,
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update user password
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  let errors = [];

  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (newPassword !== confirmPassword) {
    errors.push({ msg: "New passwords do not match" });
  }

  if (newPassword.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      errors.push({ msg: "Current password is incorrect" });
      return res.status(400).json({ errors });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await User.findByIdAndUpdate(req.session.user._id, {
      password: hashedPassword,
    });

    res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
