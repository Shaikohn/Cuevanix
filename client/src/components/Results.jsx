import axios from "axios"
import { useEffect, useState, useReducer } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import Header from "./Header"
import sadFilm from '../assets/sadFilm.png'
import Pagination from "./Pagination"


export default function Results() {

    let query = new URLSearchParams(window.location.search)
    let keyword = query.get('keyword')
    const [results, setResults] = useState([])
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const max = Math.ceil(results?.length / perPage)

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

    return (
        <>
        <div className="row" >
            <h1> Results of: {keyword} </h1>
            {results.length === 0 && 
            <div>
                <h3>There isnt any result for this search!</h3>
                <img src={sadFilm} alt='Not found' />
            </div>
            }
            {results?.slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((m, i) => {
                return (
                    <div className="col-4" key={i}>
                        <div className="card my-4">
                            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} alt="film" />
                                <div className="card-body">
                                    <h5 className="card-title"> {m.title} </h5>
                                    <p className="card-text"> {m.overview.substring(0, 100)}... </p>
                                    <Link to={`/movie/${m.id}`} className="btn btn-primary">View details</Link>
                                </div>
                        </div>
                    </div>
                )
            })}
            <Pagination page={page} setPage={setPage} max={max} />
        </div>
        </>
    )
}