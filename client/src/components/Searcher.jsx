import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Searcher() {

    const navigateTo = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const keyword = e.target.keyword.value

        if(keyword.length === 0) {
            Swal.fire({
                title: 'FAILED SEARCH',
                text: 'You have to write a keyword!',
                icon: 'error',
                timer: 3000,
            })
        } else if (keyword.length < 4) {
                Swal.fire({
                    title: 'FAILED SEARCH',
                    text: 'You have to write more than 4 letters!',
                    icon: 'error',
                    timer: 3000,
                })
            } else {
                e.target.keyword.value = ''
                navigateTo(`/results?keyword=${keyword}`)
            }
        }

    return (
        <div>
            <form className="d-flex align-items-center" onSubmit={submitHandler}>
                <label className="form-label mb-0">
                    <input autoComplete="off" className="form-control" type='text' name='keyword' placeholder="Search a movie..."/>
                </label>
                <button className="btn btn-success" type='submit'>Search</button>
            </form>
        </div>
    )
}