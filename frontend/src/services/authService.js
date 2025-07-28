import api from '../api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthService {
  /**
   * Login user
   * @param {object} credentials - Email and password
   * @returns {Promise} - API response
   */
  async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Register new user
   * @param {object} userData - User registration data
   * @returns {Promise} - API response
   */
  async register(userData) {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Logout user
   * @returns {Promise} - API response
   */
  async logout() {
    try {
      const response = await api.post('/api/auth/logout');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Verify token
   * @returns {Promise} - API response
   */
  async verifyToken() {
    try {
      const response = await api.get('/api/auth/verify');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current user profile
   * @returns {Promise} - API response
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update user profile
   * @param {object} profileData - Profile data to update
   * @returns {Promise} - API response
   */
  async updateProfile(profileData) {
    try {
      const response = await api.put('/api/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Change password
   * @param {object} passwordData - Current and new password
   * @returns {Promise} - API response
   */
  async changePassword(passwordData) {
    try {
      const response = await api.put('/api/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise} - API response
   */
  async requestPasswordReset(email) {
    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Reset password with token
   * @param {object} resetData - Reset token and new password
   * @returns {Promise} - API response
   */
  async resetPassword(resetData) {
    try {
      const response = await api.post('/api/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {object} error - Error object
   * @returns {Error} - Formatted error
   */
  handleError(error) {
    if (error.response?.data?.msg) {
      return new Error(error.response.data.msg);
    }
    
    if (error.message) {
      return new Error(error.message);
    }
    
    return new Error('An unexpected error occurred');
  }
}

// Export singleton instance
export default new AuthService();
