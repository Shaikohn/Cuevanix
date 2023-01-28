const Message = require ("../models/message")
const User = require("../models/user")
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const { MAIL_USER, MAIL_PASS } = process.env

const postMessage = async(req, res) => {
    try {
        const { email, name, subject, text, userId } = req.body
        const inquirie = new Message({
            email,
            name,
            subject,
            text,
            userId,
        })
        const emailPattern =  new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
        if(!emailPattern.test(email)) return res.status(404).json({message: "Write a valid email!"})
        message.save()
        const user = await User.findOne({email})
        user.messages = user.messages.concat(answer)
        res.status(200).json(message)
    } catch (error) {

    }
}

const getMessages = async(req, res) => {
    try {
        const inquiries = await Inquirie.find({})
        res.status(200).json(inquiries)
    } catch (error) {
        console.log(error)
    }
}

const getInquirie = async (req, res, next) => {
    const { _id } = req.params
    try {
            let inquirie = await Inquirie.findOne({_id})
            res.status(200).send(inquirie)
        }
    catch (error) {
        next(error)
    }
}