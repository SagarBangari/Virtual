import HttpError from "../models/errorModel.js";
import postModel from '../models/postModel.js';
import userModel from '../models/userModel.js';
import {v4 as uuid} from 'uuid';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createPost = async(req , res , next)=>{
    try{
        const{body} = req.body;
        if(!body){
            return next(new HttpError("Fill in text field and choose image"))
        }
        if(!req.files.image){
            return next(new HttpError("Please choose and image",422))
        }
        else{
            const {image} = req.files;
            if(image.size > 1000000){
                return next(new HttpError("Profile picture is too big . should be less than 500kb",422))
            }
            let fileName = image.name;
            fileName = fileName.split(".")
            fileName = fileName[0] + uuid() + "." + fileName[fileName.length-1]
            await image.mv(path.join(__dirname,'..','uploads',fileName),async(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
                const result = await cloudinary.uploader.upload(path.join(__dirname,'..','uploads',fileName),{resource_type:"image"})
                if(!result.secure_url){
                    return next(new HttpError("could not upload image to clouodin  ary",422))
                }
                const newPost = await postModel.create({creator:req.user.id,body ,image:result.secure_url})
                await userModel.findByIdAndUpdate(newPost?.creator,{$push:{posts:newPost?._id}})
                res.json(newPost)
            })
            
        }
    }catch(err){
        return next(new HttpError(err))
    }
}







export const getPost = async(req , res , next)=>{
    try{
        const {id} = req.params
        const post = await postModel.findById(id).populate("creator").populate({path:"comments",options:{sort:{createdAt:-1}}})
        res.json(post)
    }catch(err){
        return next(new HttpError(error))
    }
}







export const getPosts = async(req , res , next)=>{
    try{
        const posts = await postModel.find().sort({createdAt:-1})
        res.json(posts)
    }catch(err){
        return next(new HttpError(error))
    }
}







export const updatePost = async(req , res , next)=>{
    try{
        const postId = req.params.id
        const {body}= req.body
        const post = await postModel.findById(postId)
        if(post?.creator != req.user.id){
            return next(new HttpError("you can not update the post since you are not the creator",403))
        }
        const updatedPost = await postModel.findByIdAndUpdate(postId,{body},{new:true})
        res.json(updatePost).status(200)
    }catch(err){
        return next(new HttpError(error))
    }
}








export const deletePost = async(req , res , next)=>{
    try{
         const postId = req.params.id
        const post = await postModel.findById(postId)
        if(post?.creator != req.user.id){
            return next(new HttpError("you can not update the post since you are not the creator",403))
        }
        const deletedPost = await postModel.findByIdAndDelete(postId)
        await userModel.findByIdAndUpdate(post?.creator,{$pull:{posts:post?._id}})
        res.json(deletedPost)
    }catch(err){
        return next(new HttpError(error))
    }
}








export const getFollowingPosts = async(req , res , next)=>{
    try{
       const user = await userModel.findById(req.user.id)
       const posts = await postModel.find({creator: {$in:user?.following}})
       res.json(posts)
    }catch(err){
        return next(new HttpError(error))
    }
}









export const likeDislikePost = async(req , res , next)=>{
    try{
        const {id}  = req.params
        const post = await postModel.findById(id)
        let updatedPost
        if(post?.likes.includes(req.user.id)){
            updatedPost = await postModel.findByIdAndUpdate(id,{$pull:{likes:req.user.id}},{new:true})
        }else{
            updatedPost = await postModel.findByIdAndUpdate(id,{$pull:{likes:req.user.id}},{new:true})
        }
        res.json(updatePost)
    }catch(err){
        return next(new HttpError(error))
    }
}




export const getuserPosts = async(req , res , next)=>{
    try{
        const userId = req.params.id
        const posts = await userModel.findById(userId).populate({path:"posts",options:{sort:{createdAt:-1}}})
        res.json(posts)
    }catch(err){
        return next(new HttpError(error))
    }
}



export const createBookmark = async(req , res , next)=>{
    try{
       const {id} = req.params
       const user = await userModel.findById(req.user.id)
       const postIsBookmarked = user?.bookmarks?.includes(id)
       if(postIsBookmarked){
        const userBookmarks = await userModel.findByIdAndUpdate(req.user.id,{$pull:{bookmarks:id}},
            {new:true} )
            res.json(userBookmarks)
       }else{
        const userBookmarks =  await userModel.findByIdAndUpdate(req.user.id,{$push:{bookmarks:id}},
            {new:true})
            res.json(userBookmarks)
       }
    }catch(err){
        return next(new HttpError(error))
    }
}



export const getUserBookmarks = async(req , res , next)=>{
    try{
       const userBookmarks = await userModel.findById(req.user.id).populate({path:"bookmarks",options:{sort:{createdAt:-1}}})
       res.json(userBookmarks)
    }catch(err){
        return next(new HttpError(error))
    }
}

