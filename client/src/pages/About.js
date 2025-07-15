import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Award, 
  Calendar, 
  MapPin
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Heart },
    { number: '1000+', label: 'Events Completed', icon: Calendar },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '100%', label: 'Satisfaction Rate', icon: Star }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Excellence',
      description: 'We pour our heart into every project, ensuring each event is a masterpiece that exceeds expectations.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Attention to Detail',
      description: 'Every element, from the smallest decoration to the grandest setup, is carefully crafted to perfection.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Customer-Centric Approach',
      description: 'Your vision is our priority. We work closely with you to bring your dreams to life.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Creative Innovation',
      description: 'We constantly push boundaries to create unique, memorable experiences that stand out.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const services = [
    {
      title: 'Event Planning',
      description: 'Complete wedding and event coordination with meticulous attention to every detail.',
      features: ['Venue selection', 'Vendor coordination', 'Timeline management', 'Budget planning']
    },
    {
      title: 'Decoration Services',
      description: 'Transform any space into a magical venue with our creative decoration expertise.',
      features: ['Theme-based design', 'Flower arrangements', 'Lighting setup', 'Custom backdrops']
    },
    {
      title: 'Beauty Services',
      description: 'Professional makeup and hair styling for brides and special occasions.',
      features: ['Bridal makeup', 'Traditional hair', 'Modern styles', 'Beauty consultation']
    },
    {
      title: 'Bead Making',
      description: 'Handcrafted traditional and modern bead jewelry and accessories.',
      features: ['Traditional designs', 'Custom patterns', 'Wedding accessories', 'Workshop training']
    },
    {
      title: 'Wedding Cakes',
      description: 'Beautiful and delicious custom-designed cakes for special occasions.',
      features: ['Custom designs', 'Flavor selection', 'Dietary options', 'Delivery service']
    }
  ];

  const [aboutContent, setAboutContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      setContentLoading(true);
      setContentError('');
      try {
        const res = await fetch('/api/content/about');
        if (!res.ok) throw new Error('Failed to fetch about content');
        const data = await res.json();
        setAboutContent(data);
      } catch {
        setContentError('Failed to load about content.');
      } finally {
        setContentLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {aboutContent?.title || 'About Big Treat Unique Centre'}
            </h1>
            <p className="text-lg text-pink-100 mb-2 font-medium">
              {aboutContent?.description || 'Big Treat Unique Centre Nigeria Ltd is your trusted partner for exceptional events and beauty services in Benin City.'}
            </p>
            <p className="text-xl text-pink-100 leading-relaxed">
              We are passionate about creating unforgettable moments and transforming your special occasions into magical memories. 
              Based in the heart of Benin City, we bring creativity, tradition, and excellence to every event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Big Treat Unique Centre Nigeria Ltd was founded with a simple yet powerful vision: to create extraordinary 
                  experiences that celebrate life's most precious moments. What started as a small passion project has grown 
                  into one of Benin City's most trusted names in event planning and beauty services.
                </p>
                <p>
                  Our journey began with a deep appreciation for Nigerian culture and traditions, combined with a modern 
                  approach to event planning. We understand that every event is unique, and every client has a story to tell. 
                  That's why we pour our heart and soul into every project, ensuring that your special day reflects your 
                  personality, culture, and dreams.
                </p>
                <p>
                  Today, we're proud to have served hundreds of happy clients across Edo State and beyond, creating 
                  memories that last a lifetime. Our commitment to excellence, attention to detail, and genuine care for 
                  our clients sets us apart in the industry.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-semibold">Our Mission</h3>
                  <p className="text-pink-100 leading-relaxed">
                    To create magical moments and unforgettable experiences that celebrate love, culture, and life's 
                    special occasions with creativity, professionalism, and genuine care.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet <span className="gradient-text">Our Team</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our passionate and experienced team is dedicated to making your event truly special.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center"
            >
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Mrs. Grace Okafor" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-200 shadow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Mrs. Grace Okafor</h3>
              <div className="text-pink-600 font-medium mb-2">Founder & Creative Director</div>
              <p className="text-gray-600 text-sm">With over a decade of experience, Grace leads the team with vision, creativity, and a passion for excellence in every event.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center"
            >
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Mr. Daniel Eze" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-200 shadow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Mr. Daniel Eze</h3>
              <div className="text-pink-600 font-medium mb-2">Head of Events</div>
              <p className="text-gray-600 text-sm">Daniel ensures every event runs smoothly, coordinating logistics and bringing creative ideas to life for our clients.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center"
            >
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ms. Linda Umeh" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-200 shadow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Ms. Linda Umeh</h3>
              <div className="text-pink-600 font-medium mb-2">Lead Makeup Artist</div>
              <p className="text-gray-600 text-sm">Linda is a talented makeup artist known for her attention to detail and ability to make every client feel beautiful and confident.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="bg-gray-50 rounded-2xl shadow-lg p-6 text-center"
            >
              <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Mr. Samuel Igbinedion" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-200 shadow" />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Mr. Samuel Igbinedion</h3>
              <div className="text-pink-600 font-medium mb-2">Logistics & Support</div>
              <p className="text-gray-600 text-sm">Samuel handles logistics and support, ensuring every detail is perfect and every event is a success.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core values guide everything we do and ensure that every client receives the exceptional service they deserve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive event planning and beauty services to make your special moments truly extraordinary.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Visit Our <span className="gradient-text">Studio</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      No 1 Upper Lawani Road<br />
                      By New Benin Market<br />
                      Benin City, Edo State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">+2348035491639</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@bigtreat.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">No 1 Upper Lawani Road, Benin City</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Create Something <span className="text-pink-400">Amazing</span>?
            </h2>
            <p className="text-gray-300 text-lg">
              Let us help you make your special day unforgettable. Contact us today to discuss your event or book an appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Started
              </a>
              <a href="/gallery" className="btn-secondary text-lg px-8 py-4">
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 