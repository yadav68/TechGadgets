import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

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
    return res.render('auth/register', { title: 'Register', errors, username, email });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: 'Email already registered' });
      return res.render('auth/register', { title: 'Register', errors, username, email });
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email || !password) {
    errors.push({ msg: 'Please fill in all fields' });
    return res.render('auth/login', { title: 'Login', errors });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.push({ msg: 'Invalid email or password' });
      return res.render('auth/login', { title: 'Login', errors });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.push({ msg: 'Invalid email or password' });
      return res.render('auth/login', { title: 'Login', errors });
    }
    
    // Debug: Log the user data from database
    console.log('User from DB:', {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    });
    
    // Set user session
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    };
    
    // Debug: Log the session data
    console.log('Session user:', req.session.user);
    
    req.flash('success_msg', 'You are now logged in');
    res.redirect('/');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server Error');
  }
};

export const logout = (req, res) => {
  req.flash('success_msg', 'You are logged out'); // Set flash before destroying session
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}; 