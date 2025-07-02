import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    conversationId:{type:Schema.Types.ObjectId,ref:"Coversation",required:true},
    senderId :{type:Schema.Types.ObjectId,ref:"User",required:true},
    text: {type:String, required:true}
},{timestamps:true})

const messageModel = model("Message",messageSchema);
export default messageModel;