// API Configuration for LIVE Encrypted Messaging Service
// Patent Ownership: Theodore G. Young Jr
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:443/api'

// LIVE service authentication and headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  return {
    'Content-Type': 'application/json',
    'User-Agent': 'LIVE-Dashboard/1.0',
    'X-Service': 'LIVE-Messaging',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    // Add any custom encryption headers for LIVE service
    'X-Encryption-Version': '1.0',
    'X-Patent-Owner': 'Theodore G. Young Jr',
  }
}

class LiveApiService {
  constructor() {
    this.baseUrl = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: getAuthHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`LIVE API error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('LIVE API request failed:', error)
      throw error
    }
  }

  // LIVE Messaging Service - Main API endpoint
  async sendMessage(messageData) {
    const { message, email, phone, method, companyName } = messageData
    
    try {
      const response = await this.request('/send-message', {
        method: 'POST',
        body: JSON.stringify({
          message,
          email,
          phone,
          method, // 'email', 'sms', or 'both'
          companyName // For white-label branding
        }),
      })
      
      return response
    } catch (error) {
      console.error('Failed to send LIVE message:', error)
      throw error
    }
  }

  // Dashboard analytics endpoints (you can add these to your backend)
  async getDashboardStats() {
    try {
      return await this.request('/dashboard/stats')
    } catch (error) {
      // Fallback to mock data if endpoint not implemented yet
      console.warn('Dashboard stats endpoint not available, using mock data')
      return {
        totalMessages: Math.floor(Math.random() * 10000) + 5000,
        emailsSent: Math.floor(Math.random() * 5000) + 2500,
        smsSent: Math.floor(Math.random() * 3000) + 1500,
        successRate: (Math.random() * 10 + 90).toFixed(1)
      }
    }
  }

  async getMessageHistory() {
    try {
      return await this.request('/messages/history')
    } catch (error) {
      console.warn('Message history endpoint not available, using mock data')
      return []
    }
  }

  // Task management endpoints
  async getTasks() {
    try {
      return await this.request('/tasks')
    } catch (error) {
      console.warn('Tasks endpoint not available, using mock data')
      return []
    }
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    })
  }

  async updateTask(taskId, taskData) {
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    })
  }

  async deleteTask(taskId) {
    return this.request(`/tasks/${taskId}`, {
      method: 'DELETE',
    })
  }

  // Analytics endpoints
  async getAnalytics(timeRange = '7d') {
    try {
      return await this.request(`/analytics?range=${timeRange}`)
    } catch (error) {
      console.warn('Analytics endpoint not available, using mock data')
      return {
        chartData: [],
        metrics: {
          totalMessages: Math.floor(Math.random() * 50000) + 10000,
          deliveryRate: (Math.random() * 5 + 95).toFixed(1),
          responseRate: (Math.random() * 20 + 15).toFixed(1),
          avgResponseTime: `${Math.floor(Math.random() * 30) + 5}m`
        }
      }
    }
  }

  // Settings endpoints
  async getSettings() {
    try {
      return await this.request('/settings')
    } catch (error) {
      console.warn('Settings endpoint not available, using defaults')
      return {
        companyName: 'LIVE',
        sendgridKey: '',
        twilioSid: '',
        defaultMethod: 'both'
      }
    }
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }

  // Test connection to LIVE service
  async testConnection() {
    try {
      const response = await fetch(this.baseUrl.replace('/api', '/'), {
        method: 'GET',
        headers: getAuthHeaders()
      })
      return response.ok
    } catch (error) {
      console.error('LIVE connection test failed:', error)
      return false
    }
  }

  // Authentication endpoints (if you add them to your backend)
  async login(credentials) {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
      
      if (response.token) {
        localStorage.setItem('authToken', response.token)
      }
      
      return response
    } catch (error) {
      console.error('LIVE login failed:', error)
      throw error
    }
  }

  async logout() {
    localStorage.removeItem('authToken')
    try {
      return await this.request('/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.warn('Logout endpoint not available')
      return { message: 'Logged out locally' }
    }
  }

  // Utility method to validate HTTPS connection
  validateSecureConnection() {
    const isHttps = this.baseUrl.startsWith('https://')
    if (!isHttps) {
      console.warn('Warning: LIVE service requires HTTPS for encrypted communication')
    }
    return isHttps
  }
}

// Export singleton instance
const liveApiService = new LiveApiService()

// Validate secure connection on initialization
liveApiService.validateSecureConnection()

export default liveApiService