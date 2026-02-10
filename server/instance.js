import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify

// Use direct URL on server, proxied URL on client to avoid CORS
const isServer = typeof window === 'undefined';
export const baseURL = isServer 
  ? "https://cms.partyshope.com/wp-json/wc/v3/" 
  : "/api/wc/";

export const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to display toast notifications
export const showToast = (type, message) => {
  if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  } else if (type === "warning") {
    toast.warning(message);
  } else {
    toast.info(message);
  }
};

export const makeRequest = async (type, path, body, options = {}) => {
  // Add additional parameters if needed
  body = {
    ...body,
  };
  
  const config = {
    timeout: 30000,
    ...options,
  };
  
  try {
    let response;
    
    if (type.toLowerCase() === "get" || type.toLowerCase() === "delete") {
      // For GET and DELETE requests, pass params instead of body
      response = await instance[type](path, { 
        ...config, 
        params: body 
      });
    } else {
      // For POST, PUT, PATCH requests
      response = await instance[type](path, body, config);
    }
    
    return response;
  } catch (error) {
    console.error("API Request Error:", error);
    
    // Handle WooCommerce specific error responses
    if (error.response?.data) {
      const { code, message } = error.response.data;
      
      // Extract and display the appropriate error message
      let errorMessage = message || "An error occurred";
      
      // Show toast notification with the error message
      showToast("error", errorMessage);
      
      // Return error with parsed message for component handling
      return {
        error: true,
        code: code || error.response?.status,
        message: errorMessage,
        data: error.response?.data
      };
    }
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      const timeoutMessage = "Request timed out. Please try again.";
      showToast("error", timeoutMessage);
      return {
        error: true,
        code: 'TIMEOUT',
        message: timeoutMessage
      };
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      const networkMessage = "Network error. Please check your connection.";
      showToast("error", networkMessage);
      return {
        error: true,
        code: 'NETWORK_ERROR',
        message: networkMessage
      };
    }
    
    // Handle any other errors
    showToast("error", "An unexpected error occurred");
    return {
      error: true,
      code: error.code,
      message: error.message || "Unknown error"
    };
  }
};

// Set up request interceptor for authentication
instance.interceptors.request.use(
  (config) => {
    const username = "ck_26d97fd04736d9a6d077b73ff38f1024794d58c9";
    const password = "cs_c376536141d92a1647039e5f19c6deae6265afd2";
    config.auth = {
      username,
      password,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up response interceptor to handle data and errors
instance.interceptors.response.use(
  function (response) {
    // Return full response to preserve headers for pagination
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      showToast("error", "Your session has expired. Please log in again.");
      // Clear user data and redirect to login
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);