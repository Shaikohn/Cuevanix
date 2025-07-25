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
        if(existingUser.verified === false) return res.status(400).json({message: "You have to verify!"})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'})
        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const signup = async(req, res) => {
    try {
        const { email, password, confirmPassword, firstName, lastName, picture } = req.body

    const existingUser = await User.findOne({email})
    if(existingUser) return res.status(404).json({message: "That email is already in use!"})
    const pattern = new RegExp('^[A-Z]+$', 'i');
    const emailPattern =  new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
    const passwordPattern = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    if(!pattern.test(firstName)) return res.status(404).json({message: "You only can use letters for the name!"})
    if(!pattern.test(lastName)) return res.status(404).json({message: "You only can use letters for the lastname!"})
    if(!emailPattern.test(email)) return res.status(404).json({message: "Write a valid email!"})
    if(!passwordPattern.test(password)) return res.status(404).json({message: "The password needs at least 6 characters, including 1 number and 1 special character!"})
    if(password !== confirmPassword) return res.status(404).json({message: "Passwords don't match!"})

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({email, picture, password: hashedPassword, name: `${firstName} ${lastName}`})

    let signEmail = await transport.sendMail({
        from: MAIL_USER,
        to: result.email,
        subject: "Welcome to Cuevanix!",
        html: `<h1> Hello ${result.name}! </h1>
            <p> Verify your account by clicking the link! </p>
            <a target="_blank" rel="noopener noreferrer" href=http://localhost:3000/verification/${result._id}> Click here</a>
            </div>`,
    })
    res.status(200).json(result)
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

const verifyUser = async(req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id).populate('orders').populate('messages')
        if(user.verified === true) {
            return res.status(400).json({message: "This user is already verified!"})
        } 
        await user.updateOne({ verified: true });
        user.save()
        const userUpdated = await User.findOne({_id}).populate('orders').populate('messages')
        return res.status(200).json(userUpdated);
        } catch (error) {
            res.status(400).json(error);
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
            const result = await User.create({email, name: `${given_name} ${family_name}`, picture, verified: true})
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
    const { _id } = req.params
    const { name, picture } = req.body

    try {
        const user = await User.findById(_id).populate('orders').populate('messages')

        const picturePattern = new RegExp(/.(gif|jpeg|jpg|png)$/i);
        if(!picturePattern.test(picture) && user.picture !== picture) return res.status(404).json({message: "Write a valid URL for the image!"})
        
        await user.updateOne({ 
            name,
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

    const passwordEmail = async (req, res) => {
        const { email } = req.body
        const user = await User.findOne({email}).populate('orders').populate('messages').populate('comments')
        try {
            await transport.sendMail({
                from: MAIL_USER,
                to: email,
                subject: "Forgotten password at Cuevanix!",
                html: `<h1> Hello ${email}! </h1>
                    <p> You want to change your password? Then click the link! </p>
                    <a target="_blank" rel="noopener noreferrer" href=http://localhost:3000/changePassword/${user._id}> Click here</a>
                    </div>`,
            })
            return res.status(200)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
    };

    const updatePassword = async (req, res) => {
        const { _id } = req.params;
        const { password } = req.body
        try {
            const user = await User.findById(_id).populate('orders').populate('messages')
            if(password.length < 6) return res.status(404).json({message: "The password needs to have a minimum of 6 characters!"})
            const hashedPassword = await bcrypt.hash(password, 12)
            await user.updateOne({ 
                password: hashedPassword,
            })
            user.save()
            const userUpdated = await User.findOne({_id}).populate('orders').populate('messages')
            return res.status(200).json(userUpdated);
        } catch (error) {
            console.log(error)
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
    verifyUser,
    updatePassword,
    passwordEmail
}