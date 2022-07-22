import mongoose from "mongoose";

const UserSchema =mongoose.Schema( 
{
        username:{
                         type:String,
                         required:true,
        },
        password:{
                         type:String,
                         required:true,      
        },
        firstname:{
                         type:String,
                         required:true,
        },
        lastname:{
                         type:String,
                         required:true,
        },
        isAdmin:{
                      type:Boolean,
                      default:false,
        },
        profilePicture:{
                  type:String
        },
        coverPicture:{
                type:String
        },
        about:{
                type:String
        },
        workAt:{
                type:String
        },
        relationships:{
                type:String
        },
        livesIn:{
                type:String
        },
        country:{
                type:String
        },
        follower:[],
        following:[],
},
{timestamps:true}

)

const UserModel=mongoose.model('User',UserSchema)
export default UserModel;