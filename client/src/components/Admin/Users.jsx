import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllUsers } from "../../redux/actions/userActions";
import Pagination from "../Pagination";
import SortUsers from "../Sort/SortUsers";
import Spinner from "../Spinner";
import NavBar from "./NavBar";

export default function Users() {

    const dispatch = useDispatch()
    const { filteredUsers } = useSelector(state => state.user)
    console.log(filteredUsers)
    const [search, setSearch] = useState('')
    const [idSearch, setIdSearch] = useState('')
    const filtered = filteredUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) && u._id.toLowerCase().includes(idSearch.toLowerCase()))
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const max = Math.ceil(filtered.length / perPage)

    function filteredUser() {
        if(filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that user',
                icon: "error",
                timer: 3000,
            });
            setPage(1)
            setSearch("")
            setIdSearch("")
        } 
        return filtered
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    function handleOnSearch(e) {
        setPage(1)
        setSearch(e.target.value)
    }

    function handleOnSearchById(e) {
        setPage(1)
        setIdSearch(e.target.value)
    }

    return ( 
        <div>
            <NavBar />
            <div className="nav justify-content-center">
                <Pagination page={page} setPage={setPage} max={max} />
                <label className="form-label mt-2">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search by username" type="text" value={search} />
                </label>
                <label className="form-label ms-2 mt-2">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearchById} placeholder="Search by ID" type="text" value={idSearch} />
                </label>
                <label className="form-label mt-2">
                    <SortUsers />
                </label>
            </div>
            { 
            filteredUsers.length > 0 ?
            filteredUser()
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((u, i) => {
                return (
                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/user/${u._id}`} key={i}>
                    <div className="card d-inline-flex ms-4 mb-2 mt-3" style={{width: '19rem'}}>
                        <div className="card-body">
                            {u.admin === true || u.owner === true ?  <h5 className="card-title text-warning"> {u?.name} </h5> : u.banned === true ? <h5 className="card-title text-danger"> {u?.name} </h5> : <h5 className="card-title"> {u?.name} </h5> } 
                            <p className="card-text">User ID: {u?._id}</p>
                        </div>
                    </div>
                    </Link>
                )
            }) : <Spinner /> }
            <Pagination page={page} setPage={setPage} max={max} />
        </div>

    )
}