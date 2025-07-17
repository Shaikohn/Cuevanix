import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/actions/movieActions";
import Spinner from "./Spinner/index";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import SortMovies from "./Sort/SortMovies";

export default function Catalog() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { movies, filteredMovies } = useSelector(state => state.movies);
    const [page, setPage] = useState(1);
    const [perPage] = useState(8);
    const [search, setSearch] = useState('');

    const filtered = filteredMovies.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase())
    );
    const max = Math.ceil(filtered?.length / perPage);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch, location]);

    function handleOnSearch(e) {
        setSearch(e.target.value);
        setPage(1);
    }

    function filteredMovie() {
        if (search.length === 0) return filteredMovies;
        if (filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Sorry, we couldn't find that movie",
                icon: "error",
                timer: 3000,
            });
            setPage(1);
            setSearch("");
        }
        return filtered;
    }

    return (
        <div className="container-fluid bg-dark text-light min-vh-100 py-4">
            <h1 className="text-center mb-4 fw-bold">🎬 Explore the Movie Catalog</h1>

            <div className="row justify-content-center mb-4 gy-2 gx-2 align-items-center">
                <div className="col-md-3">
                    <Pagination page={page} setPage={setPage} max={max} />
                </div>

                <div className="col-md-5">
                    <div className="input-group">
                        <input
                            autoComplete="off"
                            className="form-control"
                            onChange={handleOnSearch}
                            placeholder="Search for a movie..."
                            type="text"
                            value={search}
                        />
                        <span className="input-group-text bg-primary text-white">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>

                <div className="col-md-3">
                    <SortMovies setPage={setPage} />
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {movies.length > 0 ? (
                    filteredMovie()
                        .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                        .map((m, i) => (
                            <div className="col" key={i}>
                                <div className="card bg-secondary text-light shadow-sm h-100 border-0" style={{ transition: 'transform 0.2s' }}>
                                    <img src={m.image} className="card-img-top" alt={m.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{m.title}</h5>
                                        <p className="card-text">{m.overview}</p>
                                        <div className="d-flex gap-3 mt-3">
                                            <Link
                                                to={`/movie/${m.id}`}
                                                className="btn fw-semibold text-white border-0 mt-auto shadow-sm"
                                                style={{
                                                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.4)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.2)'}
                                            >
                                                View Details
                                            </Link>
                                            {/* Rating */}
                                            <div
                                                className="d-flex align-items-center rounded-pill px-3 py-1"
                                                style={{
                                                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 193, 7, 0.4)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 193, 7, 0.2)'}
                                            >
                                                <i className="bi bi-star-fill text-warning fs-5 me-2"></i>
                                                <span className="text-white fw-semibold"> {m.rating} </span>
                                            </div>
                                            {/* Precio */}
                                            <div
                                                className="d-flex align-items-center rounded-pill px-3 py-1"
                                                style={{
                                                    backgroundColor: 'rgba(40, 167, 69, 0.15)',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(40, 167, 69, 0.3)'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(40, 167, 69, 0.15)'}
                                            >
                                                <i className="bi bi-currency-dollar text-white fs-5 me-2"></i>
                                                <span className="text-white fw-semibold"> {m.price} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <Spinner />
                )}
            </div>
            <div className="mt-4">
                <Pagination page={page} setPage={setPage} max={max} />
            </div>
        </div>
    );
}
