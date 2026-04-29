import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
const isAuth = async(req,res,next)=>{

    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"token not found"});
        }
        const verifyToken = await jwt.verify(token,process.env.Jwt_Secret);
        req.userId = verifyToken.UserId;
        next(); 
        
    } catch (error) {
        console.log(error); 
        return res.status(401).json({message:"invalid token"});
    }
}
export default isAuth