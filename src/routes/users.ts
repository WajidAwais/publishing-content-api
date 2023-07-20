import express from 'express';

import { handleLogin, handleSignup } from '../controllers/users';
import tryCatchWrapper from '../helpers/tryCatchHelper';

const router = express.Router();

router.post('/signup', tryCatchWrapper(handleSignup));
router.post('/login', tryCatchWrapper(handleLogin));

export default router;
