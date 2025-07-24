import { useDispatch } from "react-redux";
import { orderByTitle, orderByRating, orderByPrice } from "../../redux/slices/movieSlice";

export default function SortMovies({ setPage }) {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "title_asc" || value === "title_dsc") {
            setPage(1)
            dispatch(orderByTitle(value))
        } 
        if(value === "rating_asc" || value === "rating_dsc") {
            setPage(1)
            dispatch(orderByRating(value))
        } 
        if(value === "price_asc" || value === "price_dsc") {
            setPage(1)
            dispatch(orderByPrice(value))
        } 
    } 

    return (
        <div>
            <select className="form-select bg-dark text-light border-secondary ms-2" style={{width: 'auto'}} defaultValue="disabled" onChange={handleChange}>
                <option value="disabled" disabled>Sort by</option>
                <option value="title_asc"> Title (ASC) </option>
                <option value="title_dsc" > Title (DSC) </option>
                <option value="rating_asc"> Rating (ASC) </option>
                <option value="rating_dsc" > Rating (DSC) </option>
                <option value="price_asc"> Price (ASC) </option>
                <option value="price_dsc" > Price (DSC) </option>
            </select>
        </div>
    )
}