import { useEffect, useState } from 'react'
import { postsApi } from '../services/api'
import { Post } from '../types'
import { Calendar, User, TrendingUp, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function News() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await postsApi.getPosts()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Newspaper className="w-8 h-8 text-primary-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">News & Updates</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Stay informed about the latest news, achievements, and updates from the alumni community.
        </p>
      </div>

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary-200 mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-primary-600 mr-2" />
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Featured</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{posts[0].title}</h2>
          <p className="text-gray-700 mb-4 line-clamp-3">{posts[0].content}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(posts[0].created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            {posts[0].author && (
              <>
                <span className="mx-2">•</span>
                <User className="w-4 h-4 mr-1" />
                <span>{posts[0].author.full_name}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* All News */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Updates</h2>
        {posts.length === 0 ? (
          <div className="card text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No news updates yet.</p>
            <Link to="/dashboard/posts/create" className="btn-primary inline-flex items-center">
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="card hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    {post.author && (
                      <>
                        <span className="mx-2">•</span>
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author.full_name}</span>
                      </>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    post.status === 'approved' ? 'bg-green-100 text-green-800' :
                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="card bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </div>
  )
}

