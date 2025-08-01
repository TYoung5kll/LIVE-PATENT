import React, { useState, useEffect } from 'react'
import { Save, Shield, Bell, User, Database, Key, Eye, EyeOff } from 'lucide-react'
import apiService from '../services/api'

const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    // Profile settings
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '',
      timezone: 'UTC'
    },
    // Security settings
    security: {
      twoFactorEnabled: false,
      apiKey: 'sk-1234567890abcdef',
      sessionTimeout: 24,
      encryptionEnabled: true
    },
    // Notification settings
    notifications: {
      emailAlerts: true,
      pushNotifications: false,
      weeklyReports: true,
      securityAlerts: true
    },
    // API settings for your encrypted backend
    api: {
      baseUrl: 'https://your-backend.com/api',
      timeout: 30000,
      retryAttempts: 3,
      encryptionKey: ''
    },
    // UI preferences
    preferences: {
      theme: 'light',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    }
  })

  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const fetchSettings = async () => {
    setLoading(true)
    try {
      // Replace with actual API call to your encrypted backend
      // const data = await apiService.getSettings()
      // setSettings(data)
      
      // For now, using mock data
      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      // Replace with actual API call to your encrypted backend
      // await apiService.updateSettings(settings)
      
      // For now, just simulate saving
      setTimeout(() => {
        setUnsavedChanges(false)
        setLoading(false)
        alert('Settings saved successfully!')
      }, 1000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      setLoading(false)
      alert('Failed to save settings. Please try again.')
    }
  }

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
    setUnsavedChanges(true)
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const testConnection = async () => {
    try {
      setLoading(true)
      // Test connection to your encrypted backend
      // const response = await fetch(settings.api.baseUrl + '/health')
      // if (response.ok) {
      //   alert('Connection successful!')
      // } else {
      //   alert('Connection failed!')
      // }
      
      setTimeout(() => {
        alert('Connection test completed!')
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Connection test failed:', error)
      alert('Connection failed!')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={!unsavedChanges || loading}
          className={`btn-primary flex items-center space-x-2 ${
            !unsavedChanges || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Save size={16} />
          <span>{loading ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {unsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            You have unsaved changes. Don't forget to save your settings.
          </p>
        </div>
      )}

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <User className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={settings.profile.name}
                onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={settings.profile.email}
                onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={settings.profile.timezone}
                onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
                className="input"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">Greenwich Mean Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorEnabled}
                  onChange={(e) => updateSetting('security', 'twoFactorEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.security.apiKey}
                  onChange={(e) => updateSetting('security', 'apiKey', e.target.value)}
                  className="input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (hours)</label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                className="input"
                min="1"
                max="168"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive important updates via email' },
              { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
              { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get weekly summary reports' },
              { key: 'securityAlerts', label: 'Security Alerts', description: 'Immediate security notifications' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">{item.label}</label>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key]}
                    onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* API Configuration for your backend */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="text-gray-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Backend API Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
              <input
                type="url"
                value={settings.api.baseUrl}
                onChange={(e) => updateSetting('api', 'baseUrl', e.target.value)}
                className="input"
                placeholder="https://your-backend.com/api"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Timeout (ms)</label>
              <input
                type="number"
                value={settings.api.timeout}
                onChange={(e) => updateSetting('api', 'timeout', parseInt(e.target.value))}
                className="input"
                min="1000"
                max="300000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Encryption Key</label>
              <input
                type="password"
                value={settings.api.encryptionKey}
                onChange={(e) => updateSetting('api', 'encryptionKey', e.target.value)}
                className="input"
                placeholder="Your encryption key"
              />
            </div>
            <button
              onClick={testConnection}
              disabled={loading}
              className="btn-secondary w-full"
            >
              {loading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select
              value={settings.preferences.theme}
              onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
              className="input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={settings.preferences.language}
              onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
              className="input"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
            <select
              value={settings.preferences.dateFormat}
              onChange={(e) => updateSetting('preferences', 'dateFormat', e.target.value)}
              className="input"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => updateSetting('preferences', 'currency', e.target.value)}
              className="input"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>
      </div>

      {/* Backend Integration Note */}
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Key size={20} className="text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-green-900">Backend Integration</h4>
            <p className="text-sm text-green-700 mt-1">
              Configure your encrypted backend connection in the API Configuration section above. 
              Update the <code className="bg-green-100 px-1 rounded">apiService.js</code> file with your 
              authentication method and encryption logic. All settings can be synchronized with your backend 
              through the provided API endpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings