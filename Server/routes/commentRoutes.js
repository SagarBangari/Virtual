import express from 'express';

const router = express.Router();
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createComment,getPostComments,deleteComment } from "../controllers/commentController.js";

router.post('/:postId',authMiddleware,createComment)
router.get('/:postId',authMiddleware,getPostComments)
router.delete('/:commentId',authMiddleware,deleteComment)

export default router;