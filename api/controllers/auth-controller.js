const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
const path = require('path')

var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7f0906b7915e21',
    pass: '8196155fcb8c82'
  }
})

exports.user_signup = async (req, res, next) => {
  try {
    const existingUser = await User.find({ email: req.body.email }).exec()
    if (existingUser.length > 0) {
      return res.status(409).json({
        message: 'existing email'
      })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      birthday: req.body.birthday,
      gender: req.body.gender,
      interest: req.body.interest,
      verified: false
    })
    const savedUser = await user.save()
    const verificationCode = user.generateVerificationCode()
    await User.updateOne(
      { _id: savedUser._id },
      { $set: { verificationCode: verificationCode } }
    ).exec()
    await transport.sendMail({
      to: req.body.email,
      subject: 'Verify Account',
      html: `<p>your verification link :</p><a href="localhost:3000/auth/verification/${verificationCode}">Click here</a>`
    })
    res.send('Email verification sent!')
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

exports.user_verification = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationCode: req.params.code
    }).exec()
    if (!user) {
      return res.json('user not found')
    }
    await User.updateOne({ _id: user._id }, { $set: { verified: true } }).exec()
    res.sendFile(path.join(__dirname, '../vues/verification.html'))
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

exports.user_login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.status(401).json({
          message: 'email not found'
        })
      }
  
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: 'Auth failed!'
        })
      }
  
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        'secret',
        {
          expiresIn: '1h'
        }
      )
  
      res.status(200).json({
        message: 'Auth successful',
        token: token
      })
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  

exports.reset_password = (res, req) => {}
