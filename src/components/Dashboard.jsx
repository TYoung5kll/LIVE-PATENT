import React, { useState, useEffect } from 'react'
import { TrendingUp, Users, ShoppingBag, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 12543,
    revenue: 45678,
    orders: 1234,
    growth: 12.5
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
          totalUsers: Math.floor(Math.random() * 20000) + 10000,
          revenue: Math.floor(Math.random() * 100000) + 40000,
          orders: Math.floor(Math.random() * 2000) + 1000,
          growth: (Math.random() * 20 - 5).toFixed(1)
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
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive',
      color: 'blue'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      change: `${stats.growth}%`,
      changeType: stats.growth > 0 ? 'positive' : 'negative',
      color: 'green'
    },
    {
      title: 'Orders',
      value: stats.orders.toLocaleString(),
      icon: ShoppingBag,
      change: '+8%',
      changeType: 'positive',
      color: 'purple'
    },
    {
      title: 'Growth Rate',
      value: `${stats.growth}%`,
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'positive',
      color: 'orange'
    }
  ]

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Completed purchase', time: '2 minutes ago', amount: '$125.00' },
    { id: 2, user: 'Sarah Smith', action: 'Created account', time: '5 minutes ago', amount: null },
    { id: 3, user: 'Mike Johnson', action: 'Updated profile', time: '10 minutes ago', amount: null },
    { id: 4, user: 'Emma Wilson', action: 'Completed purchase', time: '15 minutes ago', amount: '$89.50' },
    { id: 5, user: 'David Brown', action: 'Left review', time: '20 minutes ago', amount: null }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-primary-100">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? '...' : stat.value}
                  </p>
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
              <div className="flex items-center mt-4">
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight size={16} className="text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="btn-primary w-full">Create New Task</button>
            <button className="btn-secondary w-full">Generate Report</button>
            <button className="btn-secondary w-full">Sync Data</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Activity size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="text-sm font-medium text-gray-900">{activity.amount}</p>
                  )}
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Integration Note */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Activity size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Backend Integration Ready</h4>
            <p className="text-sm text-blue-700 mt-1">
              This dashboard is ready to connect to your encrypted backend. 
              Update the API endpoints in the <code className="bg-blue-100 px-1 rounded">fetchDashboardData</code> function 
              to start receiving real data from your backend services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard