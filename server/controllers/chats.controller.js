
import Conversation from '../modals/Conversations.js';

export const getConversations = async (req, res) => {
    let { userID, friendId } = req.body;
    let conversation = await Conversation.findOne({ members: [userID, friendId] });
    console.log(conversation);
    if(conversation){
        res.send(conversation);
    }
    else{
        res.send("No Convo");
    }
}

export const setConversation = async (req, res) => {
    let { userID, friendId, chats } = req.body;
    let lastmessage = chats[chats.length - 1];
    // Check if conversation already exists
    let Convo = await Conversation.findOne({ members: [userID, friendId] });

    if (!Convo) {
        let conversation = new Conversation({
            members: [userID, friendId],
            messages: chats,
            lastMessage: lastmessage
        });
        await conversation.save();
        res.send("Conversation created");
    }
    else {
        Convo.messages = chats.map((chats)=>{
            return {content:chats.content,from:chats.from}
        });

        Convo.lastMessage = chats[chats.length - 1];
        await Conversation.updateOne({ members: [userID, friendId] }, { messages: Convo.messages,lastMessage: Convo.lastMessage },);
        res.send("Conversation updated");
    }
}