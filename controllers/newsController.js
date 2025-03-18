// controllers/contentController.js
const mongoose = require("mongoose");
const News = require('../models/newsModel');
const User = require('../models/userModel');
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



// controller code for adding content
exports.addContent = async (req, res) => {
  try {
    const { title, keywords, content, referenceLink } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    let parsedKeywords = [];

    if (keywords) {
      if (Array.isArray(keywords)) {
        parsedKeywords = keywords;
      } else if (typeof keywords === "string") {
        if (keywords.startsWith("[") && keywords.endsWith("]")) {
          try {
            parsedKeywords = JSON.parse(keywords);
            if (!Array.isArray(parsedKeywords)) {
              throw new Error();
            }
          } catch (error) {
            return res.status(400).json({ message: "Invalid keywords format. Must be a valid JSON array." });
          }
        } else {
          parsedKeywords = [keywords];
        }
      } else {
        return res.status(400).json({ message: "Invalid keywords format. Must be an array." });
      }
    }

    const thumbnail = req.file
      ? {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        url: req.file.location,
      }
      : undefined;

    const news = new News({
      title,
      keywords: parsedKeywords,
      content,
      referenceLink,
      thumbnail: thumbnail || undefined,
    });

    await news.save();

    res.status(201).json(news);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all News
exports.getContents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Convert page and limit to numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Create search criteria for the title or content
    const searchCriteria = search
      ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      }
      : {};

    // Fetch news with pagination and search
    const contents = await News.find(searchCriteria)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // Count total documents for pagination metadata
    const total = await News.countDocuments(searchCriteria);

    res.status(200).json({
      message: 'All News',
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

// Get news content by Id
exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'news not found' });
    }

    // Increment the views count
    news.views += 1;
    await news.save();

    res.status(200).json({ message: 'News', news });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news by ID', error });
  }
};

//  Update added News details by newsId
exports.updateContent = async (req, res) => {
  try {
    let { title, keywords, content, referenceLink } = req.body;
    let parsedKeywords = [];

    if (keywords) {
      if (Array.isArray(keywords)) {
        parsedKeywords = keywords;
      } else if (typeof keywords === "string") {
        try {
          parsedKeywords = JSON.parse(keywords);
          if (!Array.isArray(parsedKeywords)) {
            parsedKeywords = [keywords]; // If it's a single string, treat it as a single keyword
          }
        } catch (error) {
          parsedKeywords = [keywords]; // Treat as a single keyword if JSON parsing fails
        }
      } else {
        return res.status(400).json({ message: "Invalid keywords format. Must be an array or a string." });
      }
    }

    const thumbnail = req.file
      ? {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        url: req.file.location,
      }
      : undefined;

    const updateData = {
      title,
      keywords: parsedKeywords,
      content,
      referenceLink,
      ...(thumbnail && { thumbnail })
    };

    const contentUpdated = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!contentUpdated) {
      return res.status(404).json({ message: "Content not found." });
    }

    res.status(200).json(contentUpdated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add a comment to a news article use directly newsId and userId in Params
exports.addComment = async (req, res) => {
  try {
    const { newsId, userId } = req.params;
    let { text } = req.body;

    // Check if all required fields are present
    if (!newsId || !userId || !text) {
      return res.status(400).json({ message: "News ID, User ID, and Comment text are required." });
    }

    // Trim and Validate Comment Text
    text = text.trim();
    if (!text) {
      return res.status(400).json({ message: "Comment text cannot be empty." });
    }

    if (text.length > 500) {
      return res.status(400).json({ message: "Comment text exceeds 500 characters." });
    }

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the news article
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News not found." });
    }

    // Prepare the comment object
    const newComment = { userId, text, createdAt: new Date(), };

    // Push and save
    news.comments.push(newComment);
    await news.save();

    res.status(200).json({ message: "Comment added successfully", news });

  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};

// Fetch all comments for a specific news article with user details
exports.getComments = async (req, res) => {
  try {
    const { newsId } = req.params;

    // Check if news exists and populate comments with user details
    const news = await News.findById(newsId).populate({
      path: "comments.userId",
      select: "firstName lastName", // Fetch user's first name and last name
    });

    if (!news) {
      return res.status(404).json({ message: "News not found." });
    }

    // Extract news title
    const newsTitle = news.title;

    // Format the comments response
    const formattedComments = news.comments.map(comment => ({
      _id: comment._id,
      userId: comment.userId?._id,
      firstName: comment.userId?.firstName || "Unknown",
      lastName: comment.userId?.lastName || "User",
      text: comment.text,
      createdAt: comment.createdAt,
    }));

    res.status(200).json({
      message: "All comments fetched successfully",
      newsTitle,  // Sending news title only once
      comments: formattedComments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

// Delete news's content by Id
exports.deleteContent = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a specific comment from a news article
exports.deleteComment = async (req, res) => {
  try {
    const { newsId, commentId } = req.params;

    // Find the news article
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News not found." });
    }

    // Find the comment index
    const commentIndex = news.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // Remove the comment from the array
    news.comments.splice(commentIndex, 1);

    // Save the updated news document
    await news.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};

