
import { useEffect, useReducer, useState } from "react";import { useDispatch, useSelector } from "react-redux"
import { deleteInquirieAnswer } from "../../redux/actions/inquirieActions"
import NoMessages from '../../assets/NoMessages.png'
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { getProfileById } from "../../redux/actions/userActions";


export default function Messages() {

    const {profile} = useSelector(state => state.user)
    const userId = profile?._id
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileById(localUser.result._id))
    }, [reducerValue])

    return (
        <div>
            <h1>Your messages:</h1>
            { 
            profile?.messages?.length > 0 ?
            profile?.messages
            .map((m, i) => {
                const _id = m?._id
                return (
                    <div className="col-3" key={i}>
                    <div style={{width: '500px'}} className="card my-4 ms-5">
                    <div className="card-body">
                        <h2>Admin {m?.name} answered you!</h2>
                        <h3>Subject: {m?.subject} </h3>
                        <p className="justify-content-center"> {m?.text} </p>
                        <button className="text-danger" onClick={() => Swal.fire({
                title: "Warning",
                text: "Are you sure you want to remove this inquirie?",
                icon: "warning",
                showDenyButton: true,
                denyButtonText: "Cancel",
                confirmButtonText: "Confirm",
                confirmButtonColor: "green",
              }).then((res) => {
                if (res.isConfirmed) {
                    dispatch(deleteInquirieAnswer(_id, userId))
                    forceUpdate()
                }
              })}>< MdDeleteForever size={50} /></button>
                        </div>
                    </div>
                    </div>
                )
            }) : <img style={{height: '500px', margin: 'auto', display: 'block'}} src={NoMessages} alt="No messages" /> 
            }
        </div>
    )
}