const express = require('express');
const router = express.Router();

// In-memory storage for development (replace with database in production)
let bookings = [];

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      serviceId, 
      serviceName,
      eventDate, 
      eventTime, 
      eventLocation, 
      guestCount, 
      specialRequirements,
      budget 
    } = req.body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !serviceId || !eventDate) {
      return res.status(400).json({ 
        error: 'Please fill in all required fields' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ 
        error: 'Please enter a valid email address' 
      });
    }

    // Date validation
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({ 
        error: 'Event date cannot be in the past' 
      });
    }

    const bookingData = {
      id: Date.now().toString(),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      serviceId,
      serviceName: serviceName || 'Custom Service',
      eventDate: eventDate,
      eventTime: eventTime || '',
      eventLocation: eventLocation || '',
      guestCount: guestCount || 0,
      specialRequirements: specialRequirements || '',
      budget: budget || 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      await admin.firestore()
        .collection('bookings')
        .add({
          ...bookingData,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
      // Firebase not available, use in-memory storage
      bookings.push(bookingData);
      console.log('Booking stored in memory (development mode)');
    }

    // Send confirmation email (implement with your preferred email service)
    console.log('📅 New Booking:');
    console.log(`Customer: ${customerName} (${customerEmail})`);
    console.log(`Service: ${serviceName}`);
    console.log(`Date: ${eventDate} at ${eventTime}`);
    console.log(`Location: ${eventLocation}`);

    res.status(201).json({
      message: 'Booking submitted successfully! We will contact you soon to confirm details.',
      bookingId: bookingData.id,
      success: true
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      error: 'Failed to submit booking. Please try again.' 
    });
  }
});

// Get all bookings (Admin only)
router.get('/', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const bookingsSnapshot = await admin.firestore()
        .collection('bookings')
        .orderBy('createdAt', 'desc')
        .get();

      const allBookings = [];
      bookingsSnapshot.forEach(doc => {
        allBookings.push({
          id: doc.id,
          ...doc.data()
        });
      });

      res.json(allBookings);
    } catch (error) {
      // Firebase not available, use in-memory storage
      res.json(bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const bookingDoc = await admin.firestore()
        .collection('bookings')
        .doc(req.params.id)
        .get();

      if (!bookingDoc.exists) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json({
        id: bookingDoc.id,
        ...bookingDoc.data()
      });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const booking = bookings.find(b => b.id === req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(booking);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bookings by customer email
router.get('/customer/:email', async (req, res) => {
  try {
    const customerEmail = req.params.email.toLowerCase();

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const bookingsSnapshot = await admin.firestore()
        .collection('bookings')
        .where('customerEmail', '==', customerEmail)
        .orderBy('createdAt', 'desc')
        .get();

      const customerBookings = [];
      bookingsSnapshot.forEach(doc => {
        customerBookings.push({
          id: doc.id,
          ...doc.data()
        });
      });

      res.json(customerBookings);
    } catch (error) {
      // Firebase not available, use in-memory storage
      const customerBookings = bookings.filter(b => b.customerEmail === customerEmail);
      res.json(customerBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking status (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const { status, adminNotes, price, confirmedDate, confirmedTime } = req.body;

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const updateData = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (status) updateData.status = status;
      if (adminNotes) updateData.adminNotes = adminNotes;
      if (price) updateData.price = parseFloat(price);
      if (confirmedDate) updateData.confirmedDate = confirmedDate;
      if (confirmedTime) updateData.confirmedTime = confirmedTime;

      await admin.firestore()
        .collection('bookings')
        .doc(req.params.id)
        .update(updateData);

      res.json({ message: 'Booking updated successfully' });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const bookingIndex = bookings.findIndex(b => b.id === req.params.id);
      if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      if (status) bookings[bookingIndex].status = status;
      if (adminNotes) bookings[bookingIndex].adminNotes = adminNotes;
      if (price) bookings[bookingIndex].price = parseFloat(price);
      if (confirmedDate) bookings[bookingIndex].confirmedDate = confirmedDate;
      if (confirmedTime) bookings[bookingIndex].confirmedTime = confirmedTime;
      bookings[bookingIndex].updatedAt = new Date().toISOString();

      res.json({ message: 'Booking updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete booking (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      await admin.firestore()
        .collection('bookings')
        .doc(req.params.id)
        .delete();

      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const bookingIndex = bookings.findIndex(b => b.id === req.params.id);
      if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      bookings.splice(bookingIndex, 1);
      res.json({ message: 'Booking deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 