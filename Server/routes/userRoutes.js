import express from 'express';

const router = express.Router();

import { registerUser,loginUser,getUser,getUsers,editUser,followUser,changeUserAvatar } from '../controllers/userControllers.js';
import {getuserPosts,getUserBookmarks  } from '../controllers/postControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/bookmarks',authMiddleware,getUserBookmarks) 
router.get('/:id',authMiddleware,getUser)
router.get('/',authMiddleware,getUsers)
router.patch('/:id',authMiddleware,editUser)
router.get('/:id/follow',authMiddleware,followUser)
router.post('/avatar',authMiddleware,changeUserAvatar)
router.get('/:id/posts',authMiddleware,getuserPosts )
export default router;