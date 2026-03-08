import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const SignUp = async (req,res)=>{
    try{ 
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"Email already exists"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password: hashPassword
        })
        await user.save()
        res.status(201).json({message:"User created successfully"})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }       
}