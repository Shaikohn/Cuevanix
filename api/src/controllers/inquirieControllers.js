const Inquirie = require ("../models/inquirie")
const User = require("../models/user")
const Message = require ("../models/message")
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


const postInquirie = async(req, res) => {
    try {
        const { email, name, subject, text, userId } = req.body
        const inquirie = new Inquirie({
            email,
            name,
            subject,
            text,
            userId,
        })
        const emailPattern =  new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
        if(!emailPattern.test(email)) return res.status(404).json({message: "Write a valid email!"})
        if(text.length < 15) return res.status(404).json({message: "The message needs to have a minimum of 15 characters!"})
        inquirie.save()
        let inquirieEmail = await transport.sendMail({
            from: MAIL_USER,
            to: email,
            subject: "Your inquire to Cuevanix",
            html: `<h1> Hello ${name}! </h1>
                <p> Thanks for writing to us! We will answer you as soon as possible! </p>
                </div>`,
        })
        res.status(200).json(inquirie)
    } catch (error) {
        console.log(error)
    }
}

const getInquieries = async(req, res) => {
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

const deleteInquirie = async (req, res, next) => {
    try {
        const { _id } = req.params
        let inquirie = await Inquirie.findOne({_id})
        await inquirie.remove()
        res.status(200).send({message: "Inquirie deleted succesfully!"})
    }
    catch(error) {
        next(error)
    }
}

const postInquirieAnswer = async(req, res) => {
    try {
        const { name, subject, text, id } = req.body
        const answer = new Message ({
            name,
            subject,
            text,
        })
        if(text.length < 15) return res.status(404).json({message: "The message needs to have a minimum of 15 characters!"})
        answer.save()
        const user = await User.findById(id).populate("messages")
        user.messages = user.messages.concat(answer._id)
        await user.save()
        res.status(200).json(answer)
    } catch (error) {
        console.log(error)
    }
}

const deleteInquirieAnswer = async(req, res, next) => {
    try {
        const { _id, userId } = req.params
        let message = await Message.findOne({_id})
        const user = await User.findById(userId).populate("messages")
        const id = message._id.toString()
        user.messages = user.messages.filter((u) => u._id.toString() !== id)
        await message.remove()
        user.save() 
        const userUpdated = await User.findById(userId).populate("messages")
        return res.status(200).json(userUpdated)
    }
    catch(error) {
        next(error)
    }
}



module.exports = {
    postInquirie, 
    postInquirieAnswer,
    getInquieries,
    getInquirie,
    deleteInquirie,
    deleteInquirieAnswer
}