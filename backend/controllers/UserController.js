const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id)=> {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})
}

//login user
const loginUser = async(req, res)=> {
    const {email, password} = req.body
    console.log(email, password)
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);
        res.status(200).json({email, token, user_id: user._id})
    } catch(error) {
        console.log(error.message);
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async(req, res)=> {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id);
        res.status(200).json({email, token, user_id: user._id})
    } catch(error) {

        res.status(400).json({error: error.message})
    }
}

//profile
const getProfile = (req, res)=> {
    try {
        res.status(200).json(req.user.email)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser, getProfile}