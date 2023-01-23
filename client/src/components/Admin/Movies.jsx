import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { getMovies } from "../../redux/actions/movieActions"
import Pagination from "../Pagination"
import SortMovies from "../Sort/SortMovies"
import Spinner from "../Spinner"
import NavBar from "./NavBar"


export default function Movies() {

    const {movies} = useSelector(state => state.movies)
    const {filteredMovies} = useSelector(state => state.movies)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [search, setSearch] = useState('')
    const filtered = filteredMovies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    const max = Math.ceil(filtered?.length / perPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch])

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
        <div>
            <NavBar />
            <div className="nav justify-content-center mb-3">
                <label className="form-label mb-0">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search movie" type="text" value={search} />
                </label>
                < SortMovies setPage={setPage} />
            </div>
            {movies.length > 0 ? 
            filteredMovie()
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((m, i) => {
                return (
                    <div className="card mb-3 ms-5 d-inline-flex align-items-center" style={{maxWidth: '400px'}} key={i}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={m.image} className="img-fluid rounded-start" style={{height: '100%'}} alt={m.title} />
                                            </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{m.title}</h5>
                                                <p className="card-text">Rating: {m.rating}</p>
                                                <p className="card-text">Release date: {m.release_date}</p>
                                                <Link to={`/movieDetails/${m.id}`} className="btn btn-primary">Details</Link>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                )
            }) : <Spinner />}
            <Pagination page={page} setPage={setPage} max={max} />
        </div>
    )
}