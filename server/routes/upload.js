const express = require('express');
const multer = require('multer');
const router = express.Router();

// Multer setup for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload - handle image upload
router.post('/', upload.single('image'), async (req, res) => {
  // Try to use Firebase Storage if available
  let admin;
  try {
    admin = require('firebase-admin');
    const bucket = admin.storage().bucket();
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const fileName = `uploads/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype }
    });
    await fileUpload.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return res.json({ url: publicUrl });
  } catch (error) {
    // Firebase not available, return placeholder image
    return res.json({ url: 'https://via.placeholder.com/300x300?text=Uploaded+Image' });
  }
});

module.exports = router; 