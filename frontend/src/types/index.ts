export type UserRole = 'admin' | 'alumni'
export type PostStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  id: number
  email: string
  full_name: string
  role: UserRole
  is_active: boolean
  created_at: string
}

export interface AlumniProfile {
  id: number
  user_id: number
  graduation_year?: number
  major?: string
  current_position?: string
  company?: string
  bio?: string
  linkedin_url?: string
  profile_picture_url?: string
  created_at: string
  updated_at?: string
  user?: User
}

export interface Post {
  id: number
  author_id: number
  title: string
  content: string
  status: PostStatus
  created_at: string
  updated_at?: string
  author?: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
}



