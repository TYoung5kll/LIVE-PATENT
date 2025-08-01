import React, { useState } from 'react'
import { Plus, Send, MessageSquare, Phone, Mail, X, Zap } from 'lucide-react'

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      id: 'send-message',
      name: 'Send Message',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => {
        // You can implement quick message sending here
        console.log('Quick send message')
        setIsOpen(false)
      }
    },
    {
      id: 'send-email',
      name: 'Send Email',
      icon: Mail,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        console.log('Quick send email')
        setIsOpen(false)
      }
    },
    {
      id: 'send-sms',
      name: 'Send SMS',
      icon: MessageSquare,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => {
        console.log('Quick send SMS')
        setIsOpen(false)
      }
    },
    {
      id: 'call',
      name: 'Make Call',
      icon: Phone,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => {
        console.log('Quick call')
        setIsOpen(false)
      }
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={action.id}
                className="flex items-center space-x-3"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {action.name}
                  </span>
                </div>
                <button
                  onClick={action.action}
                  className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center`}
                  title={action.name}
                >
                  <Icon className="w-5 h-5" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        title={isOpen ? 'Close quick actions' : 'Quick actions'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Zap className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default QuickActions