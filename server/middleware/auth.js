import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req,res,next) => {
    try{
        const accessToken = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
        console.log('token',accessToken);
        if(!accessToken){
            return res.status(401).json({
                message: "provide access token login first",
                success: false,
                error:true,
            });
        }
        const decoded = jwt.verify(accessToken,process.env.SECRET_KEY_ACCESS_TOKEN);
        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
                error:true,
            });
        }
        req.userId = decoded.id;
        console.log('decoded',decoded);

        next();

    }catch(error){
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error:true,
        });
    }
}

export default auth;