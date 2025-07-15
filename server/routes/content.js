const express = require('express');
const router = express.Router();

// In-memory content storage for development
let siteContent = {
  home: {
    heroTitle: 'Creating Magical Moments That Last Forever',
    heroSubtitle: 'From elegant weddings to corporate events, we transform your vision into reality with professional event planning, stunning decorations, and exceptional beauty services.',
    heroImage: '',
    videoUrl: '',
    stats: [
      { number: '500+', label: 'Happy Clients', icon: 'Users' },
      { number: '1000+', label: 'Events Completed', icon: 'Calendar' },
      { number: '5+', label: 'Years Experience', icon: 'Award' },
      { number: '100%', label: 'Satisfaction Rate', icon: 'Star' }
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Bride',
        content: 'Big Treat made our wedding day absolutely magical. Every detail was perfect and the team was incredibly professional.',
        avatar: ''
      }
    ]
  },
  about: {
    title: 'About Us',
    description: 'Big Treat Unique Centre Nigeria Ltd is a leading event and beauty business in Benin City.',
    heroImage: '',
    team: [
      {
        name: 'Mrs. Grace Okafor',
        role: 'Founder',
        bio: 'Grace is the visionary behind Big Treat, with over 10 years of experience in event planning and beauty services.',
        photo: ''
      }
    ],
    stats: [
      { number: '500+', label: 'Happy Clients', icon: 'Heart' },
      { number: '1000+', label: 'Events Completed', icon: 'Calendar' },
      { number: '5+', label: 'Years Experience', icon: 'Award' },
      { number: '100%', label: 'Satisfaction Rate', icon: 'Star' }
    ]
  },
  contact: {
    address: 'No 1 Upper Lawani Road, By New Benin Market, Benin City, Edo State, Nigeria',
    phone: '+2348035491639',
    email: 'info@bigtreat.com',
    mapEmbed: '',
    businessHours: [
      'Monday - Saturday: 8:00 AM - 8:00 PM',
      'Sunday: By Appointment'
    ]
  }
};

// GET site content section
router.get('/:section', async (req, res) => {
  const { section } = req.params;
  // Try to use Firebase if available
  let admin;
  try {
    admin = require('firebase-admin');
    const doc = await admin.firestore().collection('siteContent').doc(section).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Content not found' });
    }
    return res.json(doc.data());
  } catch (error) {
    // Firebase not available, use in-memory storage
    if (!siteContent[section]) {
      return res.status(404).json({ error: 'Content not found' });
    }
    return res.json(siteContent[section]);
  }
});

// UPDATE site content section (Admin only)
router.put('/:section', async (req, res) => {
  const { section } = req.params;
  const updates = req.body;
  // Try to use Firebase if available
  let admin;
  try {
    admin = require('firebase-admin');
    await admin.firestore().collection('siteContent').doc(section).set(updates, { merge: true });
    return res.json({ message: 'Content updated successfully' });
  } catch (error) {
    // Firebase not available, use in-memory storage
    if (!siteContent[section]) {
      return res.status(404).json({ error: 'Content not found' });
    }
    siteContent[section] = { ...siteContent[section], ...updates };
    return res.json({ message: 'Content updated successfully' });
  }
});

module.exports = router; 