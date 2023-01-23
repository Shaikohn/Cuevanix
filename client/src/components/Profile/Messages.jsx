import { useSelector } from "react-redux"
import { deleteInquirieAnswer } from "../../redux/actions/inquirieActions"


export default function Messages() {

    const {profile} = useSelector(state => state.user)
    console.log(profile?.messages)
    return (
        <div>
            <h1>Your messages:</h1>
            { 
            profile?.messages
            .map((m, i) => {
                return (
                    <div className="col-3" key={i}>
                    <div style={{width: '500px'}} className="card my-4 ms-5">
                    <div className="card-body">
                        <h2>Admin {m?.name} answered you!</h2>
                        <h3>Subject: {m?.subject} </h3>
                        <p className="justify-content-center"> {m?.text} </p>
                        {/* <button onClick={() => deleteInquirieAnswer(id, email)}>Delete</button> */}
                        </div>
                    </div>
                    </div>
                )
            }) }
        </div>
    )
}