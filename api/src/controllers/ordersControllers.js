const axios = require("axios")
const Order = require ("../models/order")
const User = require("../models/user")

/* const getOrder = async(req, res) => {
    const { userId } = req.body

} */

const addOrder = async(req, res) => {
    const { userId, purchased_Movie} = req.body
    const order = new Order({
        userId,
        purchased_Movie,
    })
    try {
        const newOrder = await order.save()
        const user = await User.findById(userId).populate("orders")
        user.orders = user.orders.concat(newOrder._id)
        await user.save()
        res.json(newOrder)
    } catch (error) {

    }
}

const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({})
        res.json(orders)
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