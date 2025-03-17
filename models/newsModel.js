// models/contentModel.js
const mongoose = require('mongoose');

const defaultImage = {
  filename: 'default-image.jpg',
  contentType: 'image/png',
  url: 'https://drpatadmin.s3.eu-west-2.amazonaws.com/thumbnail.png'
};

const imageSchema1 = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  url: { type: String, required: true }
});

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    keywords: [{ type: String }],
    thumbnail: { type: imageSchema1, default: defaultImage },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    referenceLink: { type: String },
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now } 
      }
    ],    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('News', newsSchema);
