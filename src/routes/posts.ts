import express from 'express';

import { addPost, getPosts } from '../controllers/posts';
import tryCatchWrapper from '../helpers/tryCatchHelper';
import authenticateToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, tryCatchWrapper(getPosts));
router.post('/', authenticateToken, tryCatchWrapper(addPost));

export default router;
