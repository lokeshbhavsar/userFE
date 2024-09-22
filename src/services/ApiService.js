import { BACKEND_PORT } from '@/utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: BACKEND_PORT,
  headers: {
    'Content-Type': 'application/json', // Default Content-Type
  },
});

// Request interceptor to include authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const ApiService = {
  get: (url, params = {}) => {
    return api.get(url, { params });
  },

  post: (url, data, config = {}) => {
    return api.post(url, data, config);
  },

  put: (url, data, config = {}) => {
    return api.put(url, data, config);
  },

  delete: (url, config = {}) => {
    return api.delete(url, config);
  },
};

// Generic function for API requests
const apiRequest = async (method, url, data = {}) => {
  try {
    // Handle FormData: if the data is an instance of FormData, adjust the headers
    const config = {};
    if (data instanceof FormData) {
      // Remove the default Content-Type to let Axios set the boundary automatically
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }

    // Send the request using the appropriate method
    const response = await ApiService[method](url, data, config);
    return response;
  } catch (error) {
    if(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
  
    console.error(`Error in ${method.toUpperCase()} request to ${url}`, error);
    // It's a good practice to return or throw the error so the calling function can handle it
  }
};

export default apiRequest;
