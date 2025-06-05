import express from 'express';

const router = express.Router();

import {createPost,createBookmark, getPost,getUserBookmarks,getPosts,getFollowingPosts,getuserPosts,updatePost,deletePost,likeDislikePost} from '../controllers/postControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/',createPost)
router.get('/:id',getPost)
router.get('/',getPosts)
router.get('/:id',updatePost)
router.get('/:id',deletePost)
router.get('/:id/like',likeDislikePost)
router.get('/following',getFollowingPosts)
router.get('/:id/bookmark',createBookmark)

