const mongoose = require('mongoose')
const User =require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');


var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e319c618dfc9cc",
      pass: "280c385fb2fa81"
    }
  });

exports.user_signup=(req,res,next)=>{ 
    User.find({email:req.body.email})
    .exec()
    .then(
        user =>{
            if(user.length>0){
                res.status(409).json({
                    message : "existing email"
                })
            }
            else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error : err
                        })
                    }
                    else{
                        
                        
                        const user = new User({
                            _id:new mongoose.Types.ObjectId(),
                            username : req.body.username,
                            email:req.body.email,
                            password:hash,
                            verified:false
                        })
                        user.save().then(
                            doc=>{
                               const verificationCode = user.generateVerificationCode()
                               User.updateOne({_id:doc._id},{ $set: { verificationCode: verificationCode }}).exec().then(
                                result=>{ transport.sendMail({
                                    to: "dhiabrinsi2020@gmail.com",
                                    subject: 'Verify Account',
                                    html: `<p>your verification link :</p><a href="localhost:3000/auth/verification/${verificationCode}">Click here</a>`
                                  }).then(
                                    res.send('Email verification sent!')
                                    
                                  ).catch()}
                               )
                                
                               
                            }
                        )
                    }
                })
            }
        }
    )
    .catch()
    
    }

exports.user_verification = async (req, res) => {
  
        
    User.find({verificationCode:req.params.code}).exec().then(
        doc => {
            if(doc.length==0){
                res.json('user not found')
            }
            else{
                User.updateOne({_id:doc[0]._id},{ $set : {verified : true}}).exec().then(
                    result =>{
                        res.sendFile(path.join(__dirname, "../vues/verification.html"))
                      
                    }
                )
                
            }
        }
    )
        
      
    }

exports.user_login=(req,res)=>{
    
    User.find({email:req.body.email}).exec().then(
        user => {
            if(user.length<1){
                return res.status(401).json({
                    message : 'email not found'
                })
            }
            else{
                bcrypt.compare(req.body.password,user[0].password, (err,result)=>{
                    if(err){
                        return res.status(401).json({
                            message : 'Auth failed!'
                        })
                    }
                    if(result){
                        const token=jwt.sign({
                            email:user[0].email,
                            userId:user[0]._id
                        },"secret",{
                            expiresIn:"1h"
                        })
                        return res.status(200).json({
                            message : 'Auth successful',
                            token : token
                        })
                    }
                    res.status(401).json({
                        message : 'Auth failed!'
                    })
                })
            }
        }
    )
    
}

exports.reset_password=(res,req)=>{
    
}


