import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteInquirie, getInquirie, postInquirieAnswer } from "../../redux/actions/inquirieActions"
import Modals from "../../components/Modals/Modals"
import { useModal } from "../../components/Modals/useModal"
import NavBar from "../../components/AdminNavBar"
import { clearData } from "../../redux/slices/inquirieSlice"
import Spinner from "../../components/Spinner"
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
        dispatch(postInquirieAnswer(answerData, closeModal, setLoading, e, answerData, initialState))
        setAnswerData(initialState)
    }

    return (
        <div className="container">
            <NavBar />
            {inquirie !== null ? (
                <>
                    <div className="text-center mb-5 mt-3">
                        <h1 className="text-light">Inquiry Detail</h1>
                        <p className="text-secondary">
                            View all the details of this inquiry and respond if needed.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-start flex-column flex-md-row gap-5">
                        <div
                            className="text-light p-4 shadow-lg"
                            style={{ minWidth: "40dvh", maxWidth: "60dvh", width: "100%", backgroundColor: '#1e1e2f', }}
                        >
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <h2 className="me-2">{inquirie?.name}</h2>
                                    {inquirie?.userId && (
                                        <span className="text-muted fs-5">({inquirie.userId})</span>
                                    )}
                                </div>
                                <p className="mb-2">
                                    <strong>Email:</strong> {inquirie.email}
                                </p>
                                <p className="mb-2">
                                    <strong>Subject:</strong> {inquirie.subject}
                                </p>
                                <p className="mb-2">
                                    <strong>Has an account:</strong>{" "}
                                    {inquirie.userId ? (
                                        <span className="text-success">Yes</span>
                                    ) : (
                                        <span className="text-danger">No</span>
                                    )}
                                </p>
                                <p className="mt-3 border-top pt-3" style={{ whiteSpace: "pre-wrap" }}>
                                    {inquirie.text}
                                </p>
                                <div className="mt-4 d-flex align-items-center gap-3 flex-wrap">
                                    {inquirie?.userId && (
                                        <button className="btn btn-info px-4" onClick={openedModal}>
                                            Answer
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-outline-danger d-flex align-items-center gap-2"
                                        onClick={() =>
                                            Swal.fire({
                                                title: "Warning",
                                                text: "Are you sure you want to remove this inquirie?",
                                                icon: "warning",
                                                showDenyButton: true,
                                                denyButtonText: "Cancel",
                                                confirmButtonText: "Confirm",
                                                confirmButtonColor: "green",
                                            }).then((res) => {
                                                if (res.isConfirmed) {
                                                    dispatch(deleteInquirie(_id, navigate));
                                                }
                                            })
                                        }
                                    >
                                        <MdDeleteForever size={24} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Spinner />
        )}
        <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
            <div className="p-4 rounded text-light" style={{ backgroundColor: '#1c1c1c' }}>
                <h2 className="text-center mb-3">Send an Answer</h2>
                <p className="text-center text-secondary mb-4">
                    This response will be sent to the user's messages inbox.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group col-md-10 mx-auto mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            name="text"
                            className="form-control bg-dark text-light border-secondary"
                            placeholder="Write your message..."
                            rows="5"
                            onChange={handleChange}
                            style={{ resize: 'none' }}
                        />
                    </div>
                    {loading ? (
                        <div className="text-center my-3">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : (
                        <div className="text-center d-flex justify-content-center gap-3 mt-4">
                            <button type="submit" className="btn btn-success px-4">Send</button>
                            <button type="button" className="btn btn-outline-danger px-4" onClick={closeModal}>Cancel</button>
                        </div>
                    )}
                </form>
            </div>
        </Modals>
    </div>
    )
}