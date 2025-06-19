import request from 'supertest';
import app from '../../index.js';
import User from '../../models/User.js';
import Lesson from '../../models/Lesson.js';
import jwt from 'jsonwebtoken';

describe('Lesson Controller', () => {
  let token;
  let userId;
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser'
  };

  beforeEach(async () => {
    // Clear database
    await User.deleteMany({});
    await Lesson.deleteMany({});

    // Create test user and get token
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    token = res.body.token;
    userId = res.body.user._id;
  });

  describe('POST /api/lessons', () => {
    const testLesson = {
      title: 'Basic Greetings',
      description: 'Learn common greetings',
      level: 'Beginner',
      content: [
        { type: 'word', original: 'Hello', translation: 'Hola' },
        { type: 'word', original: 'Goodbye', translation: 'Adiós' }
      ]
    };

    it('should create a new lesson', async () => {
      const res = await request(app)
        .post('/api/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send(testLesson);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', testLesson.title);
      expect(res.body).toHaveProperty('content');
      expect(res.body.content).toHaveLength(2);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/lessons')
        .send(testLesson);

      expect(res.statusCode).toBe(401);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/lessons')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/lessons', () => {
    beforeEach(async () => {
      // Create some test lessons
      const lessons = [
        {
          title: 'Lesson 1',
          description: 'First lesson',
          level: 'Beginner',
          content: [{ type: 'word', original: 'Hello', translation: 'Hola' }]
        },
        {
          title: 'Lesson 2',
          description: 'Second lesson',
          level: 'Intermediate',
          content: [{ type: 'word', original: 'Goodbye', translation: 'Adiós' }]
        }
      ];

      await Lesson.insertMany(lessons);
    });

    it('should return all lessons', async () => {
      const res = await request(app)
        .get('/api/lessons')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
    });

    it('should filter lessons by level', async () => {
      const res = await request(app)
        .get('/api/lessons')
        .query({ level: 'Beginner' })
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].level).toBe('Beginner');
    });
  });

  describe('GET /api/lessons/:id', () => {
    let lessonId;

    beforeEach(async () => {
      // Create a test lesson
      const lesson = await Lesson.create({
        title: 'Test Lesson',
        description: 'Test description',
        level: 'Beginner',
        content: [{ type: 'word', original: 'Hello', translation: 'Hola' }]
      });
      lessonId = lesson._id;
    });

    it('should return a specific lesson', async () => {
      const res = await request(app)
        .get(`/api/lessons/${lessonId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', 'Test Lesson');
      expect(res.body).toHaveProperty('content');
    });

    it('should return 404 for non-existent lesson', async () => {
      const fakeId = '60f1a7b9e4b9c1a2b3c4d5e6';
      const res = await request(app)
        .get(`/api/lessons/${fakeId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
    });
  });
});
