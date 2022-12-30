import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/movieActions";

export default function Catalog(props) {

    let token = sessionStorage.getItem('Token')
    const {movies} = useSelector(state => state.movies)
    console.log(movies)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovies())
        /* const apikey = '9d0aee88c318326033d3cc2001d4d5ed' 
        const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        axios.get(endpoint)
            .then((res) => {
                setMovies(res.data.results)
            })
            .catch((error) => {
                Swal.fire({
                    title: 'SOMETHING FAILED, TRY LATER',
                    icon: 'error',
                    timer: 3000,
                });
            }) */
    }, [dispatch])

    return (
        <>    
        {/* {!token  && Swal.fire({
                title: 'FORBIDDEN NAVIGATION',
                text: 'You cant go there without being logged!',
                icon: 'error',
                timer: 3000,
            }) && <Navigate to='/' replace/>} */}
        <div>
            <div className="row" >
            {movies && movies.map((m, i) => {
                return (
                    <div className="col-3" key={i}>
                        <div className="card my-4">
                            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} alt="film" />
                                <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={m.id}>🖤</button>
                                <div className="card-body">
                                    <h5 className="card-title"> {m.title} </h5>
                                    <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                    <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
        </>
    )
}