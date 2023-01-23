import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { getAllOrders } from "../../redux/actions/userActions";
import SortOrders from "../Sort/SortOrders";
import Spinner from "../Spinner";
import NavBar from "./NavBar";


export default function Orders() {

    const { orders } = useSelector(state => state.user)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch]);

    function filteredOrder() {
        if(search.length === 0) {
            return orders/* .slice(currentPage, currentPage + 8); */
        } 
        const filtered = orders.filter(o => o?._id.toLowerCase().includes(search.toLowerCase()))
        if(filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that order',
                icon: "error",
                timer: 3000,
            });
            /* setCurrentPage(0)
            setNumberPage(1) */
            setSearch("")
        } 
        return filtered/* .slice(currentPage, currentPage + 8) */
    }

    function handleOnSearch(e) {
        /* setCurrentPage(0) */
        setSearch(e.target.value)
        /* setNumberPage(1) */
    }

    return (
        <div>
            <NavBar />
            <div className="nav justify-content-center mb-3">
                <label className="form-label mb-0">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Insert order ID" type="text" value={search} />
                </label>
                < SortOrders />
            </div>
            { 
            orders.length > 0 ?
            filteredOrder()
            ?.map((o, i) => {
                return (
                    <div className="card d-inline-flex ms-4 mb-3" style={{width: '19rem'}} key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{o?.purchased_Movie?.title}</h5>
                            <p className="card-text">Order ID: {o?._id}</p>
                            <p> Username: {o?.userName}  </p>
                            <p> Income: ${o.purchased_Movie?.price?.toFixed()} </p>
                        </div>
                    </div>
                )
            }) : <Spinner /> }
        </div>
    )
}