import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postsApi, newsletterApi } from '../services/api'
import { Post } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { FileText, Plus, Calendar, Users, TrendingUp, Mail, Bell } from 'lucide-react'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await postsApi.getPosts()
      setPosts(data.slice(0, 6)) // Show latest 6 posts
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    
    setNewsletterLoading(true)
    setNewsletterError('')
    try {
      await newsletterApi.subscribe(newsletterEmail)
      setNewsletterSubscribed(true)
      setNewsletterEmail('')
    } catch (err: any) {
      setNewsletterError(err.response?.data?.detail || 'Failed to subscribe')
    } finally {
      setNewsletterLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.full_name?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-gray-600 text-lg">Here's what's happening in your alumni community</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Posts</p>
              <p className="text-3xl font-bold">{posts.length}</p>
            </div>
            <FileText className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Community</p>
              <p className="text-3xl font-bold">Active</p>
            </div>
            <Users className="w-12 h-12 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Updates</p>
              <p className="text-3xl font-bold">Today</p>
            </div>
            <TrendingUp className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/dashboard/alumni"
          className="card hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-primary-200"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Alumni Directory</h3>
              <p className="text-sm text-gray-500">Browse and connect with alumni</p>
            </div>
          </div>
        </Link>

        <Link
          to="/dashboard/posts"
          className="card hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-primary-200"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">All Posts</h3>
              <p className="text-sm text-gray-500">View all community updates</p>
            </div>
          </div>
        </Link>

        <Link
          to="/dashboard/posts/create"
          className="card hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-primary-200"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
              <p className="text-sm text-gray-500">Share an update with the community</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Posts */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
              <Link to="/dashboard/posts" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                View all
                <FileText className="w-4 h-4 ml-1" />
              </Link>
            </div>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No posts yet. Be the first to share an update!</p>
                <Link to="/dashboard/posts/create" className="btn-primary inline-flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Create First Post
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/dashboard/posts`}
                    className="block border-b border-gray-200 pb-6 last:border-0 last:pb-0 hover:bg-gray-50 -mx-6 px-6 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        post.status === 'approved' ? 'bg-green-100 text-green-800' :
                        post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      {post.author && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="font-medium">By {post.author.full_name}</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Newsletter Subscription */}
          <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            </div>
            {newsletterSubscribed ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">Subscribed!</p>
                <p className="text-xs text-gray-600">You'll receive our updates</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Stay updated with monthly newsletters featuring alumni highlights and events.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  {newsletterError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-xs">
                      {newsletterError}
                    </div>
                  )}
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="input-field text-sm"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    className="w-full btn-primary text-sm py-2 disabled:opacity-50"
                  >
                    {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link
                to="/dashboard/profile"
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Users className="w-5 h-5 mr-3" />
                My Profile
              </Link>
              <Link
                to="/dashboard/posts/create"
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Plus className="w-5 h-5 mr-3" />
                Create Post
              </Link>
              <Link
                to="/dashboard/alumni"
                className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Users className="w-5 h-5 mr-3" />
                Browse Alumni
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



