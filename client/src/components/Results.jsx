import axios from "axios"
import { useEffect, useState, useReducer } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import sadFilm from '../assets/sadFilm.png'
import Pagination from "./Pagination"
import SortResults from "./Sort/SortResults"
import Spinner from "./Spinner"


export default function Results() {

    let query = new URLSearchParams(window.location.search)
    let keyword = query.get('keyword')
    const [results, setResults] = useState([])
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [search, setSearch] = useState('')
    const filtered = results.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    const max = Math.ceil(filtered?.length / perPage)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const apikey = '9d0aee88c318326033d3cc2001d4d5ed' 
        const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${keyword}`
        axios.get(endpoint)
            .then((res) => {
                setResults(res.data.results)
                forceUpdate()
            })
            .catch((error) => {
                Swal.fire({
                    title: 'SOMETHING FAILED, TRY LATER',
                    icon: 'error',
                    timer: 3000,
                });
            })
    }, [keyword, reducerValue])

    function filteredResult() {
        if(search.length === 0) {
            return results
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
            {results.length === 0 && loading === false && 
            <div className="">
                <h3>There isnt any result for this search!</h3>
                <img src={sadFilm} alt='Not found' />
            </div>
            }
            <div className="nav justify-content-center">
            <Pagination page={page} setPage={setPage} max={max} />
                <label className="form-label mb-0 mt-2">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search in the results" type="text" value={search} />
                </label>
                {/* <SortResults setPage={setPage} /> */}
            </div>
            {
                loading === true ? <Spinner /> : filteredResult().slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                .map((m, i) => {
                    return (
                        <div className="col-4" key={i}>
                            <div className="card my-3 mx-3">
                                <img style={{height: '300px'}} className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} alt="film" />
                                    <div className="card-body">
                                        <h5 className="card-title"> {m.title} </h5>
                                        <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                        <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                    </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}