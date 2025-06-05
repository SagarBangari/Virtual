import HttpError from "../models/errorModel.js";
import postModel from '../models/postModel.js';
import userModel from '../models/userModel.js';
import {v4 as uuid} from 'uuid';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';
import path from 'path';


export const createPost = async(req , res , next)=>{
    try{
        res.json("create post")
    }catch(err){
        return next(new HttpError(error))
    }
}







export const getPost = async(req , res , next)=>{
    try{
        res.json("get post")
    }catch(err){
        return next(new HttpError(error))
    }
}







export const getPosts = async(req , res , next)=>{
    try{
        res.json("get posts")
    }catch(err){
        return next(new HttpError(error))
    }
}







export const updatePost = async(req , res , next)=>{
    try{
        res.json("update post")
    }catch(err){
        return next(new HttpError(error))
    }
}








export const deletePost = async(req , res , next)=>{
    try{
        res.json("delete post")
    }catch(err){
        return next(new HttpError(error))
    }
}








export const getFollowingPosts = async(req , res , next)=>{
    try{
        res.json("get following posts")
    }catch(err){
        return next(new HttpError(error))
    }
}









export const likeDislikePost = async(req , res , next)=>{
    try{
        res.json("like post")
    }catch(err){
        return next(new HttpError(error))
    }
}




export const getuserPosts = async(req , res , next)=>{
    try{
        res.json("get user posts")
    }catch(err){
        return next(new HttpError(error))
    }
}



export const createBookmark = async(req , res , next)=>{
    try{
        res.json("create bookmark")
    }catch(err){
        return next(new HttpError(error))
    }
}



export const getUserBookmarks = async(req , res , next)=>{
    try{
        res.json("get user bookmarks")
    }catch(err){
        return next(new HttpError(error))
    }
}

