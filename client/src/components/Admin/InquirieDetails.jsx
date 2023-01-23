import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteInquirie, getInquirie, postInquirieAnswer } from "../../redux/actions/inquirieActions"
import { getUserById } from "../../redux/actions/userActions"
import Modals from "../Modals/Modals"
import { useModal } from "../Modals/useModal"
import NavBar from "./NavBar"


export default function InquirieDetails() {

    const { _id } = useParams()
    const inquirie = useSelector(state => state.inquirie.data)
    const initialState = { name: '', subject: '', text: '', email: '',}
    const [answerData, setAnswerData] = useState(initialState)
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(inquirie)

    const handleChange = (e) => {
        setAnswerData({ ...answerData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dispatch(getInquirie(_id))
    }, [dispatch, _id])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postInquirieAnswer(answerData, closeModal))
    }

    return (
        <div>
            <NavBar />
            <div className="col-3">
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
                        <button className="btn btn-danger ms-3" onClick={() => Swal.fire({
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
              })}>Delete</button>
                    </div>
                </div>
            </div>
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> Send an answer! </h2>
        <form className="container" onSubmit={handleSubmit} noValidate>
        <div className='d-flex text-center'>
                        <div className="form-group col-md-4 ms-5 ">
                            <label>Name</label>
                            <input autoComplete='off' type="text" name="name" className="form-control" placeholder="Name" onChange={handleChange}  />
                        </div>
                    
            <div className="form-group col-md-4 ms-5 text-center">
                <label>Email</label>
                <input autoComplete='off' type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
            </div>
            </div>
            <div className="form-group col-md-4 mx-auto text-center mt-2">
                            <label>Subject</label>
                            <div className='d-flex'>
                            <input autoComplete='off' type="text" name="subject" className="form-control" placeholder="Subject" onChange={handleChange}  />
                            </div>
                        </div>
            <div className="form-group col-md-4 ms-5 text-center mt-2">
                <label>Message</label>
                <textarea style={{width: '270px'}} autoComplete='off' type="email" name="text" className="form-control" placeholder="Message" onChange={handleChange} />
            </div>
            <div className='text-center mt-3'>
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </form>
        <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
        </Modals>
        </div>
    )
}