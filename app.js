const express = require('express');	
const app = express();			
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyparser = require('body-parser')	
	



app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(morgan('dev'))

mongoose.connect("mongodb+srv://admin:admin@cluster0.mj76qjv.mongodb.net/test",{
    useUnifiedTopology: true,
    useNewUrlParser: true
})



app.use((req,res,next)=>{                           
    res.header('Access-Control-Allow-Origin','*')                                     
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization')
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})






const authRouter = require('./api/routes/auth-route')
const postRouter = require('./api/routes/post-route')
const eventRouter = require('./api/routes/event-route')
app.use('/auth',authRouter)
app.use('/post',postRouter)
app.use('/event',eventRouter);
module.exports = app