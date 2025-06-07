import express from 'express';

const router = express.Router();

import {createPost,createBookmark, getPost,getUserBookmarks,getPosts,getFollowingPosts,getuserPosts,updatePost,deletePost,likeDislikePost} from '../controllers/postControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/',authMiddleware,createPost)
router.get('/following',authMiddleware,getFollowingPosts)
router.get('/:id',authMiddleware,getPost)
router.get('/',authMiddleware,getPosts)
router.patch('/:id',authMiddleware,updatePost)
router.delete('/:id',authMiddleware,deletePost)
router.get('/:id/like',authMiddleware,likeDislikePost)
router.get('/:id/bookmark',authMiddleware,createBookmark)

export default router;
