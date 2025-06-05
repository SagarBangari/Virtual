import HttpError from '../models/errorModel.js';
import User from '../models/userModel.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {v4 as uuid} from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import cloudinary from '../utils/cloudinary.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const registerUser = async(req,res,next) =>{
    try{
        const {fullname,email,password,confirmPassword} = req.body;
        if(!fullname |!email |!password|!confirmPassword){
            return next(new HttpError("Fill in all the fields",422))
        }

        const lowerCasedEmail = email.toLowerCase();
        const emailExits = await userModel.findOne({email:lowerCasedEmail})
        if(emailExits){
            return next(new HttpError("Email already exists",422))
        }
        if(password != confirmPassword){
            return next(new HttpError("Passwords do not match",422))
        }
        if(password.length < 6){
            return next(new HttpError("Password should be atleast 6 charecters"))
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await userModel.create({fullname,email:lowerCasedEmail,password:hashedPassword})
        res.json(newUser).status(201)
    }catch(error){
      return next(new HttpError(error))
    }
}



export const loginUser =async (req,res,next) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return next(new HttpError("Fill in all the fields",422))
        }
        const lowerCasedEmail = email.toLowerCase();
        const user = await userModel.findOne({email:lowerCasedEmail})
        if(!user){
            return next(new HttpError("Invalid credentials",422))
        }
        const comparedPass = await bcrypt.compare(password,user?.password)
        if(!comparedPass){
            return next(new HttpError("Invalid credentials",422))
        }
        const token = await jwt.sign({id:user?._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.json({token,user}).status(200)
    }catch(error){
      return next(new HttpError(error))
    }
}






export const getUser = async(req,res,next) =>{
    try{
       const {id} = req.params
       const user = await userModel.findById(id)
       if(!user){
        return next(new HttpError("User not found",422))
       }
       res.json(user).status(200)
    }catch(error){
      return next(new HttpError(error))
    }
}






export const getUsers = async(req,res,next) =>{
    try{
        const users = await userModel.find().limit(10).sort({createdAt:-1})
        res.json(users).status(200)
    }catch(error){
      return next(new HttpError(error))
    }
}






export const editUser = async(req,res,next) =>{
    try{
       const {fullname , bio} = req.body
       const editeedUser = await userModel.findByIdAndUpdate(req.user.id,{fullname,bio},{new:true})
       res.json(editeedUser).status(200)
    }catch(error){
      return next(new HttpError(error))
    }
}




export const followUser = async(req,res,next) =>{
    try{
        const userToFollowId = req.params.id
        if(req.user.id == userToFollowId){
            return next(new HttpError("You cant follow/unfollow yourself",422))
        }
        const currUser = await userModel.findById(req.user.id)
        const isFollowing = currUser?.following?.includes(userToFollowId)

        if(!isFollowing){
            const updatedUser = await userModel.findByIdAndUpdate(userToFollowId,{$push:{followers:req.user.id}},{new:true})
            await userModel.findByIdAndUpdate(req.user.id,{$push:{following:userToFollowId}},{new:true})
            res.json(updatedUser).status(200)
        }else{
            const updatedUser = await userModel.findByIdAndUpdate(userToFollowId,{$pull:{followers:req.user.id}},{new:true})
            await userModel.findByIdAndUpdate(req.user.id,{$pull:{following:userToFollowId}},{new:true})
            res.json(updatedUser).status(200)
        }

    }catch(error){
      return next(new HttpError(error))
    }
}







export const changeUserAvatar = async(req,res,next) =>{
    try{
        if(!req.files.avatar){
            return next(new HttpError("Please choose a image",422))
        }
        const {avatar} = req.files
        if(avatar.size > 500000){
            return next(new HttpError("File is too big",422))
        }
        let filename = avatar.name
        let splittedFilename = filename?.split(".")
        let newfilename = splittedFilename[0]+uuid()+"."+splittedFilename[splittedFilename.length-1]
        avatar.mv(path.join(__dirname,"..","uploads",newfilename ), async(err)=>{
            if(err){
                return next(new HttpError(err))
            }
            const result = await cloudinary.uploader.upload(path.join(__dirname,"..","uploads",newfilename),
            {resource_type:"image"} );
            if(!result.secure_url){
                return next(new HttpError("could't upload image to cloudinary"))
            }
            const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {profile_photo:result?.secure_url},{new:true})
            res.json(updatedUser).status(200)
        })
    }catch(error){
      return next(new HttpError(error))
    }
}