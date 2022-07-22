import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";
import e from "express";

// creating post 

export const createPost =async(req,res)=>{
                         const newPost = new PostModel(req.body)
                         try{
                            await newPost.save()
                            res.status(200).json(newPost)

                         }catch(err){
                         console.log(err)
                         }
}

export const getPost = async(req,res)=>{
                         const id = req.params.id

                         try{
                                const post = await PostModel.findById(id)
                                  res.status(200).json(post)
                         }catch(err){console.log(err)}
}
// update post 

export const updatePost = async(req, res)=>{
                         const postId = req.params.id
                         const{userId} = req.body

try{
                         const post = await PostModel.findById(postId)
if(post.userId===userId){
     await post.updateOne({$set:req.body})
     res.status(200).json('post updated successfully')
}else{
                         res.status(403).json('action denied')
}

}catch(err){console.log(err)}
}

//DeletePost

export const deletePost = async(req, res) => {
const postId = req.params.id;
const {userId} = req.body

try {
const post = await PostModel.findById(postId)
if (post.userId===userId) {
await post.deleteOne()  
res.status(200).json('post delete successfully')
}

}catch(err){console.log(err)}
}
//like and dislike the post 

export const postLiked= async(req, res)=>{
                const postId = req.params.id;
                const{userId}= req.body;
                try{
                const post = await PostModel.findById(postId)
                if(!post.likes.includes(userId)){
                  await post.updateOne({$push:{likes:userId}})
                  res.status(200).json('post is liked')
                }else{
                         await post.updateOne({$pull:{likes:userId}})
                         res.status(200).json('post is disliked')    
                }

                }catch (err){
                     console.log(err)
                }     

}


//user post timeline


export const postTimeline = async(req, res)=>{
                         const userId = req.params.id

         try{
            const CurrentUser = await PostModel.find({userId: userId});
            const followingUser= await UserModel.aggregate([
                         {
                         $match:{
                         _id:new mongoose.Types.ObjectId(userId)
                         }
                             }, 
                        {
                         $lookup:{
                                from:"posts",
                                localField:"following",
                                foreignField:"userId",
                                as:"followingPosts"
                         }
                             }, 
                        {
                         $project:{
                                    followingPosts:1,
                                    _id:0              
                         }
                      
                         },
            ])

            res.status(200).json(CurrentUser.concat(...followingUser[0].followingPosts)
            .sort((a,b)=>{
               return new Date(b.createdAt) - new Date(a.createdAt); 
            })// this sort function will give latest post
            )
            
            //concat will give array of object which is complex to fetch data thats why we are using spread operatorand targeting [0] in following post
         }catch (err){
                         console.log(err)
         }
}