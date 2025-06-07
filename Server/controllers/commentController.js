import HttpError from "../models/errorModel.js";
import commentModel from "../models/commentsModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";


export const createComment = async(req,res,next) =>{
    try{
       const {postId} = req.params
       const {comment }= req.body
       if(!comment){
        return next(new HttpError("please write a comment",422))
       }
       const commentCreator = await userModel.findById(req.user.id)
       const newComment  =await commentModel.create({creator:{creatorId:req.user.id, creatorName:commentCreator?.fullname,creatorPhoto:commentCreator?.profile_photo},comment,postId})
       await postModel.findByIdAndUpdate(postId,{$push:{comments: newComment?._id}},
    {new:true})
    res.json(newComment)
    } catch(err){
        return next(new HttpError)
    }
}





export const getPostComments = async(req,res,next) =>{
    try{
        const {postId} = req.params
        const comments = await postModel.findById(postId).populate({path:"comments",options : {sort:{createdAt:-1}}})
        res.json(comments)
    } catch(err){
        return next(new HttpError)
    }
}





export const deleteComment = async(req,res,next) =>{
    try{
       const {commentId} = req.params
       const comment = await commentModel.findById(commentId)
       const commentCreator = await userModel.findById(comment?.creator?.creatorId)
       if(commentCreator?._id != req.user.id){
        return next(new HttpError("Unauthorized actions",403))
       }
       await postModel.findByIdAndUpdate(comment?.postId,{$pull:{comments:commentId}})
       const deletedComment = await commentModel.findByIdAndDelete(commentId)
       res.json(deleteComment)
    } catch(err){
        return next(new HttpError)
    }
}





