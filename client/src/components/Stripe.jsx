import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import Loader from './Loader/Loader';
import { useNavigate } from 'react-router-dom';

export default function Stripe({movie,closeModal}) {

    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate()
    const price = movie?.price?.toFixed()

    const saveOrder = async() => {
        const userId = localUser.result._id
        const purchased_Movie = movie

        await axios.post("http://localhost:3001/order", {
            userId,
            purchased_Movie: purchased_Movie,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        setLoading(true)

        if(!error) {
            const { id } = paymentMethod
            try {
                const {data} = await axios.post("http://localhost:3001/payment", {
                id,
                amount: price * 100,
                description: movie.title,
            })
            saveOrder()
            setLoading(false)
            /* product.stock-- */
            elements.getElement(CardElement).clear()
            closeModal()
            navigate("/catalog")
            Swal.fire({
                title: 'Payment done', 
                text: data.message, 
                icon: 'success',
                timer: 5000
            });
            }
            catch(error) {
                elements.getElement(CardElement).clear()
                console.log(error)
                /* Swal.fire({
                    title: 'Payment failed', 
                    text: 'Failed', 
                    icon: 'error',
                    timer: 5000
                }); */
                setLoading(false)
            }
        }
    setLoading(false)
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
                <CardElement style={{width: '300px'}} />
                {loading ? 
                <Loader />
            : 
            <div>
            <button type='submit'>
                CONFIRM
            </button>
            </div>
            }
        </form>
        <button onClick={closeModal}>CLOSE</button>
        </div>
    )
}