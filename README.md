# Modern App

A beautiful, modern web application built with React, Vite, and Tailwind CSS. This frontend application is designed to seamlessly integrate with your existing encrypted backend.

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Dashboard**: Real-time analytics and metrics visualization
- **Task Management**: Complete CRUD operations for task management
- **Analytics**: Data visualization with charts and reports
- **Settings**: Comprehensive configuration management
- **Backend Ready**: Easy integration with your encrypted backend
- **Responsive**: Mobile-first design that works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your backend configuration:
   ```env
   REACT_APP_API_URL=https://your-backend.com/api
   REACT_APP_ENCRYPTION_KEY=your-encryption-key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Backend Integration

This application is designed to work with your existing encrypted backend. Here's how to connect it:

### 1. Update API Configuration

Edit `src/services/api.js` to match your backend:

```javascript
// Update the API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend.com/api'

// Add your authentication headers
const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${your-token}`,
    'X-Encryption-Key': 'your-encryption-key',
    // Add any custom headers your backend requires
  }
}

// Implement your decryption logic
async decryptData(encryptedData) {
  // Add your decryption implementation here
  return decryptedData
}
```

### 2. API Endpoints Expected

The app expects these endpoints from your backend:

#### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/activity` - Recent activity feed

#### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

#### Analytics
- `GET /api/analytics?range=7d` - Get analytics data
- `GET /api/analytics/:type?range=7d` - Get specific chart data

#### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings

#### Authentication (Optional)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### 3. Data Formats

The app expects JSON responses in these formats:

```javascript
// Dashboard Stats
{
  "totalUsers": 12543,
  "revenue": 45678,
  "orders": 1234,
  "growth": 12.5
}

// Tasks
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "priority": "high|medium|low",
  "status": "todo|in-progress|completed",
  "dueDate": "2024-01-15",
  "assignee": "John Doe"
}
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

### Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── Dashboard.jsx   # Dashboard page
│   ├── TaskManager.jsx # Task management
│   ├── Analytics.jsx   # Analytics dashboard
│   └── Settings.jsx    # Settings page
├── services/           # API services
│   └── api.js         # Backend API integration
├── App.jsx            # Main app component
├── main.jsx          # App entry point
└── index.css         # Global styles
```

### Customization

#### Styling
The app uses Tailwind CSS. Customize the theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

#### API Service
Update `src/services/api.js` to match your backend's authentication and encryption:

```javascript
// Add custom headers
const getAuthHeaders = () => {
  return {
    'X-Custom-Auth': 'your-auth-method',
    'X-Encryption-Type': 'your-encryption-type'
  }
}

// Implement your encryption/decryption
async decryptData(data) {
  // Your decryption logic
}
```

## 🔒 Security Features

- **Encrypted Communication**: Ready for encrypted backend communication
- **Token-based Authentication**: JWT token support
- **Secure Storage**: Secure token storage
- **API Key Management**: Built-in API key management
- **Session Management**: Configurable session timeouts

## 📱 Mobile Support

The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Progressive Web App (PWA) ready

## 🎨 UI Components

The app includes beautiful, reusable components:
- **Cards**: Clean content containers
- **Buttons**: Primary and secondary button styles
- **Forms**: Styled form inputs and validation
- **Charts**: Simple data visualization
- **Modals**: Overlay dialogs
- **Navigation**: Responsive navigation header

## 🔧 Environment Variables

Create a `.env` file with these variables:

```env
# Required
REACT_APP_API_URL=https://your-backend.com/api

# Optional
REACT_APP_ENCRYPTION_KEY=your-encryption-key
REACT_APP_DEBUG_MODE=false
REACT_APP_ENABLE_ANALYTICS=true
```

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in deployment settings

### Deploy to Custom Server

1. Build the application: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your web server to serve the `index.html` file for all routes

## 🤝 Backend Integration Examples

### Express.js Backend Example

```javascript
// Example API endpoint for your Express.js backend
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  // Your encrypted data logic
  const stats = {
    totalUsers: 12543,
    revenue: 45678,
    orders: 1234,
    growth: 12.5
  }
  
  // Encrypt if needed
  const encryptedStats = encrypt(stats)
  res.json(encryptedStats)
})
```

### Python Flask Backend Example

```python
# Example API endpoint for your Flask backend
@app.route('/api/dashboard/stats')
@require_auth
def get_dashboard_stats():
    stats = {
        'totalUsers': 12543,
        'revenue': 45678,
        'orders': 1234,
        'growth': 12.5
    }
    
    # Encrypt if needed
    encrypted_stats = encrypt_data(stats)
    return jsonify(encrypted_stats)
```

## 📄 License

MIT License - feel free to use this project for your applications.

## 🆘 Support

For backend integration help or customization:

1. Check the API service file: `src/services/api.js`
2. Review the component files for data structure expectations
3. Update environment variables for your backend URL
4. Implement your encryption/decryption logic in the API service

The frontend is ready to work with your encrypted backend - just update the API endpoints and authentication method!