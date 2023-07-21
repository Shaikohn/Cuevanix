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
        <div>
            <NavBar />
            {
                orders?.length > 0 ? 
                <div className="nav justify-content-center mb-3">
                    <Pagination page={page} setPage={setPage} max={max} />
                    <label className="form-label mt-2">
                        <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search by order ID" type="text" value={search} />
                    </label>
                    <label className="form-label ms-2 mt-2">
                        <input autoComplete="off" className="form-control" onChange={handleOnSearchByName} placeholder="Search by Username" type="text" value={nameSearch} />
                    </label>
                    <label className="form-label mt-2">
                        < SortOrders />
                    </label>
                </div> : ''
            }
            { 
            orders.length > 0 ?
            filteredOrder()
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            ?.map((o, i) => {
                return (
                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem', height: '210px'}} key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                            <p className="card-text">Order ID: {o?._id}</p>
                            <p> Username: {o?.userName}  </p>
                            <p> Income: ${o.purchased_Movie?.price?.toFixed()} </p>
                        </div>
                    </div>
                )
            }) : <Spinner /> }
            { 
                orders.length > 0 ? <Pagination page={page} setPage={setPage} max={max} /> : ''
            }
        </div>
    )
}