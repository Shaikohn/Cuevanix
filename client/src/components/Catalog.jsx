import { Link, useLocation  } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/movieActions";
import { useState } from "react";
import Spinner from "./Spinner/index";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import SortMovies from "./Sort/SortMovies";

export default function Catalog() {

    const {movies} = useSelector(state => state.movies)
    const {filteredMovies} = useSelector(state => state.movies)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const [search, setSearch] = useState('')
    const filtered = filteredMovies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    const max = Math.ceil(filtered?.length / perPage)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch, location])

    function filteredMovie() {
        if(search.length === 0) {
            return filteredMovies
        } 
        if(filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that movie',
                icon: "error",
                timer: 3000,
            });
            setPage(1)
            setSearch("")
        } 
        return filtered
    }

    function handleOnSearch(e) {
        setSearch(e.target.value)
        setPage(1) 
    }

    return (
        <>    
        <div>
            <div className="nav justify-content-center">
                <div className="ms-2">
                    <Pagination page={page} setPage={setPage} max={max} />
                </div>
                <label className="form-label mb-0 mt-2">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search in the catalog" type="text" value={search} />
                </label>
                <div className="mt-2">
                    < SortMovies setPage={setPage} />
                </div>
            </div>
            <div style={{width: '100%'}} className="row" >
            {movies.length > 0 ? 
            filteredMovie()
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((m, i) => {
                return (
                    <div className="col-3" key={i}>
                        <div /* style={{height:'550px'}} */ className="card my-3 mx-3">
                            <img style={{height: '300px'}} className="card-img-top" src={m.image} alt="film" />
                            {/* {
                                user !== null || localUser !== null ? <button className="favourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={m.id}>🖤</button> : ''
                            } */}
                                <div className="card-body">
                                    <h5 className="card-title text-info"> {m.title} </h5>
                                    <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                    <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                </div>
                        </div>
                    </div>
                )
            }) : <Spinner />}
            </div>
            <Pagination page={page} setPage={setPage} max={max} />
        </div>
        </>
    )
}