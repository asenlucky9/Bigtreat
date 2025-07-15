import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Phone, Mail, Star, ArrowLeft, Heart } from 'lucide-react';
import apiService from '../services/api';
import toast from 'react-hot-toast';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await apiService.getService(id);
        setService(data);
      } catch (error) {
        setError('Failed to load service details. Please try again later.');
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 border-opacity-50"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl shadow text-lg font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Not Found</h2>
          <button 
            onClick={() => navigate('/services')}
            className="btn btn-primary"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Service Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative">
              <img 
                src={service.imageUrl} 
                alt={service.name}
                className="w-full h-64 md:h-96 object-cover"
              />
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart 
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="heading-primary mb-2">{service.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>4.8 (120 reviews)</span>
                    </div>
                    <span>•</span>
                    <span>Benin City, Edo State</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-3xl font-bold text-pink-600 mb-2">
                    ₦{service.price?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Starting price</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookNow}
                  className="btn btn-primary flex-1"
                >
                  Book Now
                </button>
                <button
                  onClick={handleContact}
                  className="btn btn-outline flex-1"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="heading-secondary mb-6">Service Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-800">Duration</div>
                        <div className="text-gray-600">{service.duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-800">Location</div>
                        <div className="text-gray-600">Benin City, Edo State</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-800">Availability</div>
                        <div className="text-gray-600">7 days a week</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-pink-500" />
                      <div>
                        <div className="font-medium text-gray-800">Group Size</div>
                        <div className="text-gray-600">1-100+ people</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {service.features && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="heading-secondary mb-6">What's Included</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="heading-secondary mb-6">About This Service</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    {service.description}
                  </p>
                  <p className="mb-4">
                    At Big Treat Unique Centre Nigeria Ltd, we pride ourselves on delivering exceptional 
                    quality and personalized service for every event. Our experienced team ensures that 
                    your special day is nothing short of perfect.
                  </p>
                  <p>
                    Located at No 1 Upper Lawani Road, Benin City, Edo State, we serve clients throughout 
                    the region with our comprehensive range of event planning, decoration, makeup, bead making, 
                    traditional hair styling, and custom cake services.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-700">+2348035491639</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-700">info@bigtreat.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-700">No 1 Upper Lawani Road, Benin City</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Starting Price</span>
                    <span className="font-semibold text-pink-600">₦{service.price?.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    * Final price may vary based on specific requirements and customization
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Why Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">Experienced professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">Quality guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">Customized solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-700">On-time delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail; 