import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteMovie, getMovieAdmin } from "../../redux/actions/movieActions"
import { clearMovieAdmin } from "../../redux/slices/movieSlice"
import Spinner from "../Spinner"
import NavBar from "./NavBar";
import { MdDeleteForever } from 'react-icons/md'


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
            <h2 className="ms-5 text-info"> {movie?.title} </h2>
            <div className="d-flex">
                <div className="ms-5 mb-2">
                    <img style={{height: '400px', borderRadius: '10px'}} className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie?.image}`} alt="film" />
                </div>
                <div className="col-7 ms-3">
                    <h5> {movie?.release_date} </h5>
                    <h5> Overview: </h5>
                    <p> {movie?.overview} </p>
                    <h5>Rating: {movie?.rating === 0 ? 'None (This movie was not rated by critics!)' : `${movie?.rating}`} </h5>
                    <h5>Price: ${movie?.price?.toFixed()} </h5>
                    <button type="button" className="text-danger" onClick={() => Swal.fire({
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
              })}>< MdDeleteForever size={50} /></button>
                </div>
            </div>
            </div> : <Spinner />}
        </div>
    )
}