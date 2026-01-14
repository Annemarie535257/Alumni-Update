import { Users, Target, Heart, Award, Globe, TrendingUp } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About Alumni Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting alumni worldwide, fostering lifelong relationships, and building a strong professional network.
        </p>
      </div>

      {/* Mission Section */}
      <div className="card mb-12">
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-primary-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to create a vibrant, connected community where alumni can stay in touch, 
          share their achievements, discover opportunities, and support each other's professional 
          and personal growth. We believe in the power of networking and the value of maintaining 
          connections that last a lifetime.
        </p>
      </div>

      {/* Values Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600">
              Building strong, supportive communities that bring people together and foster meaningful connections.
            </p>
          </div>

          <div className="card text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600">
              Providing a platform where alumni can support each other's growth and celebrate achievements together.
            </p>
          </div>

          <div className="card text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
            <p className="text-gray-600">
              Empowering alumni to grow professionally and personally through networking and knowledge sharing.
            </p>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="card mb-12">
        <div className="flex items-center mb-6">
          <Award className="w-8 h-8 text-primary-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Alumni Directory</h3>
            <p className="text-gray-600">
              Comprehensive directory of alumni profiles with professional information, making it easy 
              to find and connect with fellow graduates.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Updates</h3>
            <p className="text-gray-600">
              Share and discover updates from the alumni community. Stay informed about achievements, 
              events, and opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Newsletter</h3>
            <p className="text-gray-600">
              Monthly newsletters featuring alumni highlights, upcoming events, and exclusive opportunities 
              delivered to your inbox.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Networking</h3>
            <p className="text-gray-600">
              Connect with alumni across different industries, locations, and graduation years to expand 
              your professional network.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-blue-100">Active Alumni</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-blue-100">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-blue-100">Industries</div>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="card text-center">
        <Globe className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Become part of a growing network of alumni who are making a difference in their communities 
          and industries. Connect, share, and grow together.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/register"
            className="btn-primary inline-flex items-center"
          >
            Get Started
          </a>
          <a
            href="/dashboard/contact"
            className="btn-secondary inline-flex items-center"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

