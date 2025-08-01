import React, { useState, useEffect } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Zap, 
  Shield, 
  MessageSquare, 
  Mail, 
  Phone,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Award,
  Globe,
  Lock,
  Eye,
  Copy,
  Download
} from 'lucide-react'
import MessagePreview from './MessagePreview'

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [showNotes, setShowNotes] = useState(false)

  const slides = [
    // Title Slide
    {
      id: 'title',
      title: 'LIVE Messaging Service',
      subtitle: 'Encrypted SMS & Email with White-Label Branding',
      content: (
        <div className="text-center space-y-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
            <Zap className="w-16 h-16 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gradient">LIVE</h1>
            <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">Messaging Service</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Instant encrypted messaging with brand-specific labeling for businesses
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Patent Pending</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Theodore G. Young Jr</p>
          </div>
        </div>
      ),
      notes: "Welcome to LIVE - the revolutionary messaging service that puts your brand first while maintaining enterprise-level security."
    },
    
    // Problem Statement
    {
      id: 'problem',
      title: 'The Problem',
      subtitle: 'Current messaging solutions lack brand identity',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400">❌ Current Issues:</h3>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-300">Generic Messaging</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">Messages appear from random numbers or generic email addresses</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-300">No Brand Identity</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">Customers can't identify who the message is from</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-300">Security Concerns</h4>
                  <p className="text-sm text-red-700 dark:text-red-400">Unencrypted communications expose sensitive data</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">📱 Example:</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
                    <p className="text-sm text-gray-600 dark:text-gray-400">From: +1234567890</p>
                    <p className="text-gray-900 dark:text-white">Your appointment is confirmed for 2 PM.</p>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">❓ Customer thinks: "Who is this? What appointment?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      notes: "Traditional messaging lacks brand identity, creating confusion and missed opportunities for businesses."
    },

    // Solution Overview
    {
      id: 'solution',
      title: 'The LIVE Solution',
      subtitle: 'White-label messaging with enterprise security',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Brand-First Messaging</h3>
                <p className="text-gray-600 dark:text-gray-400">Your company name in every message</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-interactive text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">White-Label SMS</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                "Message from ABC Realty: Your viewing is confirmed..."
              </p>
            </div>
            
            <div className="card-interactive text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Branded Email</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional emails with your company branding
              </p>
            </div>
            
            <div className="card-interactive text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Enterprise Security</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                HTTPS encryption with SSL certificates
              </p>
            </div>
          </div>
        </div>
      ),
      notes: "LIVE transforms generic messaging into branded communications while maintaining enterprise-level security."
    },

    // Live Demo
    {
      id: 'demo',
      title: 'Live Demo',
      subtitle: 'See how messages appear on mobile devices',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">📱 Mobile Preview</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Real-time preview of how your branded messages appear to customers
            </p>
          </div>
          <MessagePreview 
            companyName="ABC Realty" 
            message="Hi John! Your dream home viewing is scheduled for tomorrow at 2 PM at 123 Oak Street. I'll meet you there with the keys!"
            recipientName="John Doe"
          />
        </div>
      ),
      notes: "Live demonstration showing exactly how branded messages appear on customer devices."
    },

    // Features
    {
      id: 'features',
      title: 'Key Features',
      subtitle: 'Everything you need for professional messaging',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Instant Delivery', desc: 'Real-time message delivery via SMS and email', color: 'blue' },
              { icon: Shield, title: 'Encrypted Security', desc: 'HTTPS encryption with SSL certificates', color: 'green' },
              { icon: Users, title: 'White-Label Branding', desc: 'Your company name in every message', color: 'purple' },
              { icon: Globe, title: 'Dual Delivery', desc: 'Send via SMS, email, or both simultaneously', color: 'orange' },
              { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'Track delivery rates and performance', color: 'pink' },
              { icon: Lock, title: 'No Payload Logging', desc: 'Secure communication without data retention', color: 'indigo' }
            ].map((feature, index) => (
              <div key={index} className="card-interactive text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  feature.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50' :
                  feature.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50' :
                  feature.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50' :
                  feature.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50' :
                  feature.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50' :
                  'bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50'
                }`}>
                  <feature.icon className={`w-8 h-8 ${
                    feature.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    feature.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    feature.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                    feature.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                    feature.color === 'pink' ? 'text-pink-600 dark:text-pink-400' :
                    'text-indigo-600 dark:text-indigo-400'
                  }`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      notes: "Comprehensive feature set designed for professional business communications with security as a priority."
    },

    // Use Cases
    {
      id: 'use-cases',
      title: 'Perfect For',
      subtitle: 'Industries that benefit from branded messaging',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                industry: 'Real Estate',
                icon: '🏠',
                examples: [
                  'Property viewing confirmations',
                  'Market updates and listings',
                  'Closing date reminders',
                  'Client follow-ups'
                ],
                sample: 'Message from Sunset Realty: Your 3 PM showing at 456 Oak Street is confirmed!'
              },
              {
                industry: 'Insurance',
                icon: '🛡️',
                examples: [
                  'Policy renewal reminders',
                  'Claims status updates',
                  'Rate change notifications',
                  'Appointment scheduling'
                ],
                sample: 'Message from SecureLife Insurance: Great news! Found you a policy that saves $400/year!'
              },
              {
                industry: 'Automotive',
                icon: '🚗',
                examples: [
                  'Service appointment reminders',
                  'Vehicle ready notifications',
                  'Special offers and promotions',
                  'Trade-in value updates'
                ],
                sample: 'Message from ABC Motors: Your 2024 Honda is now $2000 off! Deal ends Friday.'
              },
              {
                industry: 'Marketing Agencies',
                icon: '📊',
                examples: [
                  'Campaign performance updates',
                  'Client meeting reminders',
                  'Project milestone notifications',
                  'ROI reports delivery'
                ],
                sample: 'Message from Digital Pro Agency: Your website traffic increased 150% this month!'
              }
            ].map((useCase, index) => (
              <div key={index} className="card space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{useCase.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{useCase.industry}</h3>
                </div>
                <ul className="space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">Example:</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">"{useCase.sample}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      notes: "LIVE serves multiple industries where branded communication builds trust and improves customer relationships."
    },

    // Technical Architecture
    {
      id: 'architecture',
      title: 'Technical Architecture',
      subtitle: 'Enterprise-grade infrastructure',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">🏗️ System Architecture</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Frontend Dashboard</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <p className="font-medium text-blue-800 dark:text-blue-200">React + Vite</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Modern, responsive interface</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <p className="font-medium text-blue-800 dark:text-blue-200">Tailwind CSS</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Beautiful, consistent styling</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <p className="font-medium text-blue-800 dark:text-blue-200">Dark Mode</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Full theme support</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Backend Services</h4>
              <div className="space-y-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <p className="font-medium text-green-800 dark:text-green-200">Node.js + Express</p>
                  <p className="text-sm text-green-700 dark:text-green-300">High-performance server</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <p className="font-medium text-green-800 dark:text-green-200">HTTPS/SSL</p>
                  <p className="text-sm text-green-700 dark:text-green-300">End-to-end encryption</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <p className="font-medium text-green-800 dark:text-green-200">Port 443</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Standard HTTPS port</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Integration APIs</h4>
              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                  <p className="font-medium text-purple-800 dark:text-purple-200">SendGrid</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Professional email delivery</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                  <p className="font-medium text-purple-800 dark:text-purple-200">Twilio</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Reliable SMS delivery</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                  <p className="font-medium text-purple-800 dark:text-purple-200">RESTful APIs</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">Easy integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      notes: "Built on proven technologies with enterprise-grade security and scalability in mind."
    },

    // Pricing & ROI
    {
      id: 'pricing',
      title: 'Investment & ROI',
      subtitle: 'Affordable solution with measurable returns',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">💰 Cost Breakdown</h3>
              <div className="space-y-4">
                <div className="card bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Free Tier</h4>
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-green-700 dark:text-green-300">📧 SendGrid: 100 emails/day</p>
                    <p className="text-sm text-green-700 dark:text-green-300">📱 Twilio: $15 trial credit</p>
                    <p className="text-sm text-green-700 dark:text-green-300">🌐 Hosting: $5-10/month</p>
                  </div>
                </div>
                <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Production Scale</h4>
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-blue-700 dark:text-blue-300">📧 40,000 emails: $14.95/month</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">📱 SMS: $0.0075 per message</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">🔒 SSL: Free (Let's Encrypt)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">📈 ROI Benefits</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Response Rate', improvement: '+40%', desc: 'Branded messages get higher response rates' },
                  { metric: 'Brand Recognition', improvement: '+85%', desc: 'Customers know who is messaging them' },
                  { metric: 'Trust Factor', improvement: '+60%', desc: 'Professional appearance builds confidence' },
                  { metric: 'Conversion Rate', improvement: '+25%', desc: 'Better engagement leads to more sales' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{benefit.improvement}</div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{benefit.metric}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      notes: "LIVE provides exceptional ROI through improved customer engagement and brand recognition."
    },

    // Getting Started
    {
      id: 'getting-started',
      title: 'Get Started Today',
      subtitle: 'Simple setup in under 30 minutes',
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">🚀 Quick Setup Process</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Get API Keys', desc: 'Sign up for SendGrid & Twilio (free tiers available)', time: '15 min' },
              { step: '2', title: 'Run Setup', desc: 'Execute our automated setup script', time: '5 min' },
              { step: '3', title: 'Configure', desc: 'Add your credentials to environment file', time: '5 min' },
              { step: '4', title: 'Launch', desc: 'Start sending branded messages immediately', time: '5 min' }
            ].map((step, index) => (
              <div key={index} className="card-interactive text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{step.desc}</p>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                  {step.time}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Messaging?</h3>
              <p className="text-lg text-blue-100 mb-6">
                Join businesses already using LIVE for branded communications
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      notes: "Simple onboarding process gets businesses up and running with branded messaging in under 30 minutes."
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    let interval
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
      }, 10000) // 10 seconds per slide
    }
    return () => clearInterval(interval)
  }, [isAutoPlay, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Presentation Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">LIVE Presentation</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Presentation Area */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Slide Content */}
          <div className="aspect-video p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {slides[currentSlide].title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Speaker Notes */}
        {showNotes && (
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">📝 Speaker Notes</h3>
            <p className="text-yellow-700 dark:text-yellow-300">{slides[currentSlide].notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Presentation