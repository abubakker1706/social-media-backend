import express from 'express';
import { getUser ,updateUser,deleteUser,followUser,UnfollowUser ,getAllUser} from '../Controller/UserController.js';

const router = express.Router();

router.get('/',getAllUser)
router.get('/:id',getUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',UnfollowUser)

export default router;