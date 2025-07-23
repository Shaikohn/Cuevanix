import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { getProfileById } from "../../redux/actions/userActions"
import Pagination from "../Pagination"


export default function Purchases() {

    const {profile} = useSelector(state => state.user)
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [search, setSearch] = useState('')
    const filtered = profile?.orders?.filter(o => o?.purchased_Movie?.title.toLowerCase().includes(search.toLowerCase()))
    const max = Math.ceil(filtered?.length / perPage)

    useEffect(() => {
        if(localUser) {
            dispatch(getProfileById(localUser.result._id))
        }
    }, [])

    function filteredOrder() {
        if(search.length === 0) {
            return filtered
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
        <div className="bg-dark min-vh-100 py-4">
            <div className="text-center text-light mb-5">
                <h1 className="fw-bold display-5 mb-3">
                    {profile?.name}'s Purchased Movies
                </h1>
                <p className="lead text-secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
                    Here you'll find all the movies you've purchased. Click on any of them to watch the trailer provided by our movie API.
                </p>
            </div>
            {profile?.orders?.length > 0 && (
                <div className="container mb-4">
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-wrap">
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
                                width: "30dvh",
                            }}
                        />
                    </div>
                    <div className="d-flex flex-wrap justify-content-center gap-4">
                        {filteredOrder()
                            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                            .map((o, i) => (
                                <div
                                    key={i}
                                    className="card text-light"
                                    style={{
                                        backgroundColor: "#2c2f33",
                                        border: "1px solid #444",
                                        transition: "transform 0.2s",
                                        width: "30dvh",
                                    }}
                                >
                                    <img
                                        src={o?.purchased_Movie?.image}
                                        className="card-img-top"
                                        alt={o?.purchased_Movie?.title}
                                        style={{ height: "40dvh", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="bi bi-star-fill text-warning fs-5 me-2"></i>
                                            <span className="fs-6">{o?.purchased_Movie?.rating}</span>
                                        </div>
                                        <p className="card-text mb-3">
                                            Release date: {o?.purchased_Movie?.release_date}
                                        </p>
                                        <Link
                                            to={`/purchasedMovie/${o?.purchased_Movie?.id}`}
                                            className="btn btn-outline-light btn-sm"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Pagination page={page} setPage={setPage} max={max} />
                    </div>
                </div>
            )}
            {profile?.orders?.length === 0 && (
                <p className="text-center text-light">None</p>
            )}
        </div>
    )
}