import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteInquirie, getInquirie, postInquirieAnswer } from "../../redux/actions/inquirieActions"
import Modals from "../Modals/Modals"
import { useModal } from "../Modals/useModal"
import NavBar from "./NavBar"
import InquiryImage from "../../assets/Inquiry.jpg"
import { clearData } from "../../redux/slices/inquirieSlice"
import Spinner from "../Spinner"
import { MdDeleteForever } from 'react-icons/md'

export default function InquirieDetails() {

    const { _id } = useParams()
    const inquirie = useSelector(state => state.inquirie.data)
    const id = inquirie?.userId
    const subject = inquirie?.subject
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const name = localUser.result.name
    const initialState = { name: name, subject: subject, text: '', id: id}
    const [answerData, setAnswerData] = useState(initialState)
    console.log(answerData)
    const [loading, setLoading] = useState(false)
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setAnswerData({ ...answerData, [e.target.name]: e.target.value, id: id, subject: subject})
    }

    useEffect(() => {
        dispatch(clearData())
        dispatch(getInquirie(_id))
    }, [dispatch, _id])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postInquirieAnswer(answerData, closeModal, setLoading))
    }

    return (
        <div>
            <NavBar />
            {inquirie !== null ? <div>
                <div style={{float: 'right', marginRight: '300px', marginTop: '60px'}} className="col-3">
                <div style={{width: '500px'}} className="card my-4 ms-5">
                    <div className="card-body">
                        <div className="d-flex">
                            <h1>{inquirie?.name} </h1> 
                            {inquirie?.userId !== null ? <p className="ms-3" style={{marginTop: '20px'}}>({inquirie?.userId})</p> : ''}
                        </div>
                        <h2>Email: {inquirie?.email}</h2>
                        <h3>Subject: {inquirie?.subject} </h3>
                        <p className="justify-content-center"> {inquirie?.text} </p>
                        {inquirie?.userId !== null ? <button className="btn btn-info" onClick={openedModal}>Answer</button> : '' }
                        <button className="text-danger ms-3" onClick={() => Swal.fire({
                title: "Warning",
                text: "Are you sure you want to remove this inquirie?",
                icon: "warning",
                showDenyButton: true,
                denyButtonText: "Cancel",
                confirmButtonText: "Confirm",
                confirmButtonColor: "green",
              }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(deleteInquirie(_id, navigate))
                }
              })}>< MdDeleteForever size={50} /></button>
                    </div>
                </div>
            </div>
        <div>
            <img style={{width: '600px', marginLeft: '50px', marginBottom: '50px', marginTop: '50px'}} src={InquiryImage} alt='background' />
        </div> 
        </div> : <Spinner />}
        <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> Send an answer! </h2>
        <form className="container" onSubmit={handleSubmit} noValidate>
            <div className="form-group col-md-4 ms-5 text-center mt-2">
                <label>Message</label>
                <textarea style={{width: '270px'}} autoComplete='off' type="email" name="text" className="form-control" placeholder="Message" onChange={handleChange} />
            </div>{
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
            loading ? '' : <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
        }
        </Modals>
        </div>
    )
}