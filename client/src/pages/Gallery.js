import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  MapPin
} from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'events', name: 'Events' },
    { id: 'decoration', name: 'Decoration' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'hair', name: 'Hair Styling' },
    { id: 'beads', name: 'Bead Making' },
    { id: 'cakes', name: 'Wedding Cakes' }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Traditional Wedding Decoration',
      category: 'weddings',
      description: 'Beautiful traditional wedding setup with cultural elements',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop',
      date: '2024-01-15',
      location: 'Benin City',
      tags: ['wedding', 'traditional', 'decoration']
    },
    {
      id: 2,
      title: 'Modern Event Setup',
      category: 'events',
      description: 'Contemporary corporate event decoration',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=400&fit=crop',
      date: '2024-01-20',
      location: 'Lagos',
      tags: ['corporate', 'modern', 'events']
    },
    {
      id: 3,
      title: 'Bridal Makeup Session',
      category: 'makeup',
      description: 'Professional bridal makeup and styling',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=400&fit=crop',
      date: '2024-01-25',
      location: 'Benin City',
      tags: ['bridal', 'makeup', 'beauty']
    },
    {
      id: 4,
      title: 'Traditional Bead Jewelry',
      category: 'beads',
      description: 'Handcrafted traditional bead accessories',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop',
      date: '2024-02-01',
      location: 'Benin City',
      tags: ['beads', 'traditional', 'jewelry']
    },
    {
      id: 5,
      title: 'Elegant Wedding Cake',
      category: 'cakes',
      description: 'Custom-designed wedding cake with floral decoration',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
      date: '2024-02-05',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'custom']
    },
    {
      id: 6,
      title: 'Traditional Hair Styling',
      category: 'hair',
      description: 'Benin traditional hair styling for cultural events',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=400&fit=crop',
      date: '2024-02-10',
      location: 'Benin City',
      tags: ['traditional', 'hair', 'cultural']
    },
    {
      id: 7,
      title: 'Corporate Event Decoration',
      category: 'decoration',
      description: 'Professional decoration for business events',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=400&fit=crop',
      date: '2024-02-15',
      location: 'Port Harcourt',
      tags: ['corporate', 'decoration', 'professional']
    },
    {
      id: 8,
      title: 'Birthday Party Setup',
      category: 'events',
      description: 'Colorful and fun birthday party decoration',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=400&fit=crop',
      date: '2024-02-20',
      location: 'Benin City',
      tags: ['birthday', 'party', 'fun']
    },
    {
      id: 9,
      title: 'Glamorous Evening Makeup',
      category: 'makeup',
      description: 'Elegant evening makeup for special occasions',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&h=400&fit=crop',
      date: '2024-02-25',
      location: 'Benin City',
      tags: ['evening', 'makeup', 'glamorous']
    },
    {
      id: 101,
      title: 'Classic White Wedding Cake',
      category: 'cakes',
      description: 'Elegant three-tier white wedding cake with floral accents.',
      image: '/assets/cake1.jpeg',
      date: '2024-07-01',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'classic']
    },
    {
      id: 102,
      title: 'Pink Rose Cake',
      category: 'cakes',
      description: 'Beautiful pink cake decorated with fresh roses.',
      image: '/assets/cake2.jpeg',
      date: '2024-07-02',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'roses']
    },
    {
      id: 103,
      title: 'Chocolate Drip Cake',
      category: 'cakes',
      description: 'Delicious chocolate drip cake perfect for celebrations.',
      image: '/assets/cake3.jpeg',
      date: '2024-07-03',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'chocolate']
    },
    {
      id: 104,
      title: 'Golden Celebration Cake',
      category: 'cakes',
      description: 'Luxurious gold-accented cake for special celebrations.',
      image: '/assets/cake4.jpeg',
      date: '2024-07-04',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'gold']
    },
    {
      id: 105,
      title: 'Floral Fantasy Cake',
      category: 'cakes',
      description: 'Stunning cake covered in colorful edible flowers.',
      image: '/assets/cake5.jpeg',
      date: '2024-07-05',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'floral']
    },
    {
      id: 106,
      title: 'Royal Blue Cake',
      category: 'cakes',
      description: 'Elegant blue cake with royal decorations.',
      image: '/assets/cake6.jpeg',
      date: '2024-07-06',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'blue']
    },
    {
      id: 107,
      title: 'Pink Ombre Cake',
      category: 'cakes',
      description: 'Beautiful ombre cake in shades of pink.',
      image: '/assets/cake7.jpeg',
      date: '2024-07-07',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'ombre']
    },
    {
      id: 108,
      title: 'Chocolate Rose Cake',
      category: 'cakes',
      description: 'Rich chocolate cake with rose decorations.',
      image: '/assets/cake8.jpeg',
      date: '2024-07-08',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'chocolate', 'rose']
    },
    {
      id: 109,
      title: 'Elegant White & Gold Cake',
      category: 'cakes',
      description: 'Classic white cake with elegant gold details.',
      image: '/assets/cake9.jpeg',
      date: '2024-07-09',
      location: 'Benin City',
      tags: ['wedding', 'cake', 'white', 'gold']
    }
  ];

  useEffect(() => {
    // Simulate async fetch for gallery items
    setLoading(true);
    setError('');
    setTimeout(() => {
      try {
        // If you want to simulate an error, uncomment the next line:
        // throw new Error('Failed to load gallery');
        setLoading(false);
      } catch (err) {
        setError('Failed to load gallery. Please try again later.');
        setLoading(false);
      }
    }, 800);
  }, []);

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setSelectedImage(filteredItems[prevIndex]);
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

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-pink-100 leading-relaxed">
              Explore our collection of beautiful work and get inspired for your next event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search our work..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredItems.length} of {galleryItems.length} items
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="gallery-item group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="gallery-overlay">
                    <div className="text-white text-center">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl w-full max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div onClick={(e) => e.stopPropagation()}>
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                
                {/* Image Info */}
                <div className="mt-4 text-white text-center">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300 mb-3">{selectedImage.description}</p>
                  
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedImage.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Inspired by Our Work?
            </h2>
            <p className="text-gray-300 text-lg">
              Let us help you create something equally beautiful for your special day. Contact us to discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-lg px-8 py-4">
                Get Started
              </a>
              <a href="/services" className="btn-secondary text-lg px-8 py-4">
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery; 