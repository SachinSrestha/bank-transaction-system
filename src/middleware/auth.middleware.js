const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/blackList.model');

async function authMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access",
            status:"failed"
        })
    }

    const isBlacklisted = await tokenBlackListModel.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized access, token is invalid",
            status:"failed"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userID)
        req.user = user
        next()
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized access, invalid token",
            status:"failed"
        })
    }
}

async function authSystemUserMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access",
            status:"failed"
        })
    }
    const isBlacklisted = await tokenBlackListModel.findOne({token})

    if(isBlacklisted){
        return res.status(401).json({
            message:"Unauthorized access, token is invalid",
            status:"failed"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.userID).select("+systemUser")

        if(!user.systemUser){
            return res.status(403).json({
                message:"Forbidden access, user is not a system user",
                status:"failed"
            })
        }
        req.user = user
        next()
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized access, invalid token",
            status:"failed"
        })
    }
}

module.exports = {
    authMiddleware,
    authSystemUserMiddleware
}