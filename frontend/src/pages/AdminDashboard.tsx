import { useEffect, useState } from 'react'
import { adminApi } from '../services/api'
import { Post, User } from '../types'
import { Shield, CheckCircle, XCircle, Calendar, User as UserIcon, ToggleLeft, ToggleRight } from 'lucide-react'

export default function AdminDashboard() {
  const [pendingPosts, setPendingPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [posts, usersData] = await Promise.all([
        adminApi.getPendingPosts(),
        adminApi.getUsers(),
      ])
      setPendingPosts(posts)
      setUsers(usersData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      await adminApi.approvePost(id)
      setPendingPosts(pendingPosts.filter(post => post.id !== id))
    } catch (error) {
      console.error('Failed to approve post:', error)
      alert('Failed to approve post')
    }
  }

  const handleReject = async (id: number) => {
    if (!window.confirm('Are you sure you want to reject this post?')) return
    
    try {
      await adminApi.rejectPost(id)
      setPendingPosts(pendingPosts.filter(post => post.id !== id))
    } catch (error) {
      console.error('Failed to reject post:', error)
      alert('Failed to reject post')
    }
  }

  const handleToggleUser = async (id: number) => {
    try {
      const updatedUser = await adminApi.toggleUserActive(id)
      setUsers(users.map(user => user.id === id ? updatedUser : user))
    } catch (error) {
      console.error('Failed to toggle user:', error)
      alert('Failed to update user')
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
        <div className="flex items-center mb-2">
          <Shield className="w-8 h-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600">Manage posts and users</p>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'posts'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Posts ({pendingPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Users ({users.length})
          </button>
        </nav>
      </div>

      {activeTab === 'posts' && (
        <div>
          {pendingPosts.length === 0 ? (
            <div className="card text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending posts. All caught up!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingPosts.map((post) => (
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
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap mb-6">{post.content}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="btn-primary flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(post.id)}
                      className="btn-danger flex items-center"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleToggleUser(user.id)}
                          className="text-primary-600 hover:text-primary-900 flex items-center"
                        >
                          {user.is_active ? (
                            <>
                              <ToggleRight className="w-5 h-5 mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-5 h-5 mr-1" />
                              Activate
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



