import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postInquirie } from "../redux/actions/inquirieActions";
import Modals from "./Modals/Modals"
import { useModal } from "./Modals/useModal";


export default function Inquiry() {
    
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const userId = localUser?.result?._id
    const initialState = { email: '', name: '', subject: '', text: '', userId: userId || null}
    const [isOpenModal, openedModal, closeModal] = useModal(false);
    const [inquirieData, setInquirieData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInquirieData({ ...inquirieData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postInquirie(inquirieData, closeModal, setLoading))
    }

    return (
        <div>
            <button type="button" className="nav-link" onClick={openedModal}>Inquiry</button>
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
        <h2> Send us a inquiry! </h2>
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
            {
                loading ? <div className='text-center mt-3 mb-3'>
                <div className="spinner-border text-primary" role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                </div>
                </div> :
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