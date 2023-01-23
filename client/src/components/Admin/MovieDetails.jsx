import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteMovie, getMovieAdmin } from "../../redux/actions/movieActions"
import { clearMovieAdmin } from "../../redux/slices/movieSlice"
import Spinner from "../Spinner"
import NavBar from "./NavBar";


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
            <NavBar />
            {movie !== null ? <div>
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
                    <button type="button" className="btn btn-danger" onClick={() => Swal.fire({
                title: "Warning",
                text: "Are you sure you want to remove this movie?",
                icon: "warning",
                showDenyButton: true,
                denyButtonText: "Cancel",
                confirmButtonText: "Confirm",
                confirmButtonColor: "green",
              }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(deleteMovie(id, navigate))
                }
              })}>Delete</button>
                </div>
            </div>
            </div> : <Spinner />}
        </div>
    )
}