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
        <div className="bg-dark min-vh-100 text-light">
            <NavBar />
            {movie !== null ? (
                <div className="container py-4">
                    <h2 className="text-primary fw-bold">Movie Details</h2>
                    <p className="text-secondary mb-4">
                        Here you can view the full information of the selected movie, edit its data, or remove it from the system.
                    </p>
                    <h3 className="text-info">{movie?.title}</h3>
                    <div className="d-flex flex-wrap mt-3">
                        <div className="me-4 mb-3">
                            <img
                                style={{ height: '40dvh', borderRadius: '10px' }}
                                className="img-fluid shadow"
                                src={`https://image.tmdb.org/t/p/w500/${movie?.image}`}
                                alt="film"
                            />
                        </div>
                        <div className="col-lg-7 col-md-12">
                            <h5 className="text-muted">{movie?.release_date}</h5>
                            <h5 className="mt-3 text-info">Overview:</h5>
                            <p>{movie?.overview}</p>
                            <h5 className="mt-3 text-warning">
                                Rating:{" "}
                                {movie?.rating === 0 ? (
                                    "None (This movie was not rated by critics!)"
                                ) : (
                                    <>
                                        <i className="bi bi-star-fill text-warning fs-5 me-2"></i>
                                        {movie?.rating}
                                    </>
                                )}
                            </h5>
                            <h5 className="mt-2 text-success">
                                Price: ${movie?.price?.toFixed()}
                            </h5>
                            <div className="d-flex gap-3 mt-4">
                                <button className="btn btn-outline-warning" onClick={openedModal}>
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() =>
                                        Swal.fire({
                                            title: 'Warning',
                                            text: 'Are you sure you want to remove this movie?',
                                            icon: 'warning',
                                            showDenyButton: true,
                                            denyButtonText: 'Cancel',
                                            confirmButtonText: 'Confirm',
                                            confirmButtonColor: 'green',
                                        }).then((res) => {
                                            if (res.isConfirmed) {
                                                dispatch(deleteMovie(id, navigate));
                                            }
                                        })
                                    }
                                >
                                    <MdDeleteForever size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                <div className="p-4 rounded text-light" style={{ backgroundColor: '#1c1c1c' }}>
                    <h2 className="text-center text-info mb-4">Edit Movie</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3 text-center">
                            <label className="form-label fw-bold">Price in US$</label>
                            <input
                                type="number"
                                defaultValue={movie?.price}
                                name="price"
                                className="form-control bg-dark text-light border-secondary mx-auto"
                                style={{ width: '12dvh' }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4 text-center">
                            <label className="form-label fw-bold">Overview</label>
                            <textarea
                                defaultValue={movie?.overview}
                                name="overview"
                                className="form-control bg-dark text-light border-secondary mx-auto"
                                style={{ width: '30dvh', height: '12dvh' }}
                                placeholder="Edit movie overview"
                                onChange={handleChange}
                            />
                        </div>
                        {loading ? (
                            <div className="text-center mb-3">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-primary me-3">
                                    Send
                                </button>
                                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </Modals>
        </div>
    )
}