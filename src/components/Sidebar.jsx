import React from 'react'
import { 
  Home, 
  MessageSquare, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Zap,
  Shield,
  X
} from 'lucide-react'

const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: Home,
      description: 'Overview & metrics'
    },
    { 
      id: 'messaging', 
      name: 'LIVE Messaging', 
      icon: MessageSquare,
      description: 'Send encrypted messages',
      highlight: true
    },
    { 
      id: 'tasks', 
      name: 'Task Manager', 
      icon: CheckSquare,
      description: 'Manage your tasks'
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: BarChart3,
      description: 'Performance insights'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings,
      description: 'Configure your app'
    },
  ]

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId)
    setSidebarOpen(false) // Close mobile sidebar
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-xl">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">LIVE</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Messaging Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  } ${item.highlight ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
                >
                  <Icon 
                    className={`w-5 h-5 mr-3 transition-colors ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    }`} 
                  />
                  <div className="flex-1">
                    <div className={`font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  {item.highlight && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Bottom Section */}
          <div className="flex-shrink-0 px-4 pb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Encrypted & Secure</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Patent by Theodore G. Young Jr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-xl">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">LIVE</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 mr-3 ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                    }`} 
                  />
                  <div className="flex-1">
                    <div className={`font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>

          {/* Mobile Bottom Section */}
          <div className="flex-shrink-0 px-4 pb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Encrypted</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Secure messaging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar