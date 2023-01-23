import { useDispatch } from "react-redux";
import { orderByUsername } from "../../redux/slices/userSlice";

export default function SortOrders(/* { setPage } */) {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "name_asc" || value === "name_dsc") {
            /* setPage(1) */
            dispatch(orderByUsername(value))
        } 
    } 

    return (
        <div>
            <select className="form-select ms-3" onChange={handleChange}>
                <option selected disabled>Sort by</option>
                <option value="name_asc"> Username (ASC) </option>
                <option value="name_dsc" > Username (DSC) </option>
            </select>
        </div>
    )
}