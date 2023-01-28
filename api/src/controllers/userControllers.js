const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { MAIL_USER, MAIL_PASS } = process.env

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const signin = async(req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({email}).populate('orders').populate('messages').populate('comments')
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
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const emailPattern =  new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
    if(!pattern.test(firstName)) return res.status(404).json({message: "You only can use letters for the name!"})
    if(!pattern.test(lastName)) return res.status(404).json({message: "You only can use letters for the lastname!"})
    if(!emailPattern.test(email)) return res.status(404).json({message: "Write a valid email!"})
    if(password.length < 6) return res.status(404).json({message: "The password needs to have a minimum of 6 characters!"})
    if(!password === confirmPassword) return res.status(404).json({message: "Passwords don't match!"})

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})

    const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'})
    let signEmail = await transport.sendMail({
        from: MAIL_USER,
        to: result.email,
        subject: "Welcome to Cuevanix!",
        html: `<h1> Hello ${result.name}! </h1>
            <p> We hope that you enjoy our website filled with the best movies! </p>
            </div>`,
    })
    res.status(200).json({result: result, token})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const googleUser = async(req, res) => {
    try {
        const { email, given_name, family_name, picture } = req.body
        const existingUser = await User.findOne({email}).populate('orders').populate('messages').populate('comments')
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
            let signEmail = await transport.sendMail({
                from: MAIL_USER,
                to: result.email,
                subject: "Welcome to Cuevanix!",
                html: `<h1> Hello ${result.name}! </h1>
                    <p> We hope that you enjoy our website filled with the best movies! </p>
                    </div>`,
            })
            res.status(200).json({result: result, token})
        }
    } catch(e) {
        console.log(e)
    }
}

const getUser = async(req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findOne({_id}).populate('orders').populate('messages').populate('comments')
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const getProfile = async(req, res) => {
    const { _id } = req.params
    try {
        const profile = await User.findOne({_id}).populate('orders').populate('messages').populate('comments')
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

const updateUser = async (req, res) => {
    const { _id  } = req.params
    const { name, email, picture } = req.body
    console.log(name, email)
    console.log('params', req.params)
    try {
        const user = await User.findById(_id).populate('orders').populate('messages')
        await user.updateOne({ 
            name,
            email,
            picture,
        })
        user.save()
        const userUpdated = await User.findOne({_id}).populate('orders').populate('messages')
        return res.status(200).json(userUpdated);
        } catch (error) {
            res.status(400).json(error);
        }
    };

const updateUserRole = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id).populate('orders').populate('messages')
        if(user.banned === true) {
            return res.status(400).json({message: "This user is banned!"})
        } 
        user.admin
            ? await user.updateOne({ admin: false })
            : await user.updateOne({ admin: true });
        user.save()
        const userUpdated = await User.findOne({_id}).populate('orders').populate('messages')
        return res.status(200).json(userUpdated);
        } catch (error) {
            res.status(400).json(error);
        }
    };

    const updateUserStatus = async (req, res) => {
        const { _id } = req.params;
        try {
            const user = await User.findById(_id).populate('orders').populate('messages')
            user.banned
            ? await user.updateOne({ banned: false })
            : await user.updateOne({ banned: true, admin: false });
        user.save()
        const userUpdated = await User.findOne({_id}).populate('orders').populate('messages')
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
    updateUser,
    updateUserRole,
    updateUserStatus,
}