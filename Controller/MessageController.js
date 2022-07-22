import MessageModel from "../Models/MessageModel.js";


export const addMessage=async(req, res)=>{
        const{chatId,senderId,text} = req.body
        const Message =  new MessageModel({
           chatId,
           senderId,
           text
        })
        try {
                   const newMessage = await Message.save()    
                   res.status(200).send(newMessage)  
        } catch (error) {
             res.status(500).json(error)            
        }
}

export const getMessage=async(req, res)=>{
const {chatId}=req.params
                         try {
                              const result = await MessageModel.find({chatId})  
                              res.status(200).json(result)                  
                         } catch (error) {
                         res.status(500).json(error)                   
                         }
}