import { useState } from "react"
import { useDispatch } from "react-redux";
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
        dispatch(postInquirie(inquirieData, closeModal, setLoading, e, setInquirieData, initialState))
    }

    return (
        <div>
            <button type="button" className="nav-link" onClick={openedModal}>Inquiry</button>
            <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                <div className="p-4 rounded text-light" style={{ backgroundColor: '#1c1c1c' }}>
                    <h2 className="text-center mb-4">Send an Inquiry!</h2>
                    <form className="container" onSubmit={handleSubmit} noValidate>
                        <div className="row justify-content-center">
                            <div className="form-group col-md-5 mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="name"
                                    className="form-control bg-dark text-light border-secondary"
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-5 mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    autoComplete="off"
                                    type="email"
                                    name="email"
                                    className="form-control bg-dark text-light border-secondary"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-10 mx-auto mb-3">
                            <label className="form-label">Subject</label>
                            <input
                                autoComplete="off"
                                type="text"
                                name="subject"
                                className="form-control bg-dark text-light border-secondary"
                                placeholder="Subject"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-10 mx-auto mb-3">
                            <label className="form-label">Message</label>
                            <textarea
                                name="text"
                                className="form-control bg-dark text-light border-secondary"
                                placeholder="Message"
                                rows="4"
                                onChange={handleChange}
                            />
                        </div>
                        {loading ? (
                            <div className="text-center my-3">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="text-center d-flex justify-content-center gap-3 mt-4">
                                <button type="submit" className="btn btn-primary px-4">Send</button>
                                <button type="button" className="btn btn-danger px-4" onClick={closeModal}>Close</button>
                            </div>
                        )}
                    </form>
                </div>
            </Modals>
        </div>
    )
}