import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDetails, getMovies, getMovieVideos, getPurchasedMovie } from "../../redux/actions/movieActions"
import { clearMovie, clearPurchasedMovie, clearVideos } from "../../redux/slices/movieSlice"
import { getProfileById } from "../../redux/actions/userActions"
import ReactPlayer from 'react-player/lazy'
import Spinner from '../Spinner/index'
import { useModal } from "../Modals/useModal"
import Modals from "../Modals/Modals"
import { postComment } from "../../redux/actions/commentActions"
import Swal from "sweetalert2"
import { useReducer } from "react"


export default function PurchasedMovie() {

    let { id } = useParams()
    const {movies} = useSelector(state => state.movies)
    const {profile} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const userId = localUser.result._id
    const userName = localUser.result.name
    const initialState = { userName, movieId: id, userId, text: ''}
    const [commentData, setCommentData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const exists = movies.find((v) => v.id.toString() === id.toString())
    const alreadyCommented = profile?.comments.find((c) => c.movieId === id)

    const videos  = useSelector(state => state.movies.videos)
    const video = videos.find((v) => v.type === "Trailer")

    useEffect(() => {
        dispatch(clearVideos())
        dispatch(getMovieVideos(id))
        dispatch(getMovies())
        dispatch(getProfileById(userId))
    }, [dispatch, id, reducerValue])

    const handleChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value, movieId: id})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postComment(commentData, closeModal, setLoading, forceUpdate))
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-info mb-4">Movie Trailer – Exclusive Access</h2>
            <p className="text-center text-secondary mb-4" style={{ maxWidth: '60dvh', margin: '0 auto' }}>
                This is the official trailer provided by the API for the movie you simulated purchasing. Enjoy your exclusive access and feel free to leave a comment below.
            </p>
            {video === undefined ? (
                <Spinner />
            ) : (
                <div className="ratio ratio-16x9 rounded overflow-hidden mb-4">
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        className="react-player"
                        url={`https://www.youtube.com/watch?v=${video?.key}`}
                        controls
                    />
                </div>
            )}
            {exists !== undefined && alreadyCommented === undefined && (
                <div className="text-center">
                    <button className="btn btn-success px-4 py-2 mt-2" onClick={openedModal}>
                        Comment
                    </button>
                </div>
            )}
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                <div className="container text-light">
                    <h3 className="text-center mb-4">Make a Comment</h3>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Your Comment</label>
                            <textarea
                                id="comment"
                                name="text"
                                className="form-control"
                                placeholder="Write your comment here..."
                                rows="4"
                                style={{ resize: 'none', backgroundColor: '#1c1c1c', color: 'white' }}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        {loading ? (
                            <div className="text-center my-3">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button type="submit" className="btn btn-primary px-4">
                                    Send
                                </button>
                                <button type="button" className="btn btn-danger px-4" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </Modals>
        </div>
    )
}