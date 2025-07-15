import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Calendar, 
  Award,
  Play,
  MapPin,
  Phone,
  Clock,
  X
} from 'lucide-react';
import apiService from '../services/api';

const Home = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [homeContent, setHomeContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, galleryData] = await Promise.all([
          apiService.getServices(),
          apiService.getGallery()
        ]);
        // Assign cake images to first three services
        const cakeImages = [
          '/assets/cake1.jpeg',
          '/assets/cake2.jpeg',
          '/assets/cake3.jpeg'
        ];
        const servicesWithCakes = servicesData.slice(0, 6).map((service, idx) =>
          idx < 3 ? { ...service, imageUrl: cakeImages[idx] } : service
        );
        setServices(servicesWithCakes);
        setGallery(galleryData.slice(0, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      setContentLoading(true);
      try {
        const res = await fetch('/api/content/home');
        if (!res.ok) throw new Error('Failed to fetch home content');
        const data = await res.json();
        setHomeContent(data);
      } catch {
        // setContentError('Failed to load home content.'); // This line was removed as per the edit hint
      } finally {
        setContentLoading(false);
      }
    };
    fetchContent();
  }, []);

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Events Completed', icon: Calendar },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '100%', label: 'Satisfaction Rate', icon: Star }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      content: 'Big Treat made our wedding day absolutely magical. Every detail was perfect and the team was incredibly professional.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Event Organizer',
      content: 'Outstanding service and attention to detail. They transformed our corporate event into an unforgettable experience.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Aisha Bello',
      role: 'Cultural Event Host',
      content: 'Their traditional bead work and hair styling services are exceptional. They truly understand our cultural heritage.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  if (loading || contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
        
        <div className="relative container mx-auto px-4 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-primary text-white mb-6">
                {homeContent?.heroTitle || 'Creating '}<span className="text-gradient">Magical Moments</span>{homeContent?.heroTitle ? '' : ' That Last Forever'}
              </h1>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                {homeContent?.heroSubtitle || 'From elegant weddings to corporate events, we transform your vision into reality with professional event planning, stunning decorations, and exceptional beauty services.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services" className="btn btn-accent group">
                  Explore Services
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-slate-900">
                  Get Quote
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop"
                  alt="Elegant Event Setup"
                  className="rounded-2xl shadow-2xl"
                />
                <button
                  className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl focus:outline-none flex items-center space-x-4 group"
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Watch Our Story"
                  type="button"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Watch Our Story</div>
                    <div className="text-sm text-slate-600">2 min video</div>
                  </div>
                </button>
              </div>
              {/* Modal Video Player */}
              {isVideoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
                    <button
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-600 focus:outline-none"
                      onClick={() => setIsVideoOpen(false)}
                      aria-label="Close video"
                      type="button"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <video
                      src="/assets/play.mp4"
                      controls
                      autoPlay
                      className="rounded-b-2xl w-full h-80 object-contain bg-black"
                    >
                      Sorry, your browser does not support embedded videos.
                    </video>
                  </div>
                  {/* Overlay click closes modal */}
                  <button
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsVideoOpen(false)}
                    aria-label="Close video overlay"
                    tabIndex={-1}
                    type="button"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(homeContent?.stats || stats).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {/* Only show icon if present, fallback to Users/Calendar/Award/Star */}
                  {stat.icon ? <stat.icon className="w-8 h-8 text-white" /> : null}
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-gradient-light">
        <div className="container mx-auto">
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">
                Our <span className="text-gradient">Services</span>
              </h2>
              <p className="section-subtitle">
                Comprehensive event solutions tailored to your unique needs and preferences
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card"
              >
                <img
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop'}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded-xl mb-4 border"
                />
                <h3 className="heading-tertiary mb-4">{service.name}</h3>
                <p className="text-muted mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ₦{service.price?.toLocaleString()}
                  </span>
                  <Link 
                    to={`/services/${service.id}`}
                    className="btn btn-primary"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn btn-accent">
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="section-header">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">
                Our <span className="text-gradient">Portfolio</span>
              </h2>
              <p className="section-subtitle">
                A glimpse into the magical moments we've created for our valued clients
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="gallery-item group"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="gallery-overlay">
                  <div className="text-center text-white">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/gallery" className="btn btn-outline">
              View Full Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gradient-to-b from-rose-50 to-white py-16">
        <div className="container mx-auto">
          <div className="section-header mb-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-title text-3xl font-bold mb-2"
            >
              What Our <span className="text-gradient">Clients Say</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="section-subtitle text-lg text-slate-600"
            >
              Real feedback from our valued customers
            </motion.p>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-slate-700 mb-6 italic text-center">
                "Big Treat made our wedding day absolutely magical! The attention to detail and professionalism were outstanding. Highly recommended!"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jane Doe"
                  className="w-14 h-14 rounded-full border-4 border-rose-200 shadow"
                />
                <div>
                  <div className="font-semibold text-slate-900">Jane Doe</div>
                  <div className="text-slate-600 text-sm">Bride</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="testimonial-card bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-slate-700 mb-6 italic text-center">
                "From the cakes to the decor, everything was perfect. The team was friendly, creative, and truly cared about our event."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="John Smith"
                  className="w-14 h-14 rounded-full border-4 border-rose-200 shadow"
                />
                <div>
                  <div className="font-semibold text-slate-900">John Smith</div>
                  <div className="text-slate-600 text-sm">Event Host</div>
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
              Ready to Create Your <span className="text-white">Perfect Event?</span>
            </h2>
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and turn your dreams into reality. Contact us today for a 
              personalized consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn bg-white text-rose-600 hover:bg-slate-100">
                Get Started Today
              </Link>
              <Link to="/services" className="btn border-2 border-white text-white hover:bg-white hover:text-rose-600">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="heading-tertiary mb-2">Visit Us</h3>
              <p className="text-muted">
                No 1 Upper Lawani Road<br />
                Benin City, Edo State<br />
                Nigeria
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="heading-tertiary mb-2">Call Us</h3>
              <p className="text-muted">
                +2348035491639<br />
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="heading-tertiary mb-2">Business Hours</h3>
              <p className="text-muted">
                Monday - Saturday<br />
                8:00 AM - 8:00 PM<br />
                Sunday: By Appointment
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 