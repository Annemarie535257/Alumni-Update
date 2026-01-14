import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postsApi } from '../services/api'
import { Post } from '../types'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react'

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

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

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    
    try {
      await postsApi.deletePost(id)
      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Failed to delete post')
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Updates</h1>
          <p className="text-gray-600">Latest posts from alumni</p>
        </div>
        <Link to="/posts/create" className="btn-primary flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No posts yet. Be the first to share an update!</p>
          <Link to="/posts/create" className="btn-primary inline-flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    {post.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {post.author.full_name}</span>
                      </>
                    )}
                    <span className="mx-2">•</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'approved' ? 'bg-green-100 text-green-800' :
                      post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                {user && (user.id === post.author_id || user.role === 'admin') && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



