import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import cors from 'cors'
const app = express()

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
dotenv.config()
//to serve image to public
app.use(express.static('public'))
app.use('/', express.static('images'))


mongoose.connect(process.env.Mongo_Url,
{
                         useNewUrlParser:true,
                         useUnifiedTopology:true,
}

 )
.then(()=>app.listen(process.env.PORT,()=>console.log(`listening port ${process.env.PORT}`)))
.catch((err)=>console.log(err))


app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/chat',ChatRoute)
app.use('/messages',MessageRoute)