import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { getAllOrders } from "../../redux/actions/userActions";
import Pagination from "../Pagination";
import SortOrders from "../Sort/SortOrders";
import Spinner from "../Spinner";
import NavBar from "./NavBar";


export default function Orders() {

    const { orders } = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const [nameSearch, setNameSearch] = useState('')
    const filtered = orders.filter(o => o?._id.toLowerCase().includes(search.toLowerCase())  && o.userName.toLowerCase().includes(nameSearch.toLowerCase()))
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const max = Math.ceil(filtered.length / perPage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch]);

    function filteredOrder() {
        if(filtered.length < 1) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that order',
                icon: "error",
                timer: 3000,
            });
            setPage(1)
            setSearch("")
            setNameSearch("")
        } 
        return filtered
    }

    function handleOnSearch(e) {
        setPage(1)
        setSearch(e.target.value)
    }
    function handleOnSearchByName(e) {
        setPage(1)
        setNameSearch(e.target.value)
    }

    return (
        <div className="container-fluid bg-dark text-light min-vh-100">
            <NavBar />
            <div className="text-center mb-4">
                <h1 className="text-info">Orders Panel</h1>
                <p className="text-secondary">Check and manage all the purchases made on the platform.</p>
            </div>
            {orders?.length > 0 && (
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                    <Pagination page={page} setPage={setPage} max={max} />
                    <input
                        autoComplete="off"
                        className="form-control border-0 rounded-pill px-4 py-2"
                        onChange={handleOnSearch}
                        placeholder="Search by title..."
                        type="text"
                        value={search}
                        style={{
                            backgroundColor: "#1e1e2f",
                            color: "#ffffff",
                            fontWeight: "500",
                            width: "30dvh",
                        }}
                    />
                    <input
                        autoComplete="off"
                        placeholder="Search by ID..."
                        className="form-control border-0 rounded-pill px-4 py-2"
                        type="text"
                        value={nameSearch}
                        onChange={handleOnSearchByName}
                        style={{
                            backgroundColor: "#1e1e2f",
                            color: "#ffffff",
                            fontWeight: "500",
                            width: "30dvh",
                        }}
                    />
                    <SortOrders />
                </div>
            )}
            {orders.length > 0 ? (
                <div className="table-responsive px-3">
                    <table className="table table-dark table-hover align-middle border border-secondary rounded overflow-hidden">
                        <thead style={{ backgroundColor: '#1f1f1f' }}>
                            <tr className="text-info">
                                <th>Movie Title</th>
                                <th>Order ID</th>
                                <th>Username</th>
                                <th>Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrder()
                                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                                .map((o, i) => (
                                    <tr key={i}>
                                        <td>{o?.purchased_Movie?.title}</td>
                                        <td style={{ fontSize: '0.9rem' }}>{o?._id}</td>
                                        <td>{o?.userName}</td>
                                        <td>${o.purchased_Movie?.price?.toFixed()}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
            <div className="text-center mt-5">
                <Spinner />
            </div>
        )}
        </div>
    )
}