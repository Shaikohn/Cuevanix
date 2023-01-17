import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
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

export default function Details() {

    let { id } = useParams()
    const movie = useSelector(state => state.movies.details)
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const { profile } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const stripePromise = loadStripe(
        "pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK"
    );

    useEffect(() => {
        dispatch(clearMovie())
        dispatch(getDetails(id))
    }, [dispatch, id])

    function bought() {
        openedModal() 
        profile?.orders?.forEach(function(purchased_Movie) {
            if(purchased_Movie.purchased_Movie.id === movie.id) {
                Swal.fire({
                title: 'Failed', 
                text: 'You already have this movie!', 
                icon: 'error',
                timer: 5000
            }); 
            closeModal()
            }         
        })
    }

    return (
        <>
        {movie !== undefined ? <div>
            <h2> {movie?.title} </h2>
            <div className="row">
                <div className="col-4">
                    <img className="img-fluid" src={`https://image.tmdb.org/t/p/w500/${movie?.image}`} alt="film" />
                </div>
                <div className="col-8">
                    <h5> {movie?.release_date} </h5>
                    <h5> Overview: </h5>
                    <p> {movie?.overview} </p>
                    <h5>Rating: {movie?.rating} </h5>
                    <h5>Price: ${movie?.price?.toFixed()} </h5>
                    {/* <h5>Genres:</h5>
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
                    </ul> */}
                    {localUser !== null ? <button onClick={bought} type="button" className="btn btn-dark">Buy</button> : ''}  
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
        </div> : <Spinner />}
        </>
    )
}