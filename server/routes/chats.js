import  express  from "express";
import {setConversation,getConversations} from '../controllers/chats.controller.js';

const router = express.Router();

router.post('/setconversation',setConversation);
router.post('/getconversation',getConversations);

export default router;
