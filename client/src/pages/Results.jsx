import { useEffect, useState, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { getAllResults } from "../redux/actions/movieActions"
import { clearResults } from "../redux/slices/movieSlice"
import Pagination from "../components/Pagination"
import SortResults from "../components/Sort/SortResults"
import Spinner from "../components/Spinner"


export default function Results() {

    let query = new URLSearchParams(window.location.search)
    let keyword = query.get('keyword')
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const results = useSelector(state => state.movies.filteredResults)
    const { resultPage } = useSelector(state => state.movies)
    const [page, setPage] = useState(resultPage)
    const [perPage, setPerPage] = useState(6)
    const [search, setSearch] = useState('')
    const filtered = results.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    const max = Math.ceil(filtered?.length / perPage)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearResults())
        dispatch(getAllResults(keyword, setLoading, navigate))
    }, [keyword])

    function filteredResult() {
        if(search.length === 0) {
            return filtered
        } 
        if(filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that result',
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
        <div style={{width: '100%'}} className="row" >
            <h1> Results of: {keyword} </h1>
            <div className="nav justify-content-center">
                <Pagination page={page} setPage={setPage} max={max} />
                <label className="form-label mb-0 mt-2">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search in the results" type="text" value={search} />
                </label>
                <SortResults setPage={setPage} />
            </div>
            {
                loading ? <Spinner /> : filteredResult().slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                .map((m, i) => {
                    return (
                        <div className="col-4" key={i}>
                            <div className="card my-3 mx-3">
                                <img style={{height: '300px'}} className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} alt="film" />
                                    <div className="card-body">
                                        <h5 className="card-title text-info"> {m.title} </h5>
                                        <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                        <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                    </div>
                            </div>
                        </div>
                    )
                })
            }
            <Pagination page={page} setPage={setPage} max={max} />
        </div>
        </>
    )
}