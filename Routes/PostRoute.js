import express from 'express';
import { createPost,getPost,updatePost,postLiked,postTimeline} from '../Controller/PostContolleer.js';

const router = express.Router();

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.put('/:id/like',postLiked)
router.get('/:id/timeline',postTimeline)
export default router