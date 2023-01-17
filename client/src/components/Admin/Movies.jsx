import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getMovies } from "../../redux/actions/movieActions"
import Pagination from "../Pagination"
import Spinner from "../Spinner"


export default function Movies() {

    const {movies} = useSelector(state => state.movies)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const max = Math.ceil(movies?.length / perPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovies())
    }, [dispatch])

    return (
        <div>
            {movies.length > 0 ? 
            movies
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