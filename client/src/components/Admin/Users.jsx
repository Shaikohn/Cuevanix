import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllUsers } from "../../redux/actions/userActions";
import SortUsers from "../Sort/SortUsers";
import Spinner from "../Spinner";
import NavBar from "./NavBar";

export default function Users() {

    const dispatch = useDispatch()
    const { allUsers } = useSelector(state => state.user)
    const [search, setSearch] = useState('')

    function filteredUser() {
        const filtered = allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
        if(filtered.length === 0) {
            Swal.fire({
                title: "Error",
                text: 'Sorry, we couldnt find that user',
                icon: "error",
                timer: 3000,
            });
            /* setCurrentPage(0)
            setNumberPage(1) */
            setSearch("")
        } 
        return filtered/* .slice(currentPage, currentPage + 8) */
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch]);

    function handleOnSearch(e) {
        /* setCurrentPage(0) */
        setSearch(e.target.value)
        /* setNumberPage(1) */
    }

    return ( 
        <div>
            <NavBar />
            <div className="nav justify-content-center">
                <label className="form-label mb-0">
                    <input autoComplete="off" className="form-control" onChange={handleOnSearch} placeholder="Search user" type="text" value={search} />
                </label>
                <SortUsers />
            </div>
            { 
            allUsers.length > 0 ?
            filteredUser()
            .map((u, i) => {
                return (
                    <ul className="table" key={i}>
                        <li><Link to={`/user/${u._id}`} /* className="btn btn-primary" */>{u.name}</Link></li>
                    </ul>
                )
            }) : <Spinner /> }
        </div>

    )
}