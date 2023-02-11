import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import Pagination from "../Pagination"


export default function Purchases() {

    const {profile} = useSelector(state => state.user)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [search, setSearch] = useState('')
    const filtered = profile?.orders?.filter(o => o?.purchased_Movie?.title.toLowerCase().includes(search.toLowerCase()))
    const max = Math.ceil(filtered?.length / perPage)

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
        <div>
            <h1> {profile?.name} purchases: </h1>
            {
                profile?.orders?.length > 0 ? 
                    <div className="nav justify-content-center mb-2">
                        <Pagination page={page} setPage={setPage} max={max} />
                        <label className="form-label mt-2">
                            <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search movie" type="text" value={search} />
                        </label>
                    </div> : ''
            }
            { profile?.orders?.length > 0 ?
                            filteredOrder()
                            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                            .map((o, i) => {
                                return (
                                    <div className="card mb-3 ms-5 d-inline-flex align-items-center" style={{maxWidth: '400px'}} key={i}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={o?.purchased_Movie?.image} className="img-fluid rounded-start" style={{height: '100%'}} alt={o?.purchased_Movie?.title} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                                                    <p className="card-text">Rating: {o?.purchased_Movie?.rating}</p>
                                                    <p className="card-text">Release date: {o?.purchased_Movie?.release_date}</p>
                                                    <Link to={`/purchasedMovie/${o?.purchased_Movie?.id}`} className="btn btn-primary">View</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : 'None'
                        }
            {
                profile?.orders?.length > 0 ? <Pagination page={page} setPage={setPage} max={max} /> : ''
            }
        </div>
    )
}