const {UnAuthenticationError} = require('../errors')
const jwt = require('jsonwebtoken')

const AuthorizeMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnAuthenticationError("Token is not Provided")
    }
    const token = authHeader.split(" ")[1]
    try{
        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = verifyToken
        req.user = {id, username}
        next()

    }catch(err){
        throw new UnAuthenticationError("Not Authorized to access this route")
    }
}

module.exports = AuthorizeMiddleware