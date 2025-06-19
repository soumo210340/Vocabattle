const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  status: { type: String, enum: ['completed', 'in-progress'], default: 'in-progress' },
  timestamp: { type: Date, default: Date.now },
  earnedXP: { type: Number, default: 0 },
});

module.exports = mongoose.model('Progress', progressSchema);
