// API Configuration for your encrypted backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

// Add your authentication token/headers here
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken') // or however you store your token
  return {
    'Content-Type': 'application/json',
    // Add your custom authentication headers here
    ...(token && { 'Authorization': `Bearer ${token}` }),
    // Add any custom encryption headers your backend requires
    // 'X-Encryption-Key': 'your-encryption-key',
    // 'X-Client-ID': 'your-client-id',
  }
}

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: getAuthHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // If your backend returns encrypted data, decrypt it here
      // const decryptedData = await this.decryptData(data)
      // return decryptedData
      
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Add your decryption logic here if needed
  async decryptData(encryptedData) {
    // Implement your decryption logic
    // return decryptedData
    return encryptedData
  }

  // Dashboard APIs
  async getDashboardStats() {
    return this.request('/dashboard/stats')
  }

  async getDashboardActivity() {
    return this.request('/dashboard/activity')
  }

  // Task APIs
  async getTasks() {
    return this.request('/tasks')
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

  // Analytics APIs
  async getAnalytics(timeRange = '7d') {
    return this.request(`/analytics?range=${timeRange}`)
  }

  async getChartData(chartType, timeRange = '7d') {
    return this.request(`/analytics/${chartType}?range=${timeRange}`)
  }

  // Settings APIs
  async getSettings() {
    return this.request('/settings')
  }

  async updateSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }

  // Authentication APIs (if needed)
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }
    
    return response
  }

  async logout() {
    localStorage.removeItem('authToken')
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }
}

export default new ApiService()