import axios from "axios";
import Swal from "sweetalert2";

export const postComment = (commentData, closeModal, setLoading) => async() => {
    setLoading(true)
    try {
        await axios.post("http://localhost:3001/comments/add", commentData);
        setLoading(false)
        closeModal()
        Swal.fire({
            title: "Success!",
            text: "Comment added!",
            icon: "success",
            timer: 2000,
        });
    } catch (e) {
        setLoading(false)
        Swal.fire({
            title: "Failed!",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        });
    }
}

export const deleteComment = (_id, userId, movieId) => () => {
    try {
        axios.delete(`http://localhost:3001/comments/${userId}/${movieId}/${_id}`)
        Swal.fire({
            title: "Deleted",
            text: "Comment deleted succesfully!",
            icon: "success",
            timer: 2000,
        });
    }
    catch(e) {
        console.log(e)
    }
}