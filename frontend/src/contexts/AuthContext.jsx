import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = apiService.getToken();
        const userData = apiService.getUser();
        
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        apiService.removeToken();
        apiService.removeUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login with password
  const loginWithPassword = async (email, password) => {
    try {
      const response = await apiService.loginPhuHuynh(email, password);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Login with OTP
  const loginWithOTP = async (phone, otp) => {
    try {
      const response = await apiService.loginWithOTP(phone, otp);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await apiService.registerPhuHuynh(userData);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Send OTP for registration
  const sendRegistrationOTP = async (phone) => {
    try {
      const response = await apiService.sendRegistrationOTP(phone);
      return { success: response.success, message: response.message, data: response.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Send OTP for login
  const sendLoginOTP = async (phone) => {
    try {
      const response = await apiService.sendLoginOTP(phone);
      return { success: response.success, message: response.message, data: response.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Send OTP for reset password
  const sendResetPasswordOTP = async (phone) => {
    try {
      const response = await apiService.sendResetPasswordOTP(phone);
      return { success: response.success, message: response.message, data: response.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Reset password
  const resetPassword = async (phone, otp, newPassword) => {
    try {
      const response = await apiService.resetPassword(phone, otp, newPassword);
      return { success: response.success, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout
  const logout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.la_admin === true;
  };

  // Get current user info
  const getCurrentUser = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success) {
        setUser(response.data);
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    loginWithPassword,
    loginWithOTP,
    register,
    sendRegistrationOTP,
    sendLoginOTP,
    sendResetPasswordOTP,
    resetPassword,
    logout,
    isAdmin,
    getCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
