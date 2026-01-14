import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  User, LogOut, Home, Users, FileText, Shield, Info, Newspaper, 
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, 
  Youtube, Menu, X
} from 'lucide-react'
import { useState } from 'react'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Alumni Platform
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-1">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/alumni"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Alumni
                </Link>
                <Link
                  to="/dashboard/posts"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Posts
                </Link>
                <Link
                  to="/dashboard/news"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <Newspaper className="w-4 h-4 mr-2" />
                  News
                </Link>
                <Link
                  to="/dashboard/about"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About Us
                </Link>
                <Link
                  to="/dashboard/contact"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/dashboard/admin"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-colors"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <Link
                to="/dashboard/profile"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                <User className="w-4 h-4 mr-2" />
                {user?.full_name}
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/alumni"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Alumni
              </Link>
              <Link
                to="/dashboard/posts"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Posts
              </Link>
              <Link
                to="/dashboard/news"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Newspaper className="w-4 h-4 inline mr-2" />
                News
              </Link>
              <Link
                to="/dashboard/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Info className="w-4 h-4 inline mr-2" />
                About Us
              </Link>
              <Link
                to="/dashboard/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Contact
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/dashboard/admin"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Admin
                </Link>
              )}
              <div className="border-t border-gray-200 pt-2">
                <Link
                  to="/dashboard/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  {user?.full_name}
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm text-gray-400 mb-4">
                Connecting alumni worldwide. Stay connected with your community, share updates, and grow your professional network.
              </p>
              <Link
                to="/dashboard/about"
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
                  <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/alumni" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Alumni Directory
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/posts" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Community Posts
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/news" className="text-gray-400 hover:text-white text-sm transition-colors">
                    News & Updates
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="text-gray-400 hover:text-white text-sm transition-colors">
                    My Profile
                  </Link>
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
              <Link
                to="/dashboard/contact"
                className="mt-4 inline-block text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                Contact Form →
              </Link>
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
                <Link to="/dashboard/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to="/dashboard/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
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



