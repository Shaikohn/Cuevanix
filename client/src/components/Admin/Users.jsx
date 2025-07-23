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
        <div className="container-fluid bg-dark text-light min-vh-100">
            <NavBar />
            <div className="text-center mb-4">
                <h1 className="text-info">Users Panel</h1>
                <p className="text-secondary">Here you can see and manage all registered users on the platform.</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                <Pagination page={page} setPage={setPage} max={max} />
                <input
                    autoComplete="off"
                    className="form-control border-0 rounded-pill px-4 py-2"
                    onChange={handleOnSearch}
                    placeholder="Search by username..."
                    type="text"
                    value={search}
                    style={{
                        backgroundColor: "#1e1e2f",
                        color: "#ffffff",
                        fontWeight: "500",
                        width: "300px",
                    }}
                />
                <input
                    autoComplete="off"
                    className="form-control border-0 rounded-pill px-4 py-2"
                    value={idSearch}
                    onChange={handleOnSearchById}
                    placeholder="Search by id..."
                    type="text"
                    style={{
                        backgroundColor: "#1e1e2f",
                        color: "#ffffff",
                        fontWeight: "500",
                        width: "300px",
                    }}
                />
                <SortUsers />
            </div>
            <div className="table-responsive px-3">
                {filteredUsers.length > 0 ? (
                    <table className="table table-dark table-hover align-middle border border-secondary rounded overflow-hidden">
                        <thead style={{ backgroundColor: '#1f1f1f' }}>
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUser()
                                .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
                                .map((u, i) => (
                                    <tr key={i}>
                                        <td className={u.admin || u.owner ? "text-warning fw-bold" : u.banned ? "text-danger fw-bold" : ""}>
                                            {u?.name}
                                        </td>
                                        <td style={{ fontSize: "0.9rem" }}>{u?._id}</td>
                                        <td>
                                            {u.owner ? "Owner" : u.admin ? "Admin" : "User"}
                                        </td>
                                        <td>
                                            {u.banned ? "Banned" : "Active"}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/user/${u._id}`}
                                                className="btn btn-sm btn-outline-info"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center mt-5">
                        <Spinner />
                    </div>
                )}
            </div>
        </div>
    )
}