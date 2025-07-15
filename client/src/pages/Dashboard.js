import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Heart,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, userProfile, signout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading bookings
    setLoading(true);
    setError('');
    setTimeout(() => {
      try {
        setBookings([
          {
            id: 1,
            serviceName: 'Wedding Event Planning',
            date: '2024-03-15',
            time: '10:00 AM',
            status: 'confirmed',
            price: '₦250,000',
            serviceId: 'wedding-planning'
          },
          {
            id: 2,
            serviceName: 'Bridal Makeup',
            date: '2024-03-20',
            time: '8:00 AM',
            status: 'pending',
            price: '₦45,000',
            serviceId: 'bridal-makeup'
          },
          {
            id: 3,
            serviceName: 'Traditional Hair Styling',
            date: '2024-02-28',
            time: '9:00 AM',
            status: 'completed',
            price: '₦35,000',
            serviceId: 'hair-styling'
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'bookings', name: 'My Bookings', icon: Calendar },
    { id: 'profile', name: 'Profile', icon: Settings }
  ];

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar },
    { label: 'Upcoming', value: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length, icon: Clock },
    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: CheckCircle },
    { label: 'Favorites', value: 3, icon: Heart }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {userProfile?.displayName || currentUser?.displayName || 'User'}!</h1>
              <p className="text-pink-100 mt-1">Manage your bookings and profile</p>
            </div>
            <button
              onClick={signout}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
                    <Link to="/services" className="btn-primary text-sm px-4 py-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Service
                    </Link>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-600 border-opacity-50"></div>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow text-lg font-semibold">
                        {error}
                      </div>
                    </div>
                  ) : bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{booking.serviceName}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="capitalize">{booking.status}</span>
                            </span>
                            <span className="font-semibold text-gray-900">{booking.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-600 mb-4">Start by booking your first service</p>
                      <Link to="/services" className="btn-primary">
                        Browse Services
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
                    <Link to="/services" className="btn-primary text-sm px-4 py-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Service
                    </Link>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-600 border-opacity-50"></div>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow text-lg font-semibold">
                        {error}
                      </div>
                    </div>
                  ) : bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Date & Time</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-medium text-gray-900">{booking.serviceName}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
                                  <p className="text-sm text-gray-600">{booking.time}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="capitalize">{booking.status}</span>
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="font-semibold text-gray-900">{booking.price}</span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  {booking.status === 'pending' && (
                                    <>
                                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                      <p className="text-gray-600 mb-4">Start by booking your first service</p>
                      <Link to="/services" className="btn-primary">
                        Browse Services
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userProfile?.displayName || currentUser?.displayName || 'Not provided'}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{currentUser?.email || 'Not provided'}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{userProfile?.phoneNumber || 'Not provided'}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">
                          {currentUser?.metadata?.creationTime 
                            ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                            : 'Not available'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <button className="btn-primary">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                    <button className="btn-secondary">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your bookings</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive text messages for reminders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 