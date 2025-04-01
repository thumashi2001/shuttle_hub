import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next) =>{
    try {
         // 1. Check if a token exists in the request headers
        const { token } = req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"}) 
        }
            // 2. Verify the token using the secret key from environment variables
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized Login Again"}) 
        }
        next()
    } catch (error) {
        
        console.log(error);
            // 5. Return error message if the token is invalid or expired

        res.json({success:false,message:error.message})
    }
}
export default adminAuth