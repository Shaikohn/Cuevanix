import { useDispatch } from "react-redux";
import { orderByUsername } from "../../redux/slices/userSlice";

export default function SortOrders() {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "name_asc" || value === "name_dsc") {
            dispatch(orderByUsername(value))
        } 
    } 

    return (
        <div>
            <select className="form-select bg-dark text-light border-secondary ms-2" style={{height: '5dvh'}} defaultValue="disabled" onChange={handleChange}>
                <option value="disabled" disabled>Sort by</option>
                <option value="name_asc"> Username (ASC) </option>
                <option value="name_dsc" > Username (DSC) </option>
            </select>
        </div>
    )
}