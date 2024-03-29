import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: {
        type: Array
    },
    messages: {
        type: Array
    },
    lastMessage: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Conversation = mongoose.model('conversation', conversationSchema);

export default Conversation;