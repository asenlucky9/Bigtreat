import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Palette, 
  Sparkles, 
  Heart, 
  Scissors, 
  Cake,
  ArrowRight,
  Star,
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';
import apiService from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiService.getServices();
        setServices(data);
      } catch (error) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = [
    { id: 'all', name: 'All Services', icon: Calendar },
    { id: 'event-planning', name: 'Event Planning', icon: Calendar },
    { id: 'decoration', name: 'Decoration', icon: Palette },
    { id: 'makeup', name: 'Makeup & Beauty', icon: Sparkles },
    { id: 'bead-making', name: 'Bead Making', icon: Heart },
    { id: 'hair-styling', name: 'Hair Styling', icon: Scissors },
    { id: 'cakes', name: 'Wedding Cakes', icon: Cake }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const features = [
    'Professional Team',
    'Custom Designs',
    'Quality Materials',
    'On-time Delivery',
    'After-service Support',
    'Competitive Pricing'
  ];

  const cakeImages = [
    '/assets/cake1.jpeg',
    '/assets/cake2.jpeg',
    '/assets/cake3.jpeg',
    '/assets/cake4.jpeg',
    '/assets/cake5.jpeg',
    '/assets/cake6.jpeg',
    '/assets/cake7.jpeg',
    '/assets/cake8.jpeg',
    '/assets/cake9.jpeg',
  ];

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-primary text-white mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
              Comprehensive event solutions and beauty services tailored to make your special moments 
              truly extraordinary. From concept to execution, we handle every detail with precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section bg-gradient-light">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Choose Your <span className="text-gradient">Service</span>
            </h2>
            <p className="section-subtitle">
              Browse through our comprehensive range of services and find the perfect solution for your needs
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card group"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  {service.category === 'cakes' || service.name?.toLowerCase().includes('cake') ? (
                    <div className="grid grid-cols-3 gap-1">
                      {cakeImages.map((img, i) => (
                        <img
                          key={img}
                          src={img}
                          alt={`Wedding Cake ${i + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={service.imageUrl || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=400&h=250&fit=crop`}
                      alt={service.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-sm font-semibold text-slate-900">
                      ₦{service.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-tertiary">{service.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-600">4.9</span>
                    </div>
                  </div>
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration || '2-4 hours'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{service.capacity || 'Unlimited'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">
                      ₦{service.price?.toLocaleString()}
                    </span>
                    <Link 
                      to={`/services/${service.id}`}
                      className="btn btn-primary group"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No services found
              </h3>
              <p className="text-slate-600">
                Try selecting a different category or contact us for custom services.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title text-left mb-6">
                Why Choose <span className="text-gradient">Big Treat</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With years of experience and a passion for excellence, we've built a reputation for 
                delivering exceptional results that exceed expectations. Our commitment to quality, 
                creativity, and customer satisfaction sets us apart.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Proven Excellence</h3>
                    <p className="text-slate-600">
                      Over 500+ satisfied clients and countless successful events speak to our commitment to excellence.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Expert Team</h3>
                    <p className="text-slate-600">
                      Our skilled professionals bring creativity, experience, and attention to detail to every project.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Personalized Service</h3>
                    <p className="text-slate-600">
                      Every event is unique, and we tailor our services to match your vision and preferences perfectly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop"
                alt="Professional Event Setup"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">500+</div>
                  <div className="text-slate-600">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-accent text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-white mb-6">
              Ready to Start Your <span className="text-white">Project?</span>
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together. 
              Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-rose-600 hover:bg-slate-100">
                Get Free Quote
              </Link>
              <Link to="/booking" className="btn border-2 border-white text-white hover:bg-white hover:text-rose-600">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 