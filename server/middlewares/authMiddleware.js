const JWT = require('jsonwebtoken')

const authMiddleware = (req, res, next)=>{
    const token = (req.cookies && req.cookies.token) || null;

    if(!token){
           return res.status(400).json({
            success: false,
            message: "Token is not available!",
          });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET)
        console.log("Printing payload-->", payload)

        //here we send or set--> id, email and userName inside req.user then after we can access it in getUser controller
        req.user = {id: payload.id, email: payload.email, userName: payload.userName}
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying the token!",
            data: error.message
          });
    }

    next()
}

module.exports = authMiddleware;