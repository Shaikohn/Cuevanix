const Inquirie = require ("../models/inquirie")
const User = require("../models/user")
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
        if(text.length < 20) return res.status(404).json({message: "The password needs to have a minimum of 20 characters!"})
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
        const { name, subject, text, email } = req.body
        const id = Math.ceil(Math.random()*(50 - 1))
        const answer = {
            name,
            subject,
            text,
            id,
        }
        const emailPattern =  new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
        if(!emailPattern.test(email)) return res.status(404).json({message: "Write a valid email!"})
        if(text.length < 10) return res.status(404).json({message: "The password needs to have a minimum of 10 characters!"})
        const user = await User.findOne({email})
        user.messages = user.messages.concat(answer)
        await user.save()
        res.status(200).json(answer)
    } catch (error) {
        console.log(error)
    }
}

const deleteInquirieAnswer = async(req, res) => {
    try {
        const { email, id } = req.body
        const user = await User.findOne({email})
        user.messages = user.messages.filter((m) => m.id !== id)
        await user.save()
        res.status(200).send({message: "Message deleted succesfully!"})
    } catch (error) {
        console.log(error)
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