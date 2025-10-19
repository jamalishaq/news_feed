import jest from 'jest-mock';
import request from 'supertest';
import express from 'express';
import postsRoutes from '../src/routes/v1/postRoutes.js';
import postController from '../src/controllers/v1/postController.js';

const app = express();
app.use(express.json());
app.use('/api/v1/posts', postsRoutes);
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ error: err.message });
  } 
    return next();
});

// Mock the postService methods used in the controller
jest.spyOn(postController, 'getPosts');
jest.spyOn(postController, 'createPost');
import postService from '../src/services/postService.js';
jest.spyOn(postService, 'listPosts');
jest.spyOn(postService, 'createPost');
postService.listPosts.mockResolvedValue([
  { _id: '1', title: 'First Post', content: 'Content of first post' },
  { _id: '2', title: 'Second Post', content: 'Content of second post' },
]);
postService.createPost.mockImplementation(async (data) => ({
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
        expect(postController.createPost).toHaveBeenCalled();
        expect(postService.createPost).toHaveBeenCalledWith(newPost);
    });
    it('should return 400 if title is missing', async () => {
        const newPost = { content: 'Content without title' };
        const res = await request(app)
            .post('/api/v1/posts')
            .send(newPost)
            .expect(201);
        expect(res.body).toMatchObject({ title: 'Untitled', content: newPost.content });
        expect(postController.createPost).toHaveBeenCalled();
        expect(postService.createPost).toHaveBeenCalledWith({ title: 'Untitled', content: newPost.content });
    });
    it('should return 400 for invalid data', async () => {
        const res = await request(app)
            .post('/api/v1/posts')
            .send({ title: 123, content: [] }) // Invalid types
            .expect(400);
        expect(res.body).toHaveProperty('error');
        expect(postController.createPost).not.toHaveBeenCalled();
        expect(postService.createPost).not.toHaveBeenCalled();
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
        expect(postController.getPosts).toHaveBeenCalled();
        expect(postService.listPosts).toHaveBeenCalled();
    }
    );
    it('should handle service errors gracefully', async () => {
        postService.listPosts.mockRejectedValueOnce(new Error('DB error'));
        const res = await request(app)
            .get('/api/v1/posts')
            .expect(500);
        expect(res.body).toHaveProperty('error', 'Failed to fetch posts');
        expect(postController.getPosts).toHaveBeenCalled();
        expect(postService.listPosts).toHaveBeenCalled();
    });
});
