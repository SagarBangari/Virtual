import express from 'express';

const router = express.Router();

import { registerUser,loginUser,getUser,getUsers,editUser,followUser,changeUserAvatar } from '../controllers/userControllers.js';
import {createPost,createBookmark, getPost,getUserBookmarks,getPosts,getFollowingPosts,getuserPosts,updatePost,deletePost,likeDislikePost} from '../controllers/postControllers.js';
import { createComment,getPostComments,deleteComment } from "../controllers/commentController.js";
import { createMessage,getMessages,getConversations } from '../controllers/messageControlers.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

router.post('/users/register',registerUser)
router.post('/users/login',loginUser)
router.get('/users/bookmarks',authMiddleware,getUserBookmarks) 
router.get('/users/:id',authMiddleware,getUser)
router.get('/users/',authMiddleware,getUsers)
router.patch('/users/:id',authMiddleware,editUser)
router.get('/users/:id/follow',authMiddleware,followUser)
router.post('/users/avatar',authMiddleware,changeUserAvatar)
router.get('/users/:id/posts',authMiddleware,getuserPosts )

router.post('/posts/',authMiddleware,createPost)
router.get('/posts/following',authMiddleware,getFollowingPosts)
router.get('/posts/:id',authMiddleware,getPost)
router.get('/posts/',authMiddleware,getPosts)
router.patch('/posts/:id',authMiddleware,updatePost)
router.delete('/posts/:id',authMiddleware,deletePost)
router.get('/posts/:id/like',authMiddleware,likeDislikePost)
router.get('/posts/:id/bookmark',authMiddleware,createBookmark)


router.post('/comments/:postId',authMiddleware,createComment)
router.get('/comments/:postId',authMiddleware,getPostComments)
router.delete('/comments/:commentId',authMiddleware,deleteComment)


router.post('/messages/:receiverID',authMiddleware,createMessage)
router.get('/messages/:receiverId',authMiddleware,getMessages)
router.get('/conversations',authMiddleware,getConversations)

export default router;