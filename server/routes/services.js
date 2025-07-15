const express = require('express');
const router = express.Router();

// Mock data for development
const mockServices = [
  {
    id: '1',
    name: 'Wedding Event Planning',
    description: 'Complete wedding planning and coordination services. From venue selection to timeline management, we ensure your special day runs perfectly.',
    price: 150000,
    category: 'event-planning',
    duration: '3-6 months',
    features: ['Venue selection', 'Vendor coordination', 'Timeline management', 'Day-of coordination', 'Budget management', 'Guest list management'],
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Bridal Makeup & Beauty',
    description: 'Professional makeup services for brides and special occasions. We use high-quality products to create stunning, long-lasting looks.',
    price: 45000,
    category: 'makeup',
    duration: '2-4 hours',
    features: ['Bridal makeup', 'Bridal party makeup', 'Hair styling', 'Nail services', 'Touch-up services', 'Product consultation'],
    imageUrl: 'https://images.unsplash.com/photo-148741291-2498d0a9d4e5?w=500&h=400&fit=crop',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Traditional Bead Making',
    description: 'Handcrafted bead jewelry and accessories with traditional and modern designs. Perfect for cultural events and personal adornment.',
    price: 25000,
    category: 'bead-making',
    duration: '1-7 days',
    features: ['Traditional designs', 'Custom patterns', 'Wedding accessories', 'Cultural pieces', 'Workshop training', 'Repair services'],
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Benin Traditional Hair',
    description: 'Expert traditional hair styling including Benin cultural hairstyles, modern twists, and special occasion hair designs.',
    price: 35000,
    category: 'hair-styling',
    duration: '3-6 hours',
    features: ['Traditional Benin styles', 'Modern interpretations', 'Wedding hair', 'Cultural events', 'Hair care advice', 'Accessory integration'],
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=400&fit=crop',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Custom Wedding Cakes',
    description: 'Beautiful and delicious custom-designed wedding cakes. We create stunning cakes that taste as amazing as they look.',
    price: 75000,
    category: 'cakes',
    duration: '3-7 days',
    features: ['Custom design consultation', 'Flavor selection', 'Dietary accommodations', 'Delivery and setup', 'Cake topper design', 'Tasting sessions'],
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Corporate Event Decoration',
    description: 'Professional decoration services for corporate events, conferences, and business functions. Create impressive and professional atmospheres.',
    price: 100000,
    category: 'decoration',
    duration: '1-3 days',
    features: ['Theme-based decoration', 'Flower arrangements', 'Lighting setup', 'Backdrop design', 'Table centerpieces', 'Brand integration'],
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=400&fit=crop',
    isActive: true,
    createdAt: new Date()
  }
];

// Get all services
router.get('/', async (req, res) => {
  try {
    // Try to use Firebase if available, otherwise use mock data
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      // Firebase not available, use mock data
      res.json(mockServices);
      return;
    }

    const servicesSnapshot = await admin.firestore()
      .collection('services')
      .orderBy('category')
      .get();

    const services = [];
    servicesSnapshot.forEach(doc => {
      services.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(services);
  } catch (error) {
    // Fallback to mock data if Firebase fails
    console.log('Using mock services data');
    res.json(mockServices);
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available, otherwise use mock data
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      // Firebase not available, use mock data
      const service = mockServices.find(s => s.id === req.params.id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
      return;
    }

    const serviceDoc = await admin.firestore()
      .collection('services')
      .doc(req.params.id)
      .get();

    if (!serviceDoc.exists) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({
      id: serviceDoc.id,
      ...serviceDoc.data()
    });
  } catch (error) {
    // Fallback to mock data if Firebase fails
    const service = mockServices.find(s => s.id === req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  }
});

// Get services by category
router.get('/category/:category', async (req, res) => {
  try {
    // Try to use Firebase if available, otherwise use mock data
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      // Firebase not available, use mock data
      const services = mockServices.filter(s => s.category === req.params.category);
      res.json(services);
      return;
    }

    const servicesSnapshot = await admin.firestore()
      .collection('services')
      .where('category', '==', req.params.category)
      .get();

    const services = [];
    servicesSnapshot.forEach(doc => {
      services.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(services);
  } catch (error) {
    // Fallback to mock data if Firebase fails
    const services = mockServices.filter(s => s.category === req.params.category);
    res.json(services);
  }
});

// Create new service (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, duration, imageUrl } = req.body;

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      return res.status(500).json({ error: 'Firebase not configured for admin operations' });
    }

    const serviceData = {
      name,
      description,
      price: parseFloat(price),
      category,
      duration,
      imageUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true
    };

    const docRef = await admin.firestore()
      .collection('services')
      .add(serviceData);

    res.status(201).json({
      message: 'Service created successfully',
      id: docRef.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update service (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category, duration, imageUrl, isActive } = req.body;

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      return res.status(500).json({ error: 'Firebase not configured for admin operations' });
    }

    await admin.firestore()
      .collection('services')
      .doc(req.params.id)
      .update({
        name,
        description,
        price: parseFloat(price),
        category,
        duration,
        imageUrl,
        isActive,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      return res.status(500).json({ error: 'Firebase not configured for admin operations' });
    }

    await admin.firestore()
      .collection('services')
      .doc(req.params.id)
      .delete();

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 