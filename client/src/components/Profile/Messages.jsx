
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
      <div className="container-fluid py-5 bg-dark text-light min-vh-100">
  <h2 className="mb-3 text-center">📩 Your Messages</h2>
  <p className="text-center text-muted mb-5">
    Here you can view all the replies sent by the admin team to your inquiries.
  </p>

  {profile?.messages?.length > 0 ? (
    <div className="d-flex flex-column align-items-center gap-4">
      {profile.messages.map((m, i) => {
        const _id = m?._id;
        return (
          <div
  key={i}
  className="card text-light border border-secondary shadow-sm"
  style={{
    backgroundColor: '#1e1e2f',
    maxWidth: '600px',
    width: '100%',
  }}
>
  <div className="card-body">
    <h5 className="mb-2">
      <span className="text-primary">Admin {m?.name}</span> replied to you
    </h5>
    <p className="mb-2">
      <strong>Subject:</strong> {m?.subject}
    </p>
    <p className="text-muted">{m?.text}</p>

    <button
      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
      onClick={() =>
        Swal.fire({
          title: 'Warning',
          text: 'Are you sure you want to delete this message?',
          icon: 'warning',
          showDenyButton: true,
          denyButtonText: 'Cancel',
          confirmButtonText: 'Confirm',
          confirmButtonColor: 'green',
        }).then((res) => {
          if (res.isConfirmed) {
            dispatch(deleteInquirieAnswer(_id, userId, forceUpdate));
          }
        })
      }
    >
      <MdDeleteForever size={18} />
      Delete
    </button>
  </div>
</div>

        );
      })}
    </div>
  ) : (
    <div className="text-center">
      <img
        src={NoMessages}
        alt="No messages"
        style={{
          height: '400px',
          width: '400px',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '5px solid #ccc',
          margin: '0 auto',
        }}
      />
      <p className="mt-3 text-muted">You don’t have any messages yet.</p>
    </div>
  )}
</div>



    )
}