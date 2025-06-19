const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const User = require('../models/User');

exports.completeLesson = async (req, res) => {
  const userId = req.user.id;
  const { lessonId } = req.body;
  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    // Mark progress
    const progress = new Progress({
      userId,
      lessonId,
      status: 'completed',
      earnedXP: lesson.xpValue,
    });
    await progress.save();
    // Update user XP
    await User.findByIdAndUpdate(userId, { $inc: { xp: lesson.xpValue } });
    res.status(201).json({ message: 'Lesson completed', progress });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
