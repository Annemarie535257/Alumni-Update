import { useEffect, useState } from 'react'
import { alumniApi } from '../services/api'
import { AlumniProfile } from '../types'
import { useForm } from 'react-hook-form'
import { User, Briefcase, GraduationCap, Building, Linkedin, Save } from 'lucide-react'

export default function MyProfile() {
  const [profile, setProfile] = useState<AlumniProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Partial<AlumniProfile>>()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await alumniApi.getMyProfile()
      setProfile(data)
      reset(data)
    } catch (error: any) {
      if (error.response?.status === 404) {
        setProfile(null)
      } else {
        setError('Failed to load profile')
      }
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: Partial<AlumniProfile>) => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      
      let updatedProfile
      if (profile) {
        updatedProfile = await alumniApi.updateProfile(data)
      } else {
        updatedProfile = await alumniApi.createProfile(data)
      }
      
      setProfile(updatedProfile)
      setEditing(false)
      setSuccess('Profile saved successfully!')
    } catch (error: any) {
      setError(error.response?.data?.detail || 'Failed to save profile')
    } finally {
      setSaving(false)
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
    <div className="px-4 sm:px-6 lg:px-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your alumni profile information</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="card">
        {!editing ? (
          <>
            {profile ? (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="w-10 h-10 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="btn-primary"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="space-y-4">
                  {profile.graduation_year && (
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Graduation Year</p>
                        <p className="font-medium">{profile.graduation_year}</p>
                      </div>
                    </div>
                  )}
                  {profile.major && (
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Major</p>
                        <p className="font-medium">{profile.major}</p>
                      </div>
                    </div>
                  )}
                  {profile.current_position && (
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Current Position</p>
                        <p className="font-medium">{profile.current_position}</p>
                      </div>
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center">
                      <Building className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{profile.company}</p>
                      </div>
                    </div>
                  )}
                  {profile.bio && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Bio</p>
                      <p className="text-gray-700">{profile.bio}</p>
                    </div>
                  )}
                  {profile.linkedin_url && (
                    <div className="flex items-center">
                      <Linkedin className="w-5 h-5 mr-3 text-gray-400" />
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">You haven't created your profile yet.</p>
                <button onClick={() => setEditing(true)} className="btn-primary">
                  Create Profile
                </button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Year
                </label>
                <input
                  type="number"
                  {...register('graduation_year', { valueAsNumber: true })}
                  className="input-field"
                  placeholder="2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major
                </label>
                <input
                  type="text"
                  {...register('major')}
                  className="input-field"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Position
                </label>
                <input
                  type="text"
                  {...register('current_position')}
                  className="input-field"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className="input-field"
                  placeholder="Tech Company Inc."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  {...register('linkedin_url')}
                  className="input-field"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex items-center"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                  reset(profile || {})
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}



