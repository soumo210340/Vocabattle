const Lesson = require('../models/Lesson');

exports.getLessons = (req, res) => {
  res.send('Get lessons');
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createLesson = async (req, res) => {
  const { title, description, content, xpValue } = req.body;
  try {
    const lesson = new Lesson({ title, description, content, xpValue });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
