const express = require('express');
const router = express.Router();

// In-memory user storage for development (replace with database in production)
let users = [
  {
    id: 'admin-1',
    email: 'admin@bigtreat.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
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

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email already exists' 
      });
    }

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      // Create user in Firebase Auth
      const userRecord = await admin.auth().createUser({
        email: email.toLowerCase(),
        password: password,
        displayName: name
      });

      // Store additional user data in Firestore
      await admin.firestore()
        .collection('users')
        .doc(userRecord.uid)
        .set({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          role: 'user',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

      res.status(201).json({
        message: 'User registered successfully',
        userId: userRecord.uid
      });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In production, hash this password
        role: 'user',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      console.log('User registered in memory (development mode)');

      res.status(201).json({
        message: 'User registered successfully',
        userId: newUser.id
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Failed to register user. Please try again.' 
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Please provide email and password' 
      });
    }

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      // This would typically involve Firebase Auth client SDK
      // For now, we'll return a mock response
      res.json({
        message: 'Login successful (Firebase mode)',
        token: 'mock-firebase-token',
        user: {
          email: email.toLowerCase(),
          role: 'user'
        }
      });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
      
      if (!user) {
        return res.status(401).json({ 
          error: 'Invalid email or password' 
        });
      }

      // In production, you would generate a JWT token here
      res.json({
        message: 'Login successful',
        token: 'mock-jwt-token',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Failed to login. Please try again.' 
    });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    // In a real app, you would verify the token here
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      const userDoc = await admin.firestore()
        .collection('users')
        .doc(decodedToken.uid)
        .get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: userDoc.id,
        ...userDoc.data()
      });
    } catch (error) {
      // Firebase not available, use in-memory storage
      // For demo purposes, return the first user
      const user = users[0];
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, email } = req.body;
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      const updateData = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      if (name) updateData.name = name.trim();
      if (email) updateData.email = email.toLowerCase().trim();

      await admin.firestore()
        .collection('users')
        .doc(decodedToken.uid)
        .update(updateData);

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      // Firebase not available, use in-memory storage
      const userIndex = users.findIndex(u => u.id === 'admin-1'); // Demo user
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (name) users[userIndex].name = name.trim();
      if (email) users[userIndex].email = email.toLowerCase().trim();

      res.json({ message: 'Profile updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify token middleware (for other routes)
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Try to use Firebase if available
    let admin;
    try {
      admin = require('firebase-admin');
      
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      // Firebase not available, accept any token for development
      req.user = { uid: 'demo-user', email: 'demo@example.com' };
      next();
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  res.json({ 
    message: 'This is a protected route',
    user: req.user 
  });
});

module.exports = router; 