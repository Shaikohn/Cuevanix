import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteMovie, getMovieAdmin } from "../../redux/actions/movieActions"
import { clearMovieAdmin } from "../../redux/slices/movieSlice"
import Spinner from "../Spinner"


export default function MovieDetails() {
    
    let { id } = useParams()
    const movie = useSelector(state => state.movies.adminMovie)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearMovieAdmin())
        dispatch(getMovieAdmin(id))
    }, [dispatch, id])

    return (
        <div>
            {movie !== undefined ? <div>
            <h2> {movie?.title} </h2>
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie?.image}`} alt="film" />
                </div>
                <div className="col-8">
                    <h5> {movie?.release_date} </h5>
                    <h5> Overview: </h5>
                    <p> {movie?.overview} </p>
                    <h5>Rating: {movie?.rating} </h5>
                    <h5>Price: ${movie?.price?.toFixed()} </h5>
                    <button type="button" className="btn btn-danger" onClick={() => dispatch(deleteMovie(id, navigate))}>Delete</button>
                </div>
            </div>
            </div> : <Spinner />}
        </div>
    )
}