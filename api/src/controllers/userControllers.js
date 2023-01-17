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
        if(existingUser.banned === true) return res.status(400).json({message: "You are banned!"})

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

    const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})

    res.status(200).json({result: result, token})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const googleUser = async(req, res) => {
    try {
        const { email, given_name, family_name, picture } = req.body
        const existingUser = await User.findOne({email}).populate('orders')
        if(existingUser) {
            if(existingUser.banned === true) {
                return res.status(400).json({message: "You are banned!"})
            } else {
                const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'})
                res.status(200).json({result: existingUser, token})
            }
        } else {
            const result = await User.create({email, name: `${given_name} ${family_name}`, picture})
            const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})
            res.status(200).json({result: result, token})
        }
    } catch(e) {
        console.log(e)
    }
}

const getUser = async(req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findOne({_id}).populate('orders')
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const getProfile = async(req, res) => {
    const { _id } = req.params
    try {
        const profile = await User.findOne({_id}).populate('orders')
        res.status(200).json(profile)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong.'}) 
    }
}

const updateUserRole = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id).populate('orders')
        if(user.banned === true) {
            return res.status(400).json({message: "This user is banned!"})
        } 
        user.admin
            ? await user.updateOne({ admin: false })
            : await user.updateOne({ admin: true });
        user.save()
        const userUpdated = await User.findOne({_id}).populate('orders')
        return res.status(200).json(userUpdated);
        } catch (error) {
            res.status(400).json(error);
        }
    };

    const updateUserStatus = async (req, res) => {
        const { _id } = req.params;
        try {
            const user = await User.findById(_id).populate('orders')
            user.banned
            ? await user.updateOne({ banned: false })
            : await user.updateOne({ banned: true, admin: false });
        user.save()
        const userUpdated = await User.findOne({_id}).populate('orders')
        return res.status(200).json(userUpdated);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    };

module.exports = {
    signin, 
    signup,
    googleUser,
    getUser,
    getProfile,
    getUsers,
    updateUserRole,
    updateUserStatus,
}