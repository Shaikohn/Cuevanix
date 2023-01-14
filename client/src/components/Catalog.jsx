import { Link, useLocation  } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/movieActions";
import { useState } from "react";
import Spinner from "./Spinner/index";
import Pagination from "./Pagination";

export default function Catalog() {

    const {movies} = useSelector(state => state.movies)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const max = Math.ceil(movies?.length / perPage)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch, location])

    return (
        <>    
        <div>
            <div className="row" >
            {movies.length > 0 ? 
            movies
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((m, i) => {
                return (
                    <div className="col-3" key={i}>
                        <div className="card my-4">
                            <img className="card-img-top" src={m.image} alt="film" />
                            {/* {
                                user !== null || localUser !== null ? <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={m.id}>🖤</button> : ''
                            } */}
                                <div className="card-body">
                                    <h5 className="card-title"> {m.title} </h5>
                                    <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                    <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                </div>
                        </div>
                    </div>
                )
            }) : <Spinner />}
            <Pagination page={page} setPage={setPage} max={max} />
            </div>
        </div>
        </>
    )
}