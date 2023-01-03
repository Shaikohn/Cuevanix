const User = require('../models/user')

const addFavourite = async(req, res) => {
    const { newFavourite, userId } = req.body
    try {
        let user = await User.findByPk(userId)
        user.results.favourites.push(newFavourite)
        res.status(200)
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'})
    }
}

module.exports = {
    addFavourite
}