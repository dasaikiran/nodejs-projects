
const express = require('express')
const path = require('path')
const task = require('./routes/tasks')
const app = express()
const connectdb = require('./db/connect')
require('dotenv').config()
const NotFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/tasks',task)

app.use(NotFound)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 5000
const start = async () =>{
    try{
        await connectdb(process.env.MONGO_URL).then(()=>{console.log("Connected to DB")})
        app.listen(PORT,()=>{console.log(`Server listening at port ${PORT}...`)})
    }catch(err){
        console.log(err)
    }
}
start()