import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDetails } from "../redux/actions/movieActions";
import Swal from "sweetalert2"
import { clearMovie } from "../redux/slices/movieSlice";
import Spinner from "./Spinner";
import { useModal } from "./Modals/useModal";
import Modals from "./Modals/Modals";
import Stripe from "./Stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { BsFillBagPlusFill } from 'react-icons/bs'
import { deleteComment } from "../redux/actions/commentActions";
import { MdDeleteForever } from "react-icons/md";

export default function Details() {

    let { id } = useParams()
    const movie = useSelector(state => state.movies.details)
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const userId = localUser?.result?._id
    const movieId = movie?.id
    const { profile } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const stripePromise = loadStripe(
        "pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK"
    );
    const alreadyBought = profile?.orders?.find((m) => m?.purchased_Movie?.id === movie?.id)

    useEffect(() => {
        dispatch(clearMovie())
        dispatch(getDetails(id))
    }, [])

    return (
        <>
        {movie !== null ? 
            <div>
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
                        <h5>Genres:</h5>
                        <ul>
                        {
                            movie?.genres?.map((g, i) => {
                                return (
                                    <li key={i}>
                                        {g.name}
                                    </li>
                                )
                            })
                        }
                        </ul>
                        {localUser !== null && alreadyBought === undefined ? <button onClick={() => openedModal()} type="button" className="text-success">< BsFillBagPlusFill size={50} /></button> : ''}  
                    </div>
                </div>
                <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                    <Elements stripe={stripePromise}>
                        <div>
                            <h2 className="mb-5">Make your purchase!</h2>
                            <img className="mb-2 ms-5 rounded-start rounded-end" style={{width: '14rem', height: '14rem'}} src={`https://image.tmdb.org/t/p/w500/${movie?.image}`} alt={movie?.title} />
                            <Stripe movie={movie} closeModal={closeModal} isOpenModal={isOpenModal} />
                        </div>
                    </Elements>
                </Modals>
                {
                    movie?.comments?.map((c, i) => {
                        const _id = c._id
                        return (
                            <div className="card d-inline-flex ms-4 mb-3 mt-2" style={{width: '19rem'}} key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">{c.userName}</h5>
                                    <p className="card-text">{c.text}</p>
                                    {c.userId === userId ? <button className="text-danger" onClick={() => Swal.fire({
                                        title: "Warning",
                                        text: "Are you sure you want to remove this comment?",
                                        icon: "warning",
                                        showDenyButton: true,
                                        denyButtonText: "Cancel",
                                        confirmButtonText: "Confirm",
                                        confirmButtonColor: "green",
                                        }).then((res) => {
                                            if (res.isConfirmed) {
                                                dispatch(deleteComment(movieId, userId, _id, forceUpdate))
                                            }
                                        })}>< MdDeleteForever size={50} /></button> : ''}
                                </div>
                            </div>
                            )
                            })
                        }
            </div> : <Spinner />}
        </>
    )
}