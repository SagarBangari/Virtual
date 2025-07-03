import HttpError from "../models/errorModel.js";
import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getReceiverSocketId,io } from "../socket/socket.js";
export const createMessage = async(req,res,next)=>{
    try{
        const {receiverId} = req.params
        const {messageBody} = req.body 
        let conversation = await conversationModel.findOne({participants:{$all:[req.uer.id,receiverId]}})
        if(!conversation){
            conversation = await conversationModel.create({participants :[req.user.id,receiverId],lastMessage:{text:messageBody,senderId:req.user.id}})
        }
        const newMessage = await messageModel.create({conversationId:conversation._id,senderId:req.user.id,text:messageBody})
        await conversation.updateOne({lastMessage:{text:messageBody,senderId:req.user.id}})
        
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        
        res.json(newMessage)
    }catch(err){
        return next(new HttpError(err))
    }
}



export const getMessages = async(req,res,next)=>{
    try{
         const {receiverId} = req.params
         let conversation = await conversationModel.findOne({participants:{$all:[req.uer.id,receiverId]}})
        if(!conversation){
            conversation = await conversationModel.create({participants :[req.user.id,receiverId],lastMessage:{text:messageBody,senderId:req.user.id}})
        }
        const messages = await messageModel.find({conversationId:conversation._id}).sort({createdAt:1})
        res.json(messages)
    }catch(err){
        return next(new HttpError(err))
    }
}





export const getConversations = async(req,res,next)=>{
    try{
         let conversations = await conversationModel.find({participants:req.user.id}).populate({path:"participants",select : "fullName profil_photo"}).sort({createdAt:-1});         
        conversations.forEach((conversation)=>{
            conversation.participants = conversation.participants.filter(
                (participant)=> participant._id.toString() !==req.user.id.toString()
            );
        });
        res.json(conversations)
        }catch(err){
        return next(new HttpError(err))
    }
}

