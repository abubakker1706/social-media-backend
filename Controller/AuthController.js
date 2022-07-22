import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const registerUser= async(req,res)=>{


const salt = await bcrypt.genSalt(10);
const hashpassword= await bcrypt.hash(req.body.password,salt)
req.body.password = hashpassword
const newUser = new UserModel(req.body)
const {username}=req.body

try{
   const oldUser= await UserModel.findOne({username})
   if(oldUser){
      return res.status(400).json({message:'username is already register'})
   }
const user=await newUser.save()
const token=jwt.sign({
   username: user.username,
   id: user._id
},process.env.JWT_KEY ,{expiresIn:"1h"})
res.status(200).json({user,token})
}

catch(err){
   res.status(500).json({message:err.message})
}

}

//login

export const loginUser=async(req,res)=>{
const {username,password}= req.body;

const user = await UserModel.findOne({username:username})

try{
if(user)
{
          const checkPassword= await bcrypt.compare(password,user.password) 
          if(!checkPassword)
          {
            res.status(404).json("wrong password")
          }else{

            const token=jwt.sign({
               username: user.username,
               id: user._id
            },process.env.JWT_KEY ,{expiresIn:"1h"})
            res.status(200).json({user,token})
          }
         
}else{
                         res.status(404).json({message:"user doesn't exist"})
}

}catch(err){
       console.log(err)
}
}