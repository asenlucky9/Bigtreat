const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getProfile(token) {
    return this.request('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateProfile(updates, token) {
    return this.request('/auth/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }

  // Services endpoints
  async getServices() {
    return this.request('/services');
  }

  async getService(id) {
    return this.request(`/services/${id}`);
  }

  async getServicesByCategory(category) {
    return this.request(`/services/category/${category}`);
  }

  // Gallery endpoints
  async getGallery() {
    return this.request('/gallery');
  }

  async getGalleryItem(id) {
    return this.request(`/gallery/${id}`);
  }

  async getGalleryByCategory(category) {
    return this.request(`/gallery/category/${category}`);
  }

  // Contact endpoints
  async submitContact(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async getContacts(token) {
    return this.request('/contact', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getContact(id, token) {
    return this.request(`/contact/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateContact(id, updates, token) {
    return this.request(`/contact/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }

  async deleteContact(id, token) {
    return this.request(`/contact/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Booking endpoints
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings(token) {
    return this.request('/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getBooking(id, token) {
    return this.request(`/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getCustomerBookings(email, token) {
    return this.request(`/bookings/customer/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateBooking(id, updates, token) {
    return this.request(`/bookings/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }

  async deleteBooking(id, token) {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Mock data endpoints (for development)
  async getMockServices() {
    return this.request('/mock/services');
  }

  async getMockGallery() {
    return this.request('/mock/gallery');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 