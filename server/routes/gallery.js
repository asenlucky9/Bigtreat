const express = require('express');
const router = express.Router();

// Mock data for development
const mockGallery = [
  {
    id: '1',
    title: 'Traditional Wedding Decoration',
    category: 'weddings',
    description: 'Beautiful traditional wedding setup with cultural elements and modern touches',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop',
    date: '2024-01-15',
    location: 'Benin City',
    tags: ['wedding', 'traditional', 'decoration'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Modern Corporate Event Setup',
    category: 'events',
    description: 'Contemporary corporate event decoration with professional lighting and branding',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=400&fit=crop',
    date: '2024-01-20',
    location: 'Lagos',
    tags: ['corporate', 'modern', 'events'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Bridal Makeup & Styling Session',
    category: 'makeup',
    description: 'Professional bridal makeup and hair styling for the perfect wedding look',
    imageUrl: 'https://images.unsplash.com/photo-148741291-2498d0a9d4e5?w=500&h=400&fit=crop',
    date: '2024-01-25',
    location: 'Benin City',
    tags: ['bridal', 'makeup', 'beauty'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Traditional Bead Jewelry Collection',
    category: 'beads',
    description: 'Handcrafted traditional bead accessories with cultural significance',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=400&fit=crop',
    date: '2024-02-01',
    location: 'Benin City',
    tags: ['beads', 'traditional', 'jewelry'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '5',
    title: 'Elegant Wedding Cake Design',
    category: 'cakes',
    description: 'Custom-designed wedding cake with floral decoration and personalized touches',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    date: '2024-02-05',
    location: 'Benin City',
    tags: ['wedding', 'cake', 'custom'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '6',
    title: 'Benin Traditional Hair Styling',
    category: 'hair',
    description: 'Traditional Benin hair styling for cultural events and celebrations',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&h=400&fit=crop',
    date: '2024-02-10',
    location: 'Benin City',
    tags: ['traditional', 'hair', 'cultural'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '7',
    title: 'Birthday Party Decoration',
    category: 'parties',
    description: 'Colorful and fun birthday party decoration with themed elements',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=400&fit=crop',
    date: '2024-02-15',
    location: 'Benin City',
    tags: ['birthday', 'party', 'decoration'],
    isActive: true,
    createdAt: new Date()
  },
  {
    id: '8',
    title: 'Anniversary Celebration Setup',
    category: 'celebrations',
    description: 'Romantic anniversary celebration with elegant decoration and lighting',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop',
    date: '2024-02-20',
    location: 'Benin City',
    tags: ['anniversary', 'romantic', 'celebration'],
    isActive: true,
    createdAt: new Date()
  }
];

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    // Try to use Firebase if available, otherwise use mock data
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      // Firebase not available, use mock data
      res.json(mockGallery);
      return;
    }

    const gallerySnapshot = await admin.firestore()
      .collection('gallery')
      .where('isActive', '==', true)
      .orderBy('date', 'desc')
      .get();

    const gallery = [];
    gallerySnapshot.forEach(doc => {
      gallery.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(gallery);
  } catch (error) {
    // Fallback to mock data if Firebase fails
    console.log('Using mock gallery data');
    res.json(mockGallery);
  }
});

// Get gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available, otherwise use mock data
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      // Firebase not available, use mock data
      const item = mockGallery.find(g => g.id === req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Gallery item not found' });
      }
      res.json(item);
      return;
    }

    const itemDoc = await admin.firestore()
      .collection('gallery')
      .doc(req.params.id)
      .get();

    if (!itemDoc.exists) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({
      id: itemDoc.id,
      ...itemDoc.data()
    });
  } catch (error) {
    // Fallback to mock data if Firebase fails
    const item = mockGallery.find(g => g.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json(item);
  }
});

// Get gallery items by category
router.get('/category/:category', async (req, res) => {
  try {
    // Try to use Firebase if available, otherwise use mock data
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      // Firebase not available, use mock data
      const items = mockGallery.filter(g => g.category === req.params.category);
      res.json(items);
      return;
    }

    const gallerySnapshot = await admin.firestore()
      .collection('gallery')
      .where('category', '==', req.params.category)
      .where('isActive', '==', true)
      .orderBy('date', 'desc')
      .get();

    const items = [];
    gallerySnapshot.forEach(doc => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(items);
  } catch (error) {
    // Fallback to mock data if Firebase fails
    const items = mockGallery.filter(g => g.category === req.params.category);
    res.json(items);
  }
});

// Create new gallery item (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, imageUrl, date, location, tags } = req.body;

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      return res.status(500).json({ error: 'Firebase not configured for admin operations' });
    }

    const galleryData = {
      title,
      description,
      category,
      imageUrl,
      date,
      location,
      tags: tags || [],
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await admin.firestore()
      .collection('gallery')
      .add(galleryData);

    res.status(201).json({
      message: 'Gallery item created successfully',
      id: docRef.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update gallery item (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, imageUrl, date, location, tags, isActive } = req.body;

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
    } catch (error) {
      return res.status(500).json({ error: 'Firebase not configured for admin operations' });
    }

    await admin.firestore()
      .collection('gallery')
      .doc(req.params.id)
      .update({
        title,
        description,
        category,
        imageUrl,
        date,
        location,
        tags: tags || [],
        isActive,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    res.json({ message: 'Gallery item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete gallery item (Admin only)
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
      .collection('gallery')
      .doc(req.params.id)
      .delete();

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 