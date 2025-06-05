import { Schema, model } from "mongoose";

 const postSchema = new Schema({
    creator : {type:Schema.Types.ObjectId , ref: "User"},
    body : {type:String , required:true},
    image : {type:String , required:true},
    likes : [{type:Schema.Types.ObjectId,ref : "User"}],
    comments : [{type:Schema.Types.ObjectId,ref : "Comment"}],
})  
const postModel = model("Post",postSchema)
export default postModel;