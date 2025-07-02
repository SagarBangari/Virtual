import { Schema, model } from "mongoose";

const conversationSchema = new Schema({
    participants:[{type:Schema.Types.ObjectId,ref:"User"}],
    lastMessage :{
        text : {type:String , reuired:true},
        senderId:{type:Schema.Types.ObjectId,ref:"User"}
    }
},{timestamps:true})

const conversationModel = model("Conversation",conversationSchema);
export default conversationModel;