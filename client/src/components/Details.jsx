import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { getDetails } from "../redux/actions/movieActions";
import Swal from "sweetalert2"
import Header from "./Header"
import { clearMovie } from "../redux/slices/movieSlice";

export default function Details() {

    let token = sessionStorage.getItem('Token')
    let { id } = useParams()
    const movie = useSelector(state => state.movies.details)
    const dispatch = useDispatch()
    console.log(id)

    useEffect(() => {
        dispatch(clearMovie())
        dispatch(getDetails(id))
    }, [dispatch, id])

    return (
        <>
        {!token  && Swal.fire({
                title: 'FORBIDDEN NAVIGATION',
                text: 'You cant go there without being logged!',
                icon: 'error',
                timer: 3000,
            }) && <Navigate to='/' replace/>}
        {movie && <div>
            <h2> {movie?.title} </h2>
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="film" />
                </div>
                <div className="col-8">
                    <h5> {movie?.release_date} </h5>
                    <h5> Overview: </h5>
                    <p> {movie?.overview} </p>
                    <h5>Rating: {movie?.vote_average?.toFixed(1)} </h5>
                    <h5>Genres:</h5>
                    <ul>
                        {
                            movie?.genres?.map((g, i) => {
                                return (
                                    <li key={i}>
                                        {g.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>}
        </>
    )
}