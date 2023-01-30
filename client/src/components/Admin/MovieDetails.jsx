import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteMovie, getDetails, getMovieAdmin, patchMovie } from "../../redux/actions/movieActions"
import { clearMovie, clearMovieAdmin } from "../../redux/slices/movieSlice"
import Spinner from "../Spinner"
import NavBar from "./NavBar";
import { MdDeleteForever } from 'react-icons/md'
import { useModal } from "../Modals/useModal"
import Modals from "../Modals/Modals"


export default function MovieDetails() {
    
    let { id } = useParams()
    const movie = useSelector(state => state.movies.details)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const [loading, setLoading] = useState(false)

    const initialState = { price: movie?.price, overview: movie?.overview }
    const [editMovie, setEditMovie] = useState(initialState)
    console.log(editMovie)

    useEffect(() => {
        dispatch(clearMovie())
        dispatch(getDetails(id))
    }, [dispatch, id])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(patchMovie(id, editMovie, setLoading))
    }

    const handleChange = (e) => {
        setEditMovie({ price: movie?.price, overview: movie?.overview, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <NavBar />
            {movie !== null ? <div>
            <h2 className="ms-5 text-info"> {movie?.title} </h2>
            <div className="d-flex">
                <div className="ms-5 mb-2">
                    <img style={{height: '400px', borderRadius: '10px'}} className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie?.image}`} alt="film" />
                </div>
                <div className="col-7 ms-3">
                    <h5> {movie?.release_date} </h5>
                    <h5> Overview: </h5>
                    <p> {movie?.overview} </p>
                    <h5>Rating: {movie?.rating === 0 ? 'None (This movie was not rated by critics!)' : `${movie?.rating}`} </h5>
                    <h5>Price: ${movie?.price?.toFixed()} </h5>
                    <div className="d-flex">
                    <button className="btn btn-warning" onClick={() => openedModal()}>Edit</button>
                    <button type="button" className="text-danger" onClick={() => Swal.fire({
                        title: "Warning",
                        text: "Are you sure you want to remove this movie?",
                        icon: "warning",
                        showDenyButton: true,
                        denyButtonText: "Cancel",
                        confirmButtonText: "Confirm",
                        confirmButtonColor: "green",
                        }).then((res) => {
                            if (res.isConfirmed) {
                                dispatch(deleteMovie(id, navigate))
                            }
                        })}>< MdDeleteForever size={50} /></button>
                        </div>
                </div>
            </div>
            </div> : <Spinner />}
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> Edit movie's data! </h2>
        <form className="container" onSubmit={handleSubmit} noValidate>
                    <div className='d-flex text-center'>
                        <div className="form-group col-md-4 ms-5 ">
                            <label>Overview</label>
                            <textarea defaultValue={movie?.overview} autoComplete='off' type="text" name="overview" className="form-control" placeholder="Name" onChange={handleChange}  />
                        </div>
            </div>
            <div className="mb-3">
  <label htmlFor="formFile" className="form-label">Price in dollars</label>
  <input type="number" defaultValue={movie?.price} name="price" className="form-control" id="formFile" onChange={handleChange} />
</div>
{
  loading ? 
  <div className='text-center mt-3 mb-3'>
  <div className="spinner-border text-primary" role="status">
      {/* <span className="sr-only">Loading...</span> */}
  </div>
  </div>
: 
<div className='text-center mt-3'>
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
}
            
        </form>
        {
                loading ? '' : <button className="btn btn-danger" onClick={closeModal}>CLOSE</button>
        }
        </Modals>
        </div>
    )
}