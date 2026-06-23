const { CustomError } = require('../error/customError')

const errorHandler = (err, req,res, next) =>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    res.status(500).json({msg : "Something went wrong. Please try again later"})
}

module.exports = errorHandler