import Jwt  from "jsonwebtoken"

const genToken = async (UserId)=>{
    try {
        const token = await Jwt.sign({UserId},process.env.Jwt_Secret,{expiresIn:"10d"})
        return token;
    } catch (error) {
        console.log(error)
        throw error;
    }
};
export default genToken