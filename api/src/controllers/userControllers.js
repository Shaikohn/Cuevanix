const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const signin = async(req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({email}).populate('orders')
        if(!existingUser) return res.status(404).json({message: "That user doesn't exist!"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials!"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'})
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const signup = async(req, res) => {
    try {
        const { email, password, confirmPassword, firstName, lastName } = req.body

    const existingUser = await User.findOne({email})
    if(existingUser) return res.status(404).json({message: "That email is already in use!"})

    if(!password === confirmPassword) return res.status(404).json({message: "Passwords don't match!"})

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`}).populate('orders')

    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})

    res.status(200).json({result: result, token})
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const getUser = async(req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findOne({_id}).populate('orders')
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find({}).populate('orders')
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

module.exports = {
    signin, 
    signup,
    getUser,
    getUsers
}