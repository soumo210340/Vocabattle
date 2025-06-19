const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: [String], required: true },
  xpValue: { type: Number, required: true },
});

module.exports = mongoose.model('Lesson', lessonSchema);
