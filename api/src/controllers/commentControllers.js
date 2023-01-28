const Comment = require ("../models/comment")
const Movie = require ("../models/movie")
const User = require ("../models/user")

const postComment = async(req, res) => {
    try {
        const { userName, text, userId, movieId } = req.body
        const id = movieId
        const movie = await Movie.findOne({id}).populate("comments")
        const movieName = movie.title
        const user = await User.findById(userId).populate("orders").populate("messages").populate("comments")

        const comment = new Comment({
            userName,
            text,
            userId,
            movieId,
            movieName
        })
        if(text.length < 10) return res.status(404).json({message: "The message needs to have a minimum of 10 characters!"})
        comment.save()
        user.comments = user.comments.concat(comment._id)
        user.save() 
        movie.comments = movie.comments.concat(comment._id)
        movie.save()
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async(req, res, next) => {
    try {
        const { _id, userId, movieId } = req.params
        let id = movieId
        let comment = await Comment.findOne({_id})
        const user = await User.findById(userId).populate("comments")
        const movie = await Movie.findOne({id}).populate("comments")
        const CommentId = comment._id.toString()
       user.comments = user.comments.filter((u) => u._id.toString() !== CommentId)
        movie.comments = movie.comments.filter((m) => m._id.toString() !== CommentId)
        await comment.remove()
        movie.save()
        user.save() 
        const userUpdated = await User.findById(userId).populate("messages")
        return res.status(200).json(userUpdated)
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    postComment,
    deleteComment
}