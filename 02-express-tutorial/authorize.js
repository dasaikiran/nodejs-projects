const authorize = (req,res,next) => {
    const { user } = req.query

    if(user === 'sai'){
        console.log("hello sai welcome")
        req.user = {name: 'sai', desig: 'boss'}
        next()
    }else{
        res.status(400).send("Not Authorized")
    }
}

module.exports = authorize