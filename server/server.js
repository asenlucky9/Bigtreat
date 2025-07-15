const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin (optional for development)
let admin = null;
try {
  const serviceAccount = require('./config/firebase-service-account.json');
  admin = require('firebase-admin');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.log('⚠️  Firebase Admin not initialized - running in development mode');
  console.log('   To enable Firebase, update server/config/firebase-service-account.json');
}

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mock data for development
const mockServices = [
  {
    id: '1',
    name: 'Wedding Event Planning',
    description: 'Complete wedding planning and coordination services.',
    price: 150000,
    category: 'event-planning',
    duration: '3-6 months',
    features: ['Venue selection', 'Vendor coordination', 'Timeline management'],
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Bridal Makeup & Beauty',
    description: 'Professional makeup services for brides and special occasions.',
    price: 45000,
    category: 'makeup',
    duration: '2-4 hours',
    features: ['Bridal makeup', 'Hair styling', 'Nail services'],
    imageUrl: 'https://images.unsplash.com/photo-148741291-2498d0a9d4e5?w=500&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Traditional Bead Making',
    description: 'Handcrafted bead jewelry and accessories.',
    price: 25000,
    category: 'bead-making',
    duration: '1-7 days',
    features: ['Traditional designs', 'Custom patterns', 'Wedding accessories'],
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Benin Traditional Hair',
    description: 'Expert traditional hair styling including Benin cultural hairstyles.',
    price: 35000,
    category: 'hair-styling',
    duration: '3-6 hours',
    features: ['Traditional Benin styles', 'Modern interpretations', 'Cultural events'],
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Custom Wedding Cakes',
    description: 'Beautiful and delicious custom-designed wedding cakes.',
    price: 75000,
    category: 'cakes',
    duration: '3-7 days',
    features: ['Custom design consultation', 'Flavor selection', 'Delivery and setup'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Corporate Event Decoration',
    description: 'Professional decoration services for corporate events.',
    price: 100000,
    category: 'decoration',
    duration: '1-3 days',
    features: ['Theme-based decoration', 'Flower arrangements', 'Lighting setup'],
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=400&fit=crop'
  }
];

const mockGallery = [
  {
    id: '1',
    title: 'Traditional Wedding Decoration',
    category: 'weddings',
    description: 'Beautiful traditional wedding setup with cultural elements',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop',
    date: '2024-01-15',
    location: 'Benin City',
    tags: ['wedding', 'traditional', 'decoration']
  },
  {
    id: '2',
    title: 'Modern Event Setup',
    category: 'events',
    description: 'Contemporary corporate event decoration',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=400&fit=crop',
    date: '2024-01-20',
    location: 'Lagos',
    tags: ['corporate', 'modern', 'events']
  },
  {
    id: '3',
    title: 'Bridal Makeup Session',
    category: 'makeup',
    description: 'Professional bridal makeup and styling',
    imageUrl: 'https://images.unsplash.com/photo-148741291-2498d0a9d4e5?w=500&h=400&fit=crop',
    date: '2024-01-25',
    location: 'Benin City',
    tags: ['bridal', 'makeup', 'beauty']
  },
  {
    id: '4',
    title: 'Traditional Bead Jewelry',
    category: 'beads',
    description: 'Handcrafted traditional bead accessories',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop',
    date: '2024-02-01',
    location: 'Benin City',
    tags: ['beads', 'traditional', 'jewelry']
  },
  {
    id: '5',
    title: 'Elegant Wedding Cake',
    category: 'cakes',
    description: 'Custom-designed wedding cake with floral decoration',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    date: '2024-02-05',
    location: 'Benin City',
    tags: ['wedding', 'cake', 'custom']
  },
  {
    id: '6',
    title: 'Traditional Hair Styling',
    category: 'hair',
    description: 'Benin traditional hair styling for cultural events',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=400&fit=crop',
    date: '2024-02-10',
    location: 'Benin City',
    tags: ['traditional', 'hair', 'cultural']
  }
];

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/content', require('./routes/content'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Big Treat Unique Centre Nigeria Ltd API is running',
    timestamp: new Date().toISOString(),
    firebase: admin ? 'Connected' : 'Development Mode'
  });
});

// Mock API endpoints for development
app.get('/api/mock/services', (req, res) => {
  res.json(mockServices);
});

app.get('/api/mock/gallery', (req, res) => {
  res.json(mockGallery);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Big Treat Unique Centre Server running on port ${PORT}`);
  console.log(`📍 Location: No 1 Upper Lawani Road, Benin City, Edo State`);
  console.log(`🎉 Services: Event Planning, Decoration, Makeup, Bead Making, Hair Styling`);
  console.log(`🌐 API: http://localhost:${PORT}/api/health`);
}); 