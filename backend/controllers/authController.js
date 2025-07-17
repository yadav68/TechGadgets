import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const postRegister = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];
  
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: 'Email already registered' });
      return res.status(400).json({ errors });
    }
    
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    
    res.status(201).json({ 
      message: 'You are now registered and can log in',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  
  if (!email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
    return res.status(400).json({ errors });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.push({ msg: 'Invalid email or password' });
      return res.status(400).json({ errors });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push({ msg: 'Invalid email or password' });
      return res.status(400).json({ errors });
    }
    
    // Set user session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    };
    
    res.json({ 
      message: 'You are now logged in',
      user: req.session.user
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'You are logged out' });
  });
};

// Get current user
export const getCurrentUser = (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
}; 