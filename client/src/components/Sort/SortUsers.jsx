import { useDispatch } from "react-redux";
import { filterUserRole, userByName } from "../../redux/slices/userSlice";

export default function SortUsers() {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "name_asc" || value === "name_dsc") {
            dispatch(userByName(value))
        } 
    } 

    function handleFilter(e) {
        const value = e.target.value
        dispatch(filterUserRole(value))
    }

    return (
        <div className="d-flex">
            <select className="form-select bg-dark text-light border-secondary ms-2" onChange={handleChange} defaultValue="disabled">
                <option value="disabled" disabled>Sort by</option>
                <option value="name_asc"> Name (ASC) </option>
                <option value="name_dsc" > Name (DSC) </option>
            </select>
            <select className="form-select bg-dark text-light border-secondary ms-2" onChange={handleFilter}>
            <option defaultValue value="All">All users</option>
                <option value="Users"> Users </option>
                <option value="Admins" > Admins </option>
            </select>
        </div>
    )
}