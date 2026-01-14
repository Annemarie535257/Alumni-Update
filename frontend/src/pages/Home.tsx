import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postsApi } from '../services/api'
import { Post } from '../types'
import { FileText, Plus, Calendar } from 'lucide-react'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await postsApi.getPosts()
      setPosts(data.slice(0, 5)) // Show latest 5 posts
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Alumni Platform</h1>
        <p className="text-gray-600">Stay connected with your alumni community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/alumni"
          className="card hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-lg p-3">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Alumni Directory</h3>
              <p className="text-sm text-gray-500">Browse alumni profiles</p>
            </div>
          </div>
        </Link>

        <Link
          to="/posts"
          className="card hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-lg p-3">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Updates & Posts</h3>
              <p className="text-sm text-gray-500">View community updates</p>
            </div>
          </div>
        </Link>

        <Link
          to="/posts/create"
          className="card hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-lg p-3">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Post</h3>
              <p className="text-sm text-gray-500">Share an update</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
          <Link to="/posts" className="text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No posts yet. Be the first to share an update!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {post.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  {post.author && (
                    <>
                      <span className="mx-2">•</span>
                      <span>By {post.author.full_name}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



