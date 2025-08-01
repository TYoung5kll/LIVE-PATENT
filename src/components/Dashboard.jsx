import React, { useState, useEffect } from 'react'
import { TrendingUp, Users, ShoppingBag, DollarSign, Activity, ArrowUpRight, ArrowDownRight, MessageSquare, Mail, Send, Zap, BarChart3 } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMessages: 12543,
    emailsSent: 8430,
    smsSent: 4113,
    successRate: 98.5
  })
  
  const [loading, setLoading] = useState(false)

  // API integration point - replace with your backend endpoint
  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Replace this URL with your encrypted backend endpoint
      // const response = await fetch('/api/dashboard/stats', {
      //   headers: {
      //     'Authorization': `Bearer ${yourToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // })
      // const data = await response.json()
      // setStats(data)
      
      // For now, using mock data - remove this when connecting to your backend
      setTimeout(() => {
        setStats({
          totalMessages: Math.floor(Math.random() * 20000) + 10000,
          emailsSent: Math.floor(Math.random() * 15000) + 7000,
          smsSent: Math.floor(Math.random() * 8000) + 3000,
          successRate: (Math.random() * 5 + 95).toFixed(1)
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Total Messages',
      value: stats.totalMessages.toLocaleString(),
      icon: MessageSquare,
      change: '+12%',
      changeType: 'positive',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Emails Sent',
      value: stats.emailsSent.toLocaleString(),
      icon: Mail,
      change: '+8.5%',
      changeType: 'positive',
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'SMS Sent',
      value: stats.smsSent.toLocaleString(),
      icon: Send,
      change: '+15.2%',
      changeType: 'positive',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      change: '+0.8%',
      changeType: 'positive',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Sent branded email', time: '2 minutes ago', status: 'success', company: 'ABC Realty' },
    { id: 2, user: 'Sarah Smith', action: 'SMS campaign launched', time: '5 minutes ago', status: 'success', company: 'XYZ Insurance' },
    { id: 3, user: 'Mike Johnson', action: 'Bulk message sent', time: '10 minutes ago', status: 'success', company: 'DEF Motors' },
    { id: 4, user: 'Emma Wilson', action: 'Email template created', time: '15 minutes ago', status: 'pending', company: 'GHI Consulting' },
    { id: 5, user: 'David Brown', action: 'SMS delivery confirmed', time: '20 minutes ago', status: 'success', company: 'JKL Services' }
  ]

  const quickActions = [
    { title: 'Send Message', icon: Send, color: 'blue', action: () => console.log('Quick send') },
    { title: 'Create Template', icon: Mail, color: 'green', action: () => console.log('Create template') },
    { title: 'View Analytics', icon: Activity, color: 'purple', action: () => console.log('View analytics') },
    { title: 'Manage Contacts', icon: Users, color: 'orange', action: () => console.log('Manage contacts') }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white relative">
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome back!</h1>
                <p className="text-blue-100 text-lg">Your LIVE messaging dashboard is ready</p>
              </div>
            </div>
            <p className="text-blue-100 max-w-2xl">
              Monitor your encrypted messaging performance, track delivery rates, and manage your white-label communications all in one place.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card-interactive group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:shadow-xl transition-all duration-200`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {loading ? '...' : stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs last month</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-${action.color}-300 dark:hover:border-${action.color}-600 hover:bg-${action.color}-50 dark:hover:bg-${action.color}-900/20 transition-all duration-200 group text-center`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-${action.color}-600 dark:group-hover:text-${action.color}-400 transition-colors`} />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    {action.title}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                  activity.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                }`}>
                  <Activity size={16} className={
                    activity.status === 'success' ? 'text-green-600 dark:text-green-400' :
                    activity.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.user}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{activity.company}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    activity.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid - Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Message Performance</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Chart visualization coming soon</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Connect to analytics endpoint</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900 dark:text-white">LIVE Service</span>
              </div>
              <span className="badge-green">Online</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900 dark:text-white">Email Service</span>
              </div>
              <span className="badge-green">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900 dark:text-white">SMS Service</span>
              </div>
              <span className="badge-green">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-gray-900 dark:text-white">SSL Certificate</span>
              </div>
              <span className="badge-blue">Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard