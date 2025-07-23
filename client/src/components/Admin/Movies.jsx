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
    const [perPage, setPerPage] = useState(8)
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
        <div className="container-fluid bg-dark min-vh-100 text-light">
            <NavBar />
            <div className="text-center mb-4">
                <h1 className="text-info">Movies Panel</h1>
                <p className="text-secondary">Manage all the movies currently available on the platform.</p>
            </div>
            {movies?.length > 0 && (
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mb-4">
                    <Pagination page={page} setPage={setPage} max={max} />
                    <input
                        autoComplete="off"
                        className="form-control border-0 rounded-pill px-4 py-2"
                        onChange={handleOnSearch}
                        placeholder="Search movies..."
                        type="text"
                        value={search}
                        style={{
                            backgroundColor: "#1e1e2f",
                            color: "#ffffff",
                            fontWeight: "500",
                            width: "300px",
                        }}
                    />
                    <div className="mt-2">
                        <SortMovies setPage={setPage} />
                    </div>
                </div>
            )}
            <div className="d-flex flex-wrap justify-content-center gap-4">
                {movies?.length > 0 ? (
                    filteredMovie()
                        .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                        .map((m, i) => (
                            <div
                                className="card text-light shadow-sm"
                                style={{ width: '400px', maxWidth: '90%', backgroundColor: "#2c2f33", }}
                                key={i}
                            >
                                <div className="row g-0">
                                    <div className="col-4">
                                        <img
                                            src={m.image}
                                            className="img-fluid rounded-start"
                                            style={{ height: '100%', objectFit: 'cover' }}
                                            alt={m.title}
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body py-3 px-3">
                                            <h5 className="card-title text-info mb-2">{m.title}</h5>
                                            <p className="card-text mb-1">
                                                <i className="bi bi-star-fill text-warning fs-5 me-2"></i>
                                                {m.rating}
                                            </p>
                                            <p className="card-text mb-3">Release: {m.release_date}</p>
                                            <Link to={`/movieDetails/${m.id}`} className="btn btn-outline-info btn-sm">
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Spinner />
                )}
            </div>
            {movies?.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination page={page} setPage={setPage} max={max} />
                </div>
            )}
        </div>
    )
}