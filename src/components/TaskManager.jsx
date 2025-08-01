import React, { useState, useEffect } from 'react'
import { Plus, Search, Filter, MoreHorizontal, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react'
import apiService from '../services/api'

const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  })

  // Mock data - replace with actual API call to your backend
  const mockTasks = [
    { id: 1, title: 'Complete project proposal', description: 'Write and review the Q4 project proposal', priority: 'high', status: 'in-progress', dueDate: '2024-01-15', assignee: 'John Doe' },
    { id: 2, title: 'Update documentation', description: 'Update API documentation with new endpoints', priority: 'medium', status: 'todo', dueDate: '2024-01-20', assignee: 'Sarah Smith' },
    { id: 3, title: 'Fix login bug', description: 'Resolve authentication issue on mobile app', priority: 'high', status: 'completed', dueDate: '2024-01-10', assignee: 'Mike Johnson' },
    { id: 4, title: 'Design new dashboard', description: 'Create mockups for the new analytics dashboard', priority: 'low', status: 'todo', dueDate: '2024-01-25', assignee: 'Emma Wilson' },
    { id: 5, title: 'Database optimization', description: 'Optimize queries for better performance', priority: 'medium', status: 'in-progress', dueDate: '2024-01-18', assignee: 'David Brown' }
  ]

  const fetchTasks = async () => {
    setLoading(true)
    try {
      // Replace with actual API call to your encrypted backend
      // const data = await apiService.getTasks()
      // setTasks(data)
      
      // For now, using mock data
      setTimeout(() => {
        setTasks(mockTasks)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      setTasks(mockTasks) // Fallback to mock data
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      // Replace with actual API call to your encrypted backend
      // const createdTask = await apiService.createTask(newTask)
      
      // For now, adding to local state
      const createdTask = {
        id: Date.now(),
        ...newTask,
        dueDate: new Date().toISOString().split('T')[0],
        assignee: 'Current User'
      }
      
      setTasks([createdTask, ...tasks])
      setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' })
      setShowAddTask(false)
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      // Replace with actual API call to your encrypted backend
      // await apiService.updateTask(taskId, { status: newStatus })
      
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      // Replace with actual API call to your encrypted backend
      // await apiService.deleteTask(taskId)
      
      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />
      case 'in-progress': return <Clock className="text-blue-500" size={20} />
      case 'todo': return <Circle className="text-gray-400" size={20} />
      default: return <Circle className="text-gray-400" size={20} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-600">Manage and track your team's tasks</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: tasks.length, color: 'blue' },
          { label: 'To Do', value: tasks.filter(t => t.status === 'todo').length, color: 'gray' },
          { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'yellow' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'green' }
        ].map((stat, index) => (
          <div key={index} className="card text-center">
            <div className={`text-2xl font-bold ${
              stat.color === 'blue' ? 'text-blue-600' :
              stat.color === 'gray' ? 'text-gray-600' :
              stat.color === 'yellow' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Task List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading tasks...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleUpdateTaskStatus(
                      task.id, 
                      task.status === 'completed' ? 'todo' : 'completed'
                    )}
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                      <span className="text-xs text-gray-500">Assignee: {task.assignee}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="input"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="input"
                  rows="3"
                  placeholder="Enter task description"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">Create Task</button>
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskManager