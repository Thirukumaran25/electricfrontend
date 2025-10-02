// AUTHENTICATION APIs
export const sendOtp = async (phone) => {
  try {
    const response = await api.post('/auth/send-otp/', { phone });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (phone, otp) => {
  try {
    const response = await api.post('/auth/verify-otp/', { phone, otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const emailLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login/', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await api.post('/auth/register/', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// import axios from 'axios'// export default api

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://electricbackend-bd7u.onrender.com/api',
})

// Add authentication interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api



export const getcommercialservices = async () => {
  try {
    const response = await api.get('/commercialservices/');
    return response.data;
  } catch (error) {
    console.error('Error fetching commercial services:', error);
    throw error;
  } 
};

export const getresidentialservices = async () => {
  try {
    const response = await api.get('/residentialservices/');
    return response.data;
  } catch (error) {
    console.error('Error fetching residential services:', error);
    throw error;
  }
};


export const getserviceimages = async () => {
  try {
    const response = await api.get('/serviceimages/');
    return response.data;
  } catch (error) {
    console.error('Error fetching service images:', error);
    throw error;
  }
};


export const getcontactmessages = async () => {
  try {
    const response = await api.get('/contactmessages/');
    return response.data;
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  } 
};

export const postcontactmessage = async (messageData) => {
  try {
    const response = await api.post('/contactmessages/', messageData);
    return response.data;
  } catch (error) {
    console.error('Error posting contact message:', error);
    throw error;
  }  
};


export const getemergencyimages = async () => {
  try {
    const response = await api.get('/emergencyimages/');
    return response.data;
  } catch (error) {
    console.error('Error fetching service images:', error);
    throw error;
  }
};


export const getaboutimages = async () => {
  try {
    const response = await api.get('/aboutimages/');
    return response.data;
  } catch (error) {
    console.error('Error fetching service images:', error);
    throw error;
  }
};

export const gethomeimage = async () => {
  try {
    const response = await api.get('/homeimages/');
    return response.data;
  } catch (error) {
    console.error('Error fetching home image:', error);
    throw error;
  }
};


export const getresidentialservicelists = async () => {
  try {
    const response = await api.get('/residentialservicelists/'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching residential service lists:', error);
    throw error;
  }
};

export const getcommercialserviceproducts = async () => {
  try {
    const response = await api.get('/commercialserviceproducts/');  
    return response.data;
  } catch (error) {
    console.error('Error fetching commercial service products:', error);
    throw error;
  } 
};

// Cart API functions
export const getcarts = async () => {
  try {
    const response = await api.get('/carts/');  
    return response.data;
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  } 
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/carts/', {
      product: productId,
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await api.patch(`/carts/${cartItemId}/`, {
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (cartItemId) => {
  try {
    const response = await api.delete(`/carts/${cartItemId}/`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const cartItems = await getcarts();
    const deletePromises = cartItems.map(item => removeFromCart(item.id));
    await Promise.all(deletePromises);
    return { message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

// Order API functions
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/create-order/', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};
