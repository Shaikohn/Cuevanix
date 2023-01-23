import { useDispatch } from "react-redux";
import { resultByTitle, resultByRating } from "../../redux/slices/movieSlice";

export default function SortResults({ setPage }) {

    let dispatch = useDispatch()

    function handleChange(e){
        const value = e.target.value;
        if(value === "title_asc" || value === "title_dsc") {
            setPage(1)
            dispatch(resultByTitle(value))
        } 
        if(value === "rating_asc" || value === "rating_dsc") {
            setPage(1)
            dispatch(resultByRating(value))
        } 
    } 

    return (
        <div>
            <select className="form-select ms-3 mt-2" onChange={handleChange}>
                <option selected disabled>Sort by</option>
                <option value="title_asc"> Title (ASC) </option>
                <option value="title_dsc" > Title (DSC) </option>
                <option value="rating_asc"> Rating (ASC) </option>
                <option value="rating_dsc" > Rating (DSC) </option>
            </select>
        </div>
    )
}