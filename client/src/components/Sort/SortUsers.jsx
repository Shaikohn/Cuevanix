import { useDispatch } from "react-redux";
import { filterUserRole, userByName } from "../../redux/slices/userSlice";

export default function SortUsers(/* { setPage } */) {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "name_asc" || value === "name_dsc") {
            /* setPage(1) */
            dispatch(userByName(value))
        } 
    } 

    function handleFilter(e) {
        const value = e.target.value
        dispatch(filterUserRole(value))
    }

    return (
        <div className="d-flex">
            <select className="form-select ms-3" onChange={handleChange}>
                <option selected disabled>Sort by</option>
                <option value="name_asc"> Name (ASC) </option>
                <option value="name_dsc" > Name (DSC) </option>
            </select>
            <select className="form-select ms-3" onChange={handleFilter}>
            <option defaultValue value="All">All users</option>
                <option value="Users"> Users </option>
                <option value="Admins" > Admins </option>
            </select>
        </div>
    )
}