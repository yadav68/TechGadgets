const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    credentials: 'include', // Include cookies for session
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials) => apiCall('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiCall('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  logout: () => apiCall('/logout', { method: 'GET' }),
  
  getCurrentUser: () => apiCall('/user', { method: 'GET' }),
};

// Products API calls
export const productsAPI = {
  getAll: () => apiCall('/products', { method: 'GET' }),
  
  getById: (id) => apiCall(`/products/${id}`, { method: 'GET' }),
  
  create: (productData) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  update: (id, productData) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  delete: (id) => apiCall(`/products/${id}`, { method: 'DELETE' }),
};

// Cart API calls
export const cartAPI = {
  getCart: () => apiCall('/cart', { method: 'GET' }),
  
  addToCart: (productId) => apiCall(`/cart/add/${productId}`, {
    method: 'POST',
  }),
  
  updateQuantity: (productId, quantity) => apiCall(`/cart/update/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  
  removeFromCart: (productId) => apiCall(`/cart/remove/${productId}`, {
    method: 'DELETE',
  }),
  
  clearCart: () => apiCall('/cart/clear', { method: 'DELETE' }),
};

// Admin API calls
export const adminAPI = {
  getDashboard: () => apiCall('/admin', { method: 'GET' }),
  
  getProducts: () => apiCall('/admin/products', { method: 'GET' }),
  
  getUsers: () => apiCall('/admin/users', { method: 'GET' }),
  
  toggleUserAdmin: (userId) => apiCall(`/admin/users/${userId}/toggle-admin`, {
    method: 'PUT',
  }),
  
  deleteUser: (userId) => apiCall(`/admin/users/${userId}`, {
    method: 'DELETE',
  }),
};

// Homepage API call
export const getHomeData = () => apiCall('/', { method: 'GET' }); 