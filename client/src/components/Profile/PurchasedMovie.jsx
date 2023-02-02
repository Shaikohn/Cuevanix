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
        <div>
            {
                video === undefined ? < Spinner /> : <ReactPlayer width='100%' className="rounded mx-auto d-block" url={`https://www.youtube.com/watch?v=${video?.key}`}  />
            }
            { exists !== undefined && alreadyCommented === undefined ? <div className="text-center"> <button className="btn btn-success mt-3 mb-3" onClick={() => openedModal()}>Comment</button> </div> : ''}
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
            <h2> Make a comment! </h2>
            <form className="container" onSubmit={handleSubmit} noValidate>
                <div className="form-group col-md-4 ms-5 text-center mt-2">
                    <label>Comment</label>
                    <textarea style={{width: '270px'}} autoComplete='off' type="email" name="text" className="form-control" placeholder="Message" onChange={handleChange} />
                </div>
                {
                loading ? 
                    <div className='text-center mt-3 mb-3'>
                        <div className="spinner-border text-primary" role="status">
                        </div>
                    </div>
                : 
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                }
            </form>
            {
                loading ? '' : <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
            }
            </Modals>
        </div>
    )
}