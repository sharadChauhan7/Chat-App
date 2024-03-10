import express from 'express';
import User from '../modals/user.js';
import { signup,login } from '../controllers/auth.controller.js';
const router = express.Router();


router.post('/register',signup);
router.post('/login',login);

export default router;

