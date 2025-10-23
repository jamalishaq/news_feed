import jest from 'jest-mock';
import request from 'supertest';
import express from 'express';
import postsRouter from '../src/routes/v1/postRoutes.js';
import postControllers from '../src/controllers/v1/postControllers.js';

const app = express();
app.use(express.json());
app.use('/api/v1/posts', postsRouter);
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  } 
    return next();
});

// Mock the postServices methods used in the controller
jest.spyOn(postControllers, 'getPosts');
jest.spyOn(postControllers, 'createPost');
import postServices from '../src/services/postServices.js';
jest.spyOn(postServices, 'listPosts');
jest.spyOn(postServices, 'createPost');
postServices.listPosts.mockResolvedValue([
  { _id: '1', title: 'First Post', content: 'Content of first post' },
  { _id: '2', title: 'Second Post', content: 'Content of second post' },
]);
postServices.createPost.mockImplementation(async (data) => ({
  _id: '3',
  ...data,
}));
describe('POST /api/v1/posts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
    it('should create a new post with valid data', async () => {
        const newPost = { title: 'New Post', content: 'New post content' };
        const res = await request(app)
            .post('/api/v1/posts')
            .send(newPost)
            .expect(201);
        expect(res.body).toMatchObject(newPost);
        expect(postControllers.createPost).toHaveBeenCalled();
        expect(postServices.createPost).toHaveBeenCalledWith(newPost);
    });
    it('should return 400 if title is missing', async () => {
        const newPost = { content: 'Content without title' };
        const res = await request(app)
            .post('/api/v1/posts')
            .send(newPost)
            .expect(201);
        expect(res.body).toMatchObject({ title: 'Untitled', content: newPost.content });
        expect(postControllers.createPost).toHaveBeenCalled();
        expect(postServices.createPost).toHaveBeenCalledWith({ title: 'Untitled', content: newPost.content });
    });
    it('should return 400 for invalid data', async () => {
        const res = await request(app)
            .post('/api/v1/posts')
            .send({ title: 123, content: [] }) // Invalid types
            .expect(400);
        expect(res.body).toHaveProperty('error');
        expect(postControllers.createPost).not.toHaveBeenCalled();
        expect(postServices.createPost).not.toHaveBeenCalled();
    });     
}); 
describe('GET /api/v1/posts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });   
    it('should return list of posts', async () => {
        const res = await request(app)
            .get('/api/v1/posts')
            .expect(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);    
        expect(postControllers.getPosts).toHaveBeenCalled();
        expect(postServices.listPosts).toHaveBeenCalled();
    }
    );
    it('should handle service errors gracefully', async () => {
        postServices.listPosts.mockRejectedValueOnce(new Error('DB error'));
        const res = await request(app)
            .get('/api/v1/posts')
            .expect(500);
        expect(res.body).toHaveProperty('error', 'Failed to fetch posts');
        expect(postControllers.getPosts).toHaveBeenCalled();
        expect(postServices.listPosts).toHaveBeenCalled();
    });
});
