import uploadClaudinary from "../config/claudinary.js";
import User from "../models/user.model.js";    
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