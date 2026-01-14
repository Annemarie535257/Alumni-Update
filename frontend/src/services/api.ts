import axios from 'axios'
import { User, AlumniProfile, Post, LoginResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  setToken: (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  },
  
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/auth/login', { email, password })
    return response.data
  },
  
  register: async (email: string, password: string, fullName: string): Promise<User> => {
    const response = await api.post<User>('/api/auth/register', { email, password, full_name: fullName })
    return response.data
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/api/auth/me')
    return response.data
  },
}

export const alumniApi = {
  getProfiles: async (): Promise<AlumniProfile[]> => {
    const response = await api.get<AlumniProfile[]>('/api/alumni/profiles')
    return response.data
  },
  
  getProfile: async (id: number): Promise<AlumniProfile> => {
    const response = await api.get<AlumniProfile>(`/api/alumni/profiles/${id}`)
    return response.data
  },
  
  getMyProfile: async (): Promise<AlumniProfile> => {
    const response = await api.get<AlumniProfile>('/api/alumni/profile')
    return response.data
  },
  
  createProfile: async (data: Partial<AlumniProfile>): Promise<AlumniProfile> => {
    const response = await api.post<AlumniProfile>('/api/alumni/profile', data)
    return response.data
  },
  
  updateProfile: async (data: Partial<AlumniProfile>): Promise<AlumniProfile> => {
    const response = await api.put<AlumniProfile>('/api/alumni/profile', data)
    return response.data
  },
}

export const postsApi = {
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/api/posts/')
    return response.data
  },
  
  getPost: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/api/posts/${id}`)
    return response.data
  },
  
  getMyPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/api/posts/my-posts')
    return response.data
  },
  
  createPost: async (data: { title: string; content: string }): Promise<Post> => {
    const response = await api.post<Post>('/api/posts/', data)
    return response.data
  },
  
  updatePost: async (id: number, data: { title?: string; content?: string }): Promise<Post> => {
    const response = await api.put<Post>(`/api/posts/${id}`, data)
    return response.data
  },
  
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/api/posts/${id}`)
  },
}

export const adminApi = {
  getPendingPosts: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/api/admin/posts/pending')
    return response.data
  },
  
  approvePost: async (id: number): Promise<Post> => {
    const response = await api.put<Post>(`/api/admin/posts/${id}/approve`)
    return response.data
  },
  
  rejectPost: async (id: number): Promise<Post> => {
    const response = await api.put<Post>(`/api/admin/posts/${id}/reject`)
    return response.data
  },
  
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/admin/users')
    return response.data
  },
  
  toggleUserActive: async (id: number): Promise<User> => {
    const response = await api.put<User>(`/api/admin/users/${id}/toggle-active`)
    return response.data
  },
}

export const newsletterApi = {
  subscribe: async (email: string): Promise<{ message: string; subscribed: boolean }> => {
    const response = await api.post<{ message: string; subscribed: boolean }>('/api/newsletter/subscribe', { email })
    return response.data
  },
  
  unsubscribe: async (email: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/api/newsletter/unsubscribe/${email}`)
    return response.data
  },
  
  getSubscribers: async (): Promise<any[]> => {
    const response = await api.get<any[]>('/api/newsletter/subscribers')
    return response.data
  },
}

export default api



