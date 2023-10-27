import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next)=>{
    const {token} = req.cookies 

    if(!token){
        return res.status(404).json({
            success: false,
            message: "Token is not available, so you are not authenticated"
        })
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

export default authMiddleware