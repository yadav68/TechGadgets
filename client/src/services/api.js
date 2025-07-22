const API_BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5002/api';

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
      // Throw the actual backend error object (can be { error } or { errors: [...] })
      throw data;
    }
    
    return data;
  } catch (error) {
    // If error is an object with errors array, throw as is
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  logout: () => apiCall('/auth/logout', { method: 'GET' }),
  
  getCurrentUser: () => apiCall('/auth/user', { method: 'GET' }),
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
  
  getCategories: () => apiCall('/admin/categories', { method: 'GET' }),
  
  getOrders: () => apiCall('/admin/orders', { method: 'GET' }),
  
  toggleUserAdmin: (userId) => apiCall(`/admin/users/${userId}/toggle-admin`, {
    method: 'PUT',
  }),
  
  deleteUser: (userId) => apiCall(`/admin/users/${userId}`, {
    method: 'DELETE',
  }),
};

// Category API calls
export const categoryAPI = {
  getAll: () => apiCall('/categories', { method: 'GET' }),
  
  getById: (id) => apiCall(`/categories/${id}`, { method: 'GET' }),
  
  create: (categoryData) => apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }),
  
  update: (id, categoryData) => apiCall(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  }),
  
  delete: (id) => apiCall(`/categories/${id}`, { method: 'DELETE' }),
};

// Order API calls
export const orderAPI = {
  getAll: () => apiCall('/orders', { method: 'GET' }),
  
  getUserOrders: () => apiCall('/orders/user', { method: 'GET' }),
  
  getById: (id) => apiCall(`/orders/${id}`, { method: 'GET' }),
  
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  updateStatus: (id, status) => apiCall(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  
  updatePaymentStatus: (id, paymentStatus) => apiCall(`/orders/${id}/payment`, {
    method: 'PUT',
    body: JSON.stringify({ paymentStatus }),
  }),
  
  cancel: (id) => apiCall(`/orders/${id}/cancel`, { method: 'PUT' }),
};

// Homepage API call
export const getHomeData = () => apiCall('/', { method: 'GET' }); 