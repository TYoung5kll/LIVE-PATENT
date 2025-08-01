import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, PieChart, Calendar, Download, RefreshCw } from 'lucide-react'
import apiService from '../services/api'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState({
    chartData: [],
    metrics: {
      totalViews: 15420,
      uniqueUsers: 3240,
      conversionRate: 12.5,
      avgSessionTime: '3m 45s'
    }
  })

  // Mock chart data - replace with actual API call to your backend
  const mockChartData = {
    '7d': [
      { date: '2024-01-08', views: 1200, users: 320, conversions: 45 },
      { date: '2024-01-09', views: 1450, users: 380, conversions: 52 },
      { date: '2024-01-10', views: 1100, users: 290, conversions: 38 },
      { date: '2024-01-11', views: 1680, users: 420, conversions: 67 },
      { date: '2024-01-12', views: 1890, users: 480, conversions: 78 },
      { date: '2024-01-13', views: 2100, users: 520, conversions: 89 },
      { date: '2024-01-14', views: 1950, users: 495, conversions: 82 }
    ],
    '30d': [
      { date: 'Week 1', views: 8500, users: 2100, conversions: 285 },
      { date: 'Week 2', views: 9200, users: 2350, conversions: 315 },
      { date: 'Week 3', views: 8800, users: 2200, conversions: 298 },
      { date: 'Week 4', views: 10100, users: 2650, conversions: 342 }
    ]
  }

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Replace with actual API call to your encrypted backend
      // const data = await apiService.getAnalytics(timeRange)
      // const chartData = await apiService.getChartData('views', timeRange)
      // setAnalyticsData({ ...data, chartData })
      
      // For now, using mock data
      setTimeout(() => {
        setAnalyticsData({
          chartData: mockChartData[timeRange] || mockChartData['7d'],
          metrics: {
            totalViews: Math.floor(Math.random() * 50000) + 10000,
            uniqueUsers: Math.floor(Math.random() * 10000) + 2000,
            conversionRate: (Math.random() * 20 + 5).toFixed(1),
            avgSessionTime: `${Math.floor(Math.random() * 5) + 2}m ${Math.floor(Math.random() * 60)}s`
          }
        })
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const exportData = () => {
    // Add your data export logic here
    console.log('Exporting analytics data...')
    // You can integrate with your backend's export API endpoint
  }

  const metrics = [
    {
      title: 'Total Views',
      value: analyticsData.metrics.totalViews.toLocaleString(),
      icon: BarChart3,
      change: '+12.5%',
      changeType: 'positive',
      color: 'blue'
    },
    {
      title: 'Unique Users',
      value: analyticsData.metrics.uniqueUsers.toLocaleString(),
      icon: TrendingUp,
      change: '+8.2%',
      changeType: 'positive',
      color: 'green'
    },
    {
      title: 'Conversion Rate',
      value: `${analyticsData.metrics.conversionRate}%`,
      icon: PieChart,
      change: '+2.1%',
      changeType: 'positive',
      color: 'purple'
    },
    {
      title: 'Avg. Session Time',
      value: analyticsData.metrics.avgSessionTime,
      icon: Calendar,
      change: '-0.5%',
      changeType: 'negative',
      color: 'orange'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input w-auto"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="btn-secondary flex items-center space-x-2"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportData}
            className="btn-primary flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {loading ? '...' : metric.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  metric.color === 'blue' ? 'bg-blue-100' :
                  metric.color === 'green' ? 'bg-green-100' :
                  metric.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <Icon size={24} className={
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  } />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-gray-500 text-sm ml-1">vs last period</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views Trend</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="h-64">
              {/* Simple bar chart visualization */}
              <div className="flex items-end justify-between h-full space-x-2 px-4 py-4">
                {analyticsData.chartData.map((data, index) => {
                  const maxValue = Math.max(...analyticsData.chartData.map(d => d.views))
                  const height = (data.views / maxValue) * 200
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-primary-500 rounded-t transition-all duration-500 w-full"
                        style={{ height: `${height}px` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                        {data.date.slice(-5)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Users Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="h-64">
              {/* Simple line chart visualization */}
              <div className="flex items-end justify-between h-full space-x-2 px-4 py-4">
                {analyticsData.chartData.map((data, index) => {
                  const maxValue = Math.max(...analyticsData.chartData.map(d => d.users))
                  const height = (data.users / maxValue) * 200
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-green-500 rounded-full transition-all duration-500"
                        style={{ 
                          height: `${height}px`,
                          width: '8px'
                        }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                        {data.date.slice(-5)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analytics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Users</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Rate</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.chartData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{data.date}</td>
                  <td className="py-3 px-4 text-gray-600">{data.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{data.users.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{data.conversions}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">
                      {((data.conversions / data.users) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backend Integration Note */}
      <div className="card bg-purple-50 border-purple-200">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart3 size={20} className="text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-purple-900">Analytics Integration</h4>
            <p className="text-sm text-purple-700 mt-1">
              Connect this analytics dashboard to your encrypted backend by updating the API endpoints in 
              <code className="bg-purple-100 px-1 rounded ml-1">fetchAnalytics</code> and 
              <code className="bg-purple-100 px-1 rounded ml-1">exportData</code> functions.
              Your backend can provide real-time analytics data, custom metrics, and advanced chart data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics