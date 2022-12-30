import { Link  } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/movieActions";
import { useState } from "react";

export default function Catalog(props) {

    const {movies} = useSelector(state => state.movies)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('googleProfile')))
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch])

    return (
        <>    
        <div>
            <div className="row" >
            {movies && movies.map((m, i) => {
                return (
                    <div className="col-3" key={i}>
                        <div className="card my-4">
                            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} alt="film" />
                            {
                                user !== null || localUser !== null ? <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={m.id}>🖤</button> : ''
                            }
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