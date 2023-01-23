const axios = require("axios")
const Order = require ("../models/order")
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

/* const getOrder = async(req, res) => {
    const { userId } = req.body

} */

const addOrder = async(req, res) => {
    const { userId, purchased_Movie} = req.body
    const user = await User.findById(userId).populate("orders")
    const order = new Order({
        userName: user.name,
        purchased_Movie,
    })
    try {
        const newOrder = await order.save()
        const user = await User.findById(userId).populate("orders")
        user.orders = user.orders.concat(newOrder._id)
        await user.save()
        let orderEmail = await transport.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Your purchase in Cuevanix",
            html: `<h1> ${purchased_Movie.title} added to your acount! </h1>
                <h2>Hello ${user.name}, view your order's data</h2>
                <p>Price: $${purchased_Movie.price} </p>
                </div>`,
        })
        res.status(200).json(newOrder)
    } catch (error) {
        console.log(error)
    }
}

const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
    }
}

const getPurchasedMovie = async(req, res) => {
    try {
        /* const { id } = req.params
        let movie = purchased_Movie.id
        const order = Order.findOne(movie: id) */
    }
    catch(e) {
        console.log(e)
    }
}

module.exports = {
    addOrder,
    getOrders,
    getPurchasedMovie
}