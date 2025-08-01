import React, { useState, useEffect } from 'react'
import { Send, Mail, MessageSquare, Users, CheckCircle, AlertCircle, Settings, Shield, Eye } from 'lucide-react'
import liveApiService from '../services/api'
import MessagePreview from './MessagePreview'

const LiveMessaging = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState('both')
  const [companyName, setCompanyName] = useState('LIVE')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [messageHistory, setMessageHistory] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [stats, setStats] = useState({
    totalMessages: 0,
    emailsSent: 0,
    smsSent: 0,
    successRate: 0
  })

  useEffect(() => {
    fetchDashboardStats()
    fetchMessageHistory()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const data = await liveApiService.getDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch LIVE stats:', error)
    }
  }

  const fetchMessageHistory = async () => {
    try {
      const history = await liveApiService.getMessageHistory()
      setMessageHistory(history)
    } catch (error) {
      console.error('Failed to fetch message history:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await liveApiService.sendMessage({
        message,
        email: method === 'email' || method === 'both' ? email : null,
        phone: method === 'sms' || method === 'both' ? phone : null,
        method,
        companyName
      })

      setResult({
        type: 'success',
        message: response.message || 'Message sent successfully!'
      })

      // Clear form after successful send
      setMessage('')
      setEmail('')
      setPhone('')
      
      // Refresh stats and history
      fetchDashboardStats()
      fetchMessageHistory()

    } catch (error) {
      setResult({
        type: 'error',
        message: 'Failed to send message. Please check your connection and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    try {
      const isConnected = await liveApiService.testConnection()
      setResult({
        type: isConnected ? 'success' : 'error',
        message: isConnected ? 'LIVE service connection successful!' : 'Connection failed. Check your HTTPS configuration.'
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'Connection test failed'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">LIVE Messaging</h1>
          <p className="text-gray-600">Encrypted SMS and Email Messaging Service</p>
          <p className="text-xs text-gray-500 mt-1">Patent Owner: Theodore G. Young Jr</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Eye size={16} />
            <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>
          <button
            onClick={testConnection}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <Shield size={16} />
            <span>{loading ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Messages',
            value: stats.totalMessages.toLocaleString(),
            icon: MessageSquare,
            color: 'blue'
          },
          {
            title: 'Emails Sent',
            value: stats.emailsSent.toLocaleString(),
            icon: Mail,
            color: 'green'
          },
          {
            title: 'SMS Sent',
            value: stats.smsSent.toLocaleString(),
            icon: Users,
            color: 'purple'
          },
          {
            title: 'Success Rate',
            value: `${stats.successRate}%`,
            icon: CheckCircle,
            color: 'orange'
          }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <Icon size={24} className={
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  } />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Result Message */}
      {result && (
        <div className={`p-4 rounded-lg ${
          result.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {result.type === 'success' ? (
              <CheckCircle size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            <span>{result.message}</span>
          </div>
        </div>
      )}

      {/* Message Preview */}
      {showPreview && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">📱 Mobile Preview</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            See exactly how your message will appear on recipient's phone
          </p>
          <MessagePreview 
            companyName={companyName || "Your Company"} 
            message={message || "Hi! This is a preview of how your message will look on mobile devices."}
            recipientName="John Doe"
          />
        </div>
      )}

      {/* Messaging Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h3>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (White Label)</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="input"
                placeholder="Your Company Name"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Messages will be labeled "Message from {companyName}"</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input"
                rows="4"
                placeholder="Enter your message..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="recipient@example.com"
                  disabled={method === 'sms'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                  placeholder="+1234567890"
                  disabled={method === 'email'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="input"
              >
                <option value="both">Email & SMS</option>
                <option value="email">Email Only</option>
                <option value="sms">SMS Only</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full flex items-center justify-center space-x-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Send size={16} />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Security & Features Info */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Features</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle size={16} />
                <span>HTTPS Encrypted</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle size={16} />
                <span>SSL Certificate</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle size={16} />
                <span>Hidden Encryption Keys</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle size={16} />
                <span>No Payload Logging</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">White Label Branding</h3>
            <p className="text-sm text-gray-600 mb-2">
              Perfect for agents, brands, and franchises who want their messages to appear from their company.
            </p>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800">
                Example: "Message from {companyName}: {message.slice(0, 30)}{message.length > 30 ? '...' : ''}"
              </p>
            </div>
          </div>

          <div className="card bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Patent Protection</h3>
            <p className="text-xs text-gray-600">
              LIVE - Instant Messaging with Brand-Specific Labeling & Encryption
            </p>
            <p className="text-xs text-gray-500 mt-1">
              U.S. Patent Pending - Theodore G. Young Jr
            </p>
          </div>
        </div>
      </div>

      {/* HTTPS Configuration Note */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">HTTPS Configuration</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your LIVE backend is configured for HTTPS on port 443 with SSL certificates. 
              Make sure your SSL certificates are properly installed in the <code className="bg-blue-100 px-1 rounded">/ssl</code> directory:
            </p>
            <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
              <li><code className="bg-blue-100 px-1 rounded">ssl/key.pem</code> - Private key file</li>
              <li><code className="bg-blue-100 px-1 rounded">ssl/cert.pem</code> - Certificate file</li>
            </ul>
            <p className="text-sm text-blue-700 mt-2">
              Update the <code className="bg-blue-100 px-1 rounded">REACT_APP_API_URL</code> environment variable 
              to point to your HTTPS domain.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveMessaging