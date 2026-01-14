import { Link } from 'react-router-dom'
import { Users, FileText, Bell, ArrowRight, Check, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Target, Heart, TrendingUp, Globe, Newspaper, MessageSquare, Send, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { newsletterApi } from '../services/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

export default function Landing() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

  // Dummy news data for landing page
  const dummyNews = [
    {
      id: 1,
      title: "Alumni Reunion 2024: A Resounding Success",
      content: "Over 500 alumni gathered for our annual reunion event, celebrating achievements and reconnecting with old friends. The event featured keynote speakers, networking sessions, and a gala dinner that raised $50,000 for student scholarships.",
      date: "2 days ago",
      author: "Sarah Johnson",
      category: "Event",
      emoji: "🎉",
      gradient: "from-blue-500 via-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Tech Innovation Award Goes to Alumni Startup",
      content: "Congratulations to TechVentures, founded by our alumni, for winning the prestigious Innovation Award 2024. Their groundbreaking AI solution is revolutionizing healthcare accessibility in underserved communities.",
      date: "5 days ago",
      author: "Michael Chen",
      category: "Achievement",
      emoji: "🏆",
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      id: 3,
      title: "New Mentorship Program Launches This Month",
      content: "We're excited to announce our new mentorship program connecting experienced alumni with recent graduates. Over 200 mentors have already signed up to share their expertise and guide the next generation of professionals.",
      date: "1 week ago",
      author: "Emily Rodriguez",
      category: "Program",
      emoji: "🤝",
      gradient: "from-green-400 via-blue-500 to-purple-600"
    },
    {
      id: 4,
      title: "Alumni Scholarship Fund Reaches $1M Milestone",
      content: "Thanks to the generous contributions from our alumni community, we've reached an incredible milestone of $1 million in scholarship funding. This will help support over 200 students in the coming academic year.",
      date: "3 days ago",
      author: "David Thompson",
      category: "Achievement",
      emoji: "💰",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600"
    },
    {
      id: 5,
      title: "Global Networking Event: Connecting Alumni Worldwide",
      content: "Join us for our virtual global networking event where alumni from 50+ countries will come together to share experiences, opportunities, and build meaningful professional connections.",
      date: "1 week ago",
      author: "Lisa Wang",
      category: "Event",
      emoji: "🌍",
      gradient: "from-indigo-500 via-purple-500 to-pink-500"
    },
    {
      id: 6,
      title: "Career Development Workshop Series Announced",
      content: "We're launching a comprehensive career development workshop series covering topics from resume building to executive leadership. All sessions will be led by successful alumni in their respective fields.",
      date: "4 days ago",
      author: "Robert Martinez",
      category: "Program",
      emoji: "📚",
      gradient: "from-violet-500 via-fuchsia-500 to-pink-500"
    }
  ]

  // Auto-rotate news cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % Math.ceil(dummyNews.length / 3))
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors, isSubmitting: contactSubmitting },
    reset: resetContact,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })


  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setLoading(true)
    setError('')
    try {
      await newsletterApi.subscribe(email)
      setSubscribed(true)
      setEmail('')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onContactSubmit = async (_data: ContactForm) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setContactSubmitted(true)
    resetContact()
    setTimeout(() => setContactSubmitted(false), 5000)
  }

  if (user) {
    return null // Don't show landing page if user is logged in
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Alumni Platform
                </h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#about"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium transition-colors"
              >
                About Us
              </a>
              <a
                href="#news"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium transition-colors"
              >
                News
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium transition-colors"
              >
                Contact
              </a>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stay Connected with Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Alumni Community
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with fellow alumni, share updates, discover opportunities, and grow your professional network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center justify-center"
            >
              Join Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting alumni worldwide, fostering lifelong relationships, and building a strong professional network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to create a vibrant, connected community where alumni can stay in touch, 
              share their achievements, discover opportunities, and support each other's professional 
              and personal growth. We believe in the power of networking and the value of maintaining 
              connections that last a lifetime.
            </p>
          </div>

          {/* Vision */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-primary-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become the leading platform for alumni engagement, where every graduate can easily 
              connect, collaborate, and contribute to their community. We envision a world where 
              alumni networks are strong, supportive, and actively helping each other succeed in 
              their personal and professional endeavors.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600">
                Building strong, supportive communities that bring people together and foster meaningful connections.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Support</h4>
              <p className="text-gray-600">
                Providing a platform where alumni can support each other's growth and celebrate achievements together.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Growth</h4>
              <p className="text-gray-600">
                Empowering alumni to grow professionally and personally through networking and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">Powerful features to keep you connected</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni Directory</h3>
            <p className="text-gray-600 mb-4">
              Browse and connect with alumni from your institution. Find colleagues, mentors, and friends.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Professional profiles
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Career information
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Contact details
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Updates</h3>
            <p className="text-gray-600 mb-4">
              Share your achievements, news, and updates with the community. Stay informed about what's happening.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Create posts
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                View updates
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Engage with content
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Stay updated with monthly newsletters featuring alumni highlights, events, and opportunities.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Monthly updates
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Event announcements
              </li>
              <li className="flex items-center text-gray-700">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Career opportunities
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter and never miss important updates from the alumni community.
          </p>
          
          {subscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <Check className="w-12 h-12 mx-auto mb-4" />
              <p className="text-xl font-semibold">Thank you for subscribing!</p>
              <p className="mt-2 opacity-90">You'll receive our next newsletter in your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              {error && (
                <div className="mb-4 bg-red-500/20 backdrop-blur-sm border border-red-300 text-white px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>


      {/* News Section */}
      <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Latest News & Updates</h2>
          </div>
          <p className="text-xl text-gray-600">
            Stay informed about the latest news, achievements, and updates from the alumni community.
          </p>
        </div>

        {/* Animated News Cards Carousel */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentNewsIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(dummyNews.length / 3) }).map((_, slideIndex) => {
                const startIndex = slideIndex * 3
                const slideNews = dummyNews.slice(startIndex, startIndex + 3)
                
                return (
                  <div key={slideIndex} className="min-w-full grid md:grid-cols-3 gap-6 px-2">
                    {slideNews.map((news) => (
                      <div 
                        key={news.id} 
                        className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group animate-fade-in"
                      >
                        {/* News Image/Icon with Gradient */}
                        <div className={`bg-gradient-to-br ${news.gradient} h-48 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                          <div className="relative z-10 text-7xl animate-bounce-slow" style={{ 
                            animation: 'bounce 3s infinite',
                            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                          }}>
                            {news.emoji}
                          </div>
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                            <span className="text-xs font-bold text-gray-800">{news.category}</span>
                          </div>
                        </div>
                        
                        {/* News Content */}
                        <div className="p-6">
                          <div className="flex items-center mb-3">
                            <TrendingUp className="w-4 h-4 text-primary-600 mr-2 animate-pulse" />
                            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Latest</span>
                            <span className="ml-auto text-xs text-gray-500 font-medium">{news.date}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                            {news.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {news.content}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-2" />
                              <span className="font-medium">{news.author}</span>
                            </div>
                            <Link
                              to="/register"
                              className="text-primary-600 hover:text-primary-700 text-sm font-semibold inline-flex items-center group-hover:underline transition-all"
                            >
                              Read More
                              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentNewsIndex((prev) => (prev - 1 + Math.ceil(dummyNews.length / 3)) % Math.ceil(dummyNews.length / 3))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10 border-2 border-gray-100"
            aria-label="Previous news"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => setCurrentNewsIndex((prev) => (prev + 1) % Math.ceil(dummyNews.length / 3))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10 border-2 border-gray-100"
            aria-label="Next news"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(dummyNews.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentNewsIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentNewsIndex 
                    ? 'w-8 bg-primary-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Featured News Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mr-4">
                <span className="text-sm font-semibold">🌟 Featured Story</span>
              </div>
              <span className="text-sm opacity-90">3 days ago</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">Global Alumni Network Reaches 10,000 Members Milestone</h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl">
              We're thrilled to announce that our alumni network has reached an incredible milestone of 10,000 active members 
              spanning across 50 countries. This achievement reflects the strength and unity of our community.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm opacity-75">Written by</p>
                  <p className="font-semibold">Alumni Platform Team</p>
                </div>
              </div>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Read Full Story
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all inline-flex items-center transform hover:scale-105"
          >
            View All News & Updates
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to get in touch? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

            {contactSubmitted && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Thank you for your message! We'll get back to you soon.
                </div>
              </div>
            )}

            <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  {...registerContact('name')}
                  className="input-field"
                  placeholder="Your name"
                />
                {contactErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  {...registerContact('email')}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
                {contactErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  {...registerContact('subject')}
                  className="input-field"
                  placeholder="What's this about?"
                />
                {contactErrors.subject && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  {...registerContact('message')}
                  className="input-field"
                  placeholder="Your message..."
                />
                {contactErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{contactErrors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={contactSubmitting}
                className="btn-primary w-full flex items-center justify-center"
              >
                {contactSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                We're here to help! Whether you have a question about your account, need technical support, 
                or want to provide feedback, we'd love to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:info@alumniplatform.com" className="text-primary-600 hover:text-primary-700">
                      info@alumniplatform.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+1234567890" className="text-primary-600 hover:text-primary-700">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      123 Alumni Street<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM EST</p>
                <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM EST</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
            </div>

            <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600 text-sm">
                We typically respond to all inquiries within 24-48 hours during business days. 
                For urgent matters, please call us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of alumni already connected on our platform.
          </p>
          <Link
            to="/register"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all inline-flex items-center"
          >
            Create Your Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm text-gray-400 mb-4">
                Connecting alumni worldwide. Stay connected with your community, share updates, and grow your professional network.
              </p>
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                Learn more →
              </Link>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#newsletter" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 text-primary-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:info@alumniplatform.com" className="text-sm text-white hover:text-primary-400 transition-colors">
                      info@alumniplatform.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 text-primary-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+1234567890" className="text-sm text-white hover:text-primary-400 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-sm text-white">
                      123 Alumni Street<br />
                      City, State 12345
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
              <p className="text-sm text-gray-400 mb-4">
                Stay connected with us on social media for the latest updates and news.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Alumni Platform. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
                <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

