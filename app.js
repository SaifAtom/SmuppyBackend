const express = require('express');	
const app = express();			
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyparser = require('body-parser')	
	



app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(morgan('dev'))

mongoose.connect("mongodb+srv://dhia:SNOW-13-fairy" + "@cluster0.jkcei.mongodb.net/smuppy_mvp?retryWrites=true&w=majority",{
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
const shortRouter = require('./api/routes/short-route')
const eventRouter = require('./api/routes/event-route')
const locationRouter = require('./api/routes/location-route')
app.use('/auth',authRouter)
app.use('/post',postRouter)
app.use('/shorts',shortRouter)
app.use('/location',locationRouter);
app.use('/event',eventRouter);
module.exports = app