import React, { useState } from 'react'
import { Smartphone, Mail, MessageSquare, Copy, Check } from 'lucide-react'

const MessagePreview = ({ companyName = "ABC Realty", message = "Hi John! Your dream home viewing is scheduled for tomorrow at 2 PM at 123 Oak Street. I'll meet you there with the keys!", recipientName = "John Doe" }) => {
  const [copied, setCopied] = useState(false)
  const [previewType, setPreviewType] = useState('sms') // 'sms' or 'email'

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const emailPreview = `From: noreply@yourdomain.com
Subject: Message from ${companyName}

Message from ${companyName}:

${message}

Best regards,
Your Agent
${companyName}

────────────────────────
Sent via LIVE Messaging Service
Patent by Theodore G. Young Jr`

  const smsPreview = `Message from ${companyName}: ${message}`

  return (
    <div className="space-y-6">
      {/* Preview Type Selector */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setPreviewType('sms')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            previewType === 'sms'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <MessageSquare size={16} />
          <span>SMS Preview</span>
        </button>
        <button
          onClick={() => setPreviewType('email')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            previewType === 'email'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Mail size={16} />
          <span>Email Preview</span>
        </button>
      </div>

      {/* Mobile Phone Mockup */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Phone Frame */}
          <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
              
              {/* Status Bar */}
              <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center text-sm">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  <span className="ml-2">Verizon</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>9:42</span>
                  <span>AM</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-3 border border-white rounded-sm">
                    <div className="w-4 h-1 bg-white rounded-sm m-0.5"></div>
                  </div>
                </div>
              </div>

              {previewType === 'sms' ? (
                // SMS Preview
                <div className="h-full bg-white dark:bg-gray-900">
                  {/* SMS Header */}
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-6 h-6 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Messages</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>

                  {/* SMS Conversation */}
                  <div className="p-4 space-y-4">
                    {/* Received Message */}
                    <div className="flex justify-start">
                      <div className="max-w-xs">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
                          <p className="text-sm text-gray-900 dark:text-white">{smsPreview}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-2">9:42 AM</p>
                      </div>
                    </div>

                    {/* Reply Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">
                        Reply
                      </button>
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Email Preview
                <div className="h-full bg-white dark:bg-gray-900">
                  {/* Email Header */}
                  <div className="bg-red-500 px-4 py-3 text-white">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-6 h-6" />
                      <h3 className="font-semibold">Gmail</h3>
                    </div>
                  </div>

                  {/* Email Content */}
                  <div className="p-4">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Message from {companyName}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">9:42 AM</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">From: noreply@yourdomain.com</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">To: {recipientName.toLowerCase().replace(' ', '.')}@email.com</p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-900 dark:text-white">
                      <p><strong>Message from {companyName}:</strong></p>
                      <p>{message}</p>
                      <div className="pt-4 space-y-1">
                        <p>Best regards,</p>
                        <p>Your Agent</p>
                        <p><strong>{companyName}</strong></p>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                        <p>Sent via LIVE Messaging Service</p>
                        <p>Patent by Theodore G. Young Jr</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
        </div>
      </div>

      {/* Copy Message Button */}
      <div className="text-center">
        <button
          onClick={() => handleCopy(previewType === 'sms' ? smsPreview : emailPreview)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : `Copy ${previewType.toUpperCase()} Text`}</span>
        </button>
      </div>

      {/* Example Variations */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">White-Label Examples:</h4>
        <div className="space-y-2 text-sm">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Real Estate:</strong> "Message from ABC Realty: Your showing is confirmed..."
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Insurance:</strong> "Message from XYZ Insurance: Policy renewal reminder..."
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Car Sales:</strong> "Message from DEF Motors: Your trade-in value is ready..."
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Marketing:</strong> "Message from GHI Agency: Campaign results are in..."
          </p>
        </div>
      </div>
    </div>
  )
}

export default MessagePreview