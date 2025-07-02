
import { Schema,model } from "mongoose";

 const userSchema = new Schema({
    fullname:{type : String , required:true},
    email : {type:String , required:true},
    password : {type:String , required:true},
    profile_photo : {type:String , default : "https://res.cloudinary.com/dzbsavcpp/image/upload/v1749059710/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752_xf8tcr.jpg"},
    bio : {type:String,default : "No bio yet"},
    followers : [{type:Schema.Types.ObjectId , ref:"User"}],
    following : [{type:Schema.Types.ObjectId , ref:"User"}],
    bookmarks : [{type:Schema.Types.ObjectId , ref:"Post"}],
    posts : [{type:Schema.Types.ObjectId , ref:"Post"}],
},{timestamps:true})
const User = model("User", userSchema);

export default User;