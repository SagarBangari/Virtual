import { Schema,model } from "mongoose";

const commentSchema = new Schema({
    creator:{type:{creatorId:{type:Schema.Types.ObjectId,ref:"User"},creatorName:{type:String, required : true},creatorPhoto:{type:String,required:true} }},
    postId:{type:Schema.Types.ObjectId,ref:"Post"},
    comment :{type:String,required :true}
})
const commentModel = model("Comment",commentSchema)
export default commentModel