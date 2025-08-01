import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import TaskManager from './components/TaskManager'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import LiveMessaging from './components/LiveMessaging'
import QuickActions from './components/QuickActions'
import Presentation from './components/Presentation'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'messaging':
        return <LiveMessaging />
      case 'tasks':
        return <TaskManager />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      case 'presentation':
        return <Presentation />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <TopBar 
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        {/* Page Content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in">
              {renderPage()}
            </div>
          </div>
        </main>
      </div>

      {/* Quick Actions Floating Button */}
      <QuickActions />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default App