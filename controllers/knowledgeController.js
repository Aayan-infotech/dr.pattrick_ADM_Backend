// controllers/contentController.js
const Knowledge = require('../models/knowledgeModel');
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
    const imageUrl = `http://44.196.192.232:3127/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  });
};


exports.getContents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Create search criteria for the title or content
    const searchCriteria = search
      ? { $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]}
      : {};

    // Fetch Knowledge with pagination and search
    const contents = await Knowledge.find(searchCriteria)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // Count total documents for pagination metadata
    const total = await Knowledge.countDocuments(searchCriteria);

    res.status(200).json({
      message: 'All Knowledge',
      data: contents,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
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

    // Create the Knowledge document with the provided details
    const knowledge = new Knowledge({
      title,
      content,
      thumbnail: thumbnail || undefined // set to default if thumbnail is undefined
    });

    await knowledge.save();
    res.status(201).json(knowledge);

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
    const content = await Knowledge.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getKnowledgeById = async (req, res) => {
  try {
    const knowledgeId = req.params.id;
    const knowledge = await Knowledge.findById(knowledgeId);

    if (!knowledge) {
      return res.status(404).json({ message: 'Knowledge not found' });
    }

    res.status(200).json({ message: 'Knowledge', knowledge });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching knowledge by ID', error });
  }
};


exports.deleteContent = async (req, res) => {
  try {
    await Knowledge.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
