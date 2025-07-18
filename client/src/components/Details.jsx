import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../redux/actions/movieActions";
import Swal from "sweetalert2";
import { clearMovie } from "../redux/slices/movieSlice";
import Spinner from "./Spinner";
import { useModal } from "./Modals/useModal";
import Modals from "./Modals/Modals";
import Stripe from "./Stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BsFillBagPlusFill } from 'react-icons/bs';
import { MdDeleteForever } from "react-icons/md";
import { deleteComment } from "../redux/actions/commentActions";
import { getProfileById } from "../redux/actions/userActions";

export default function Details() {
    const { id } = useParams();
    const movie = useSelector(state => state.movies.details);
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const userId = localUser?.result?._id;
    const movieId = movie?.id;
    const { profile } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const stripePromise = loadStripe("pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK");
    const alreadyBought = profile?.orders?.find((m) => m?.purchased_Movie?.id === movie?.id);

    useEffect(() => {
        dispatch(clearMovie());
        dispatch(getDetails(id));
        if (localUser) {
            dispatch(getProfileById(localUser.result._id));
        }
    }, []);

    return (
        <>
            {movie !== null ? (
                <div className="bg-dark text-light py-5" style={{ minHeight: '100vh' }}>
    <div className="container bg-secondary bg-opacity-10 rounded-4 p-4">
        <h2 className="text-info mb-4">{movie?.title}</h2>

        <div className="row gx-5 gy-4">
            {/* Poster + Compra */}
            <div className="col-md-4 text-center">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.image}`}
                    alt={movie?.title}
                    className="img-fluid rounded shadow mb-3"
                    style={{height:"400px", width: "100%", maxWidth: "300px"}}
                />
                {localUser !== null && alreadyBought === undefined && (
                    <button onClick={openedModal} type="button" className="btn btn-outline-success w-100">
                        <BsFillBagPlusFill size={20} className="me-2" />
                        Buy Now
                    </button>
                )}
            </div>

            {/* Detalles */}
            <div className="col-md-8">
                <div className="mb-3">
                    <strong className="text-warning">Release Date:</strong>
                    <div>{movie?.release_date}</div>
                </div>
                <div className="mb-3">
                    <strong className="text-warning">Overview:</strong>
                    <div className="text-light">{movie?.overview}</div>
                </div>
                <div className="mb-3">
                    <strong className="text-warning">Rating:</strong>{" "}
                    {movie?.rating === 0 ? (
                        <span className="text-muted">None (This movie was not rated by critics!)</span>
                    ) : (
                        <span className="badge bg-primary fs-6">{movie?.rating}</span>
                    )}
                </div>
                <div className="mb-3">
                    <strong className="text-warning">Price:</strong>{" "}
                    <span className="text-success">${movie?.price?.toFixed()}</span>
                </div>
                <div>
                    <strong className="text-warning">Genres:</strong>
                    <ul className="list-inline mt-2">
                        {movie?.genres?.map((g, i) => (
                            <li className="list-inline-item badge bg-dark border border-light me-2" key={i}>
                                {g.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <hr className="my-4 border-secondary" />

        {/* Comentarios */}
        <h4 className="mb-3">User Comments</h4>
        <div className="d-flex flex-wrap gap-3">
            {movie?.comments?.map((c, i) => {
                const _id = c._id;
                return (
                    <div
                        className="card bg-secondary text-light border-0 shadow-sm"
                        style={{ width: "18rem" }}
                        key={i}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{c.userName}</h5>
                            <p className="card-text">{c.text}</p>
                            {c.userId === userId && (
                                <button
                                    className="btn btn-outline-danger btn-sm mt-2"
                                    onClick={() =>
                                        Swal.fire({
                                            title: "Warning",
                                            text: "Are you sure you want to remove this comment?",
                                            icon: "warning",
                                            showDenyButton: true,
                                            denyButtonText: "Cancel",
                                            confirmButtonText: "Confirm",
                                            confirmButtonColor: "green",
                                        }).then((res) => {
                                            if (res.isConfirmed) {
                                                dispatch(deleteComment(movieId, userId, _id, forceUpdate));
                                            }
                                        })
                                    }
                                >
                                    <MdDeleteForever size={20} className="me-1" />
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Modal de compra */}
        <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
            <Elements stripe={stripePromise}>
                <div className="text-dark">
                    <h2 className="mb-3">Make your purchase!</h2>
                    <div className="d-flex flex-column align-items-start mb-2">
                        <p className="text-success mb-1">✔ Correct test card: 4242 4242 4242 4242</p>
                        <p className="text-danger">✘ Declined test card: 4000 0000 0000 0002</p>
                    </div>
                    <img
                        className="mb-3 rounded shadow"
                        style={{ width: "100%", maxWidth: "250px" }}
                        src={`https://image.tmdb.org/t/p/w500/${movie?.image}`}
                        alt={movie?.title}
                    />
                    <Stripe movie={movie} closeModal={closeModal} isOpenModal={isOpenModal} />
                </div>
            </Elements>
        </Modals>
    </div>
</div>

            ) : (
                <Spinner />
            )}
        </>
    );
}
