import Jwt  from "jsonwebtoken"

const genToken = async (UserId)=>{
    try {
        const token = await Jwt .sign({UserId},process.env.Jwt_Secret)     
    } catch (error) {
        
    }
}