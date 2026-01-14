import { useEffect, useState } from 'react'
import { alumniApi } from '../services/api'
import { AlumniProfile } from '../types'
import { User, Briefcase, GraduationCap, Building, Linkedin } from 'lucide-react'

export default function AlumniProfiles() {
  const [profiles, setProfiles] = useState<AlumniProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    try {
      const data = await alumniApi.getProfiles()
      setProfiles(data)
    } catch (error) {
      console.error('Failed to fetch profiles:', error)
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Directory</h1>
        <p className="text-gray-600">Connect with fellow alumni</p>
      </div>

      {profiles.length === 0 ? (
        <div className="card text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No alumni profiles yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div key={profile.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {profile.user?.full_name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{profile.user?.email}</p>
                </div>
              </div>

              {profile.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{profile.bio}</p>
              )}

              <div className="space-y-2">
                {profile.graduation_year && (
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                    <span>Class of {profile.graduation_year}</span>
                  </div>
                )}
                {profile.major && (
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{profile.major}</span>
                  </div>
                )}
                {profile.current_position && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{profile.current_position}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{profile.company}</span>
                  </div>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



