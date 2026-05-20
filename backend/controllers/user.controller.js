import { response } from "express";
import uploadClaudinary from "../config/claudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";    
import moment from "moment";
 export const currentUser = async (req,res)=>{
    try {
        const userId= req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:`get current user error: ${error.message}`}) 
        
    }
}
export const updateAssistant = async (req,res)=>{
    try {
        const {assistantName, imageUrl} = req.body;
        let assistantImage;
        if(req.file){
            assistantImage = await uploadClaudinary(req.file.path);
        } else {
            assistantImage = imageUrl;
        }
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                assistantname: assistantName,
                assistantimage: assistantImage
            },
            { new: true }
        ).select("-password");
        return res.status(200).json(user);
         
    } 
    catch (error) {
      return res.status(400).json({message:`Update Assistant error: ${error.message}`}) 
    }
}

export const askToAssistant = async (req,res)=>{
  try { 
    const {command} = req.body;
    const user= await User.findById(req.userId);
    const userName = user.name;
    const assistantName = user.assistantname;
    const result = await geminiResponse(command, assistantName, userName);

    const jsonMatch = result.match(/{[\s\S]*}/);
    if(!jsonMatch){
    return res.status(200).json({ response:"Sorry, I couldn't understand that. Could you please respeak?",
    })
    }
    const gemResult = JSON.parse(jsonMatch[0])
    const type= gemResult.type
    switch(type){
        case 'get_date': 
        return res.json({
            type,
            userInput: gemResult.userInput, 
            response: `today is ${moment().format("MMMM Do YYYY")}`
        });
        case 'get_time':
        return res.json({
            type,
            userInput: gemResult.userInput, 
            response: `current time is ${moment().format("hh:mm:ss A")}`
        });
        case 'get_day':
        return res.json({
            type,
            userInput: gemResult.userInput, 
            response: `today is ${moment().format("dddd")}`
        });
        case 'youtube_search':
        case 'weather_show':
        case 'general':
        case 'google_search':
        case 'youtube_play':
        case 'calculator_open':
        case 'instagram_open':
        case 'facebook_open':
            return res.json({
                type,
                userInput: gemResult.userInput, 
                response: gemResult.response,
            });
            default:
                return res.json({
                    response:"Sorry, I couldn't understand that. Could you please respeak?",
                })

    }

   } 
    catch (error) {
   console.log(error);

   return res.status(400).json({
      message: `Ask to assistant error: ${error.message}`
   });
}
}