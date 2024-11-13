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


const knowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: {
    type: imageSchema1, 
    default: defaultImage
  },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Knowledge', knowledgeSchema);
