import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
    baseURL: 'http://localhost:1313/api/v1/', // Replace with your base API URL
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
        // Add other default headers if needed
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Handle response errors here
        console.error('API Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);


// Utility functions for HTTP methods
const axiosUtil = {
    get: async (url, params = {}, config = {}) => {
        try {
            const response = await axiosInstance.get(url, {
                ...config,
                params
            });
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    post: async (url, data = {}, config = {}) => {
        try {
            const response = await axiosInstance.post(url, data, config);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    put: async (url, data = {}, config = {}) => {
        try {
            const response = await axiosInstance.put(url, data, config);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    delete: async (url, config = {}) => {
        try {
            const response = await axiosInstance.delete(url, config);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
};

export default axiosUtil;