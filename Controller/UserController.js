import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//getAllUser
export const getAllUser= async (req, res) =>{

  try{

    let user = await UserModel.find()
    user=user.map((users)=>{
      const{password,...otherDetails} = users._doc
      return otherDetails
     
    })
    res.status(200).json(user)
  }catch(err){
console.log(err)
  }
}

//getUser

export const getUser=async(req,res)=>{

const id = req.params.id;

try{
const user = await UserModel.findById(id);
if(user){
res.status(200).json(user);
}else{
res.status(404).json({message:'user not found'});
}

}catch(err){
                         console.log(err);
}
}
// update user

export const updateUser = async(req, res)=>{
const id = req.params.id;
 const {_id,currentUserAdminStatus,password} = req.body;
 if(password){
const salt = await bcrypt.genSalt(10)
req.body.password= await bcrypt.hash(password,salt)
 }
 
if (id===_id){
 try{
const user = await UserModel.findByIdAndUpdate(id,req.body,{new:true})//id =>we are find userby id,req.body=>which part of body is user is updating ,new:true give updated user data
const token=jwt.sign({
  username:user.username,
  id:user._id
},process.env.JWT_KEY,{expiresIn:"1h"})
res.status(200).json({user,token})
 }
 
 
 catch(err){console.log(err)

}
}else{
                         res.status(402).json({message:'Access denied you only upadate your own profile'})
}

}
//delete user

export const deleteUser = async (req, res) =>{
const id=req.params.id
const{currentUserId,currentUserAdminStatus}=req.body
if(id===currentUserId||currentUserAdminStatus){
try{
await UserModel.findByIdAndDelete(id)
res.status(200).json({message:'user deleted successfully'})

}catch(err){
                         console.log(err)
}
}else{
                         res.status(402).json({message:'Access denied you only delete your own profile'})
}
}
// following user

export const followUser = async (req, res) => {
const id = req.params.id
const{_id} = req.body

if(_id===id){
res.status(403).json({message:'Action denied'})// we can't follow ourself
}else{
      try{
        const followUser = await UserModel.findById(id)// followers
        const followingUser=await UserModel.findById(_id)//following
        if(!followUser.follower.includes(_id)){
           await followUser.updateOne({$push:{follower:_id}})//follower is not following push to follower array if follower is following already don't push to follower array
           await followingUser.updateOne({$push:{following:id}})// following array will get update
           res.status(200).json('user followed')
        }else{
                         res.status(403).json('user is already followed by you')
        }

      }catch(err){console.log(err)}
}
}

//unfollow user from
export const UnfollowUser = async (req, res) => {
                         const id = req.params.id
                         const{_id} = req.body
                         
                         if(_id===id){
                         res.status(403).json({message:'Action denied'})// we can't follow ourself
                         }else{
                               try{
                                 const followUser = await UserModel.findById(id)// followers
                                 const followingUser=await UserModel.findById(_id)//following
                                 if(followUser.follower.includes(_id)){
                                    await followUser.updateOne({$pull:{follower:_id}})
                                    await followingUser.updateOne({$pull:{following:id}})
                                    res.status(200).json('user unfollowed')
                                 }else{
                                                  res.status(403).json('user is not followed by you')
                                 }
                         
                               }catch(err){console.log(err)}
                         }
                         }