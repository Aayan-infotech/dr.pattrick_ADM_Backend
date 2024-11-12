// controllers/contentController.js
const News = require('../models/newsModel');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Make sure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
  }
});

// Initialize Multer with the storage config
const upload = multer({ storage: storage });

// Controller method to handle image upload
exports.uploadImage = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Send the uploaded file URL as the response
    const imageUrl = `http://localhost:3127/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  });
};
exports.getContents = async (req, res) => {
  try {
    const contents = await News.find();
    res.status(200).json({ message: 'All News', contents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controller code for adding content
exports.addContent = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required.' });
    }

    // Capture file details for thumbnail if it exists
    const thumbnail = req.file
      ? {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
          url: req.file.location // assuming multer-s3 provides the file URL here
        }
      : undefined; // Let the default thumbnail take over if no file is uploaded

    // Create the news document with the provided details
    const news = new News({
      title,
      content,
      thumbnail: thumbnail || undefined // set to default if thumbnail is undefined
    });

    await news.save();
    res.status(201).json(news);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.updateContent = async (req, res) => {
  try {
    // Capture file details for thumbnail if it exists
    const thumbnail = req.file
      ? {
          filename: req.file.key,
          contentType: req.file.mimetype,
          url: req.file.location
        }
      : undefined;

    // Prepare update data with thumbnail if a new one is uploaded
    const updateData = {
      ...req.body,
      ...(thumbnail && { thumbnail })
    };

    // Update the content with the new data
    const content = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'news not found' });
    }

    res.status(200).json({ message: 'News', news });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news by ID', error });
  }
};


exports.deleteContent = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
