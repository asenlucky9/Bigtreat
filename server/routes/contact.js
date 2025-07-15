const express = require('express');
const router = express.Router();

// In-memory storage for development (replace with database in production)
let contactMessages = [];

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Please fill in all required fields' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please enter a valid email address' 
      });
    }

    const contactData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString(),
      read: false
    };

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      await admin.firestore()
        .collection('contacts')
        .add({
          ...contactData,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
      // Firebase not available, use in-memory storage
      contactMessages.push(contactData);
      console.log('Contact message stored in memory (development mode)');
    }

    // Send email notification (implement with your preferred email service)
    // For now, we'll just log it
    console.log('📧 New Contact Message:');
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    res.status(201).json({
      message: 'Thank you for your message! We will get back to you soon.',
      success: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to send message. Please try again.' 
    });
  }
});

// Get all contact messages (Admin only)
router.get('/', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const contactsSnapshot = await admin.firestore()
        .collection('contacts')
        .orderBy('createdAt', 'desc')
        .get();

      const contacts = [];
      contactsSnapshot.forEach(doc => {
        contacts.push({
          id: doc.id,
          ...doc.data()
        });
      });

      res.json(contacts);
    } catch (error) {
      // Firebase not available, use in-memory storage
      res.json(contactMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contact message by ID (Admin only)
router.get('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const contactDoc = await admin.firestore()
        .collection('contacts')
        .doc(req.params.id)
        .get();

      if (!contactDoc.exists) {
        return res.status(404).json({ error: 'Contact message not found' });
      }

      res.json({
        id: contactDoc.id,
        ...contactDoc.data()
      });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const contact = contactMessages.find(c => c.id === req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact message not found' });
      }
      res.json(contact);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact message status (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { status, read, notes } = req.body;

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const updateData = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (status) updateData.status = status;
      if (read !== undefined) updateData.read = read;
      if (notes) updateData.notes = notes;

      await admin.firestore()
        .collection('contacts')
        .doc(req.params.id)
        .update(updateData);

      res.json({ message: 'Contact message updated successfully' });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const contactIndex = contactMessages.findIndex(c => c.id === req.params.id);
      if (contactIndex === -1) {
        return res.status(404).json({ error: 'Contact message not found' });
      }

      if (status) contactMessages[contactIndex].status = status;
      if (read !== undefined) contactMessages[contactIndex].read = read;
      if (notes) contactMessages[contactIndex].notes = notes;
      contactMessages[contactIndex].updatedAt = new Date().toISOString();

      res.json({ message: 'Contact message updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete contact message (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      await admin.firestore()
        .collection('contacts')
        .doc(req.params.id)
        .delete();

      res.json({ message: 'Contact message deleted successfully' });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const contactIndex = contactMessages.findIndex(c => c.id === req.params.id);
      if (contactIndex === -1) {
        return res.status(404).json({ error: 'Contact message not found' });
      }

      contactMessages.splice(contactIndex, 1);
      res.json({ message: 'Contact message deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 