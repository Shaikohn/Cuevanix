import axios from "axios";
import Swal from "sweetalert2";
import { getData, getInquiries } from "../slices/inquirieSlice";

export const postInquirie = (inquirieData, closeModal, setLoading, e, setInquirieData, initialState) => async() => {
    setLoading(true)
    try {
        await axios.post("/inquiries", inquirieData);
        setLoading(false)
        e.target.reset()
        setInquirieData(initialState)
        closeModal()
        Swal.fire({
            title: "Success!",
            text: "Inquiry sent!",
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

export const postInquirieAnswer = (answerData, closeModal, setLoading, e, setInquirieData, initialState) => async() => {
    setLoading(true)
    try {
        await axios.post("/inquiries/answer", answerData);
        setLoading(false)
        e.target.reset()
        setInquirieData(initialState)
        closeModal()
        Swal.fire({
            title: "Success!",
            text: "Answer sent!",
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

export const getAllInquiries = () => async(dispatch) => {
    try {
        const { data } = await axios.get('/inquiries/all')
        dispatch(getInquiries(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getInquirie = (_id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`/inquiries/${_id}`)
        dispatch(getData(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const deleteInquirie = (_id, navigate) => async() => {
    try {
        await axios.delete(`/inquiries/${_id}`)
        navigate('/adminPanel')
        Swal.fire({
            title: "Deleted",
            text: "Inquirie deleted succesfully!",
            icon: "success",
            timer: 2000,
        });
    }
    catch(e) {
        console.log(e)
    }
}

export const deleteInquirieAnswer = (_id, userId, forceUpdate) => async() => {
    try {
        await axios.delete(`/inquiries/answer/${userId}/${_id}`)
        forceUpdate()
        Swal.fire({
            title: "Deleted",
            text: "Message deleted succesfully!",
            icon: "success",
            timer: 2000,
        });
    }
    catch(e) {
        console.log(e)
    }
}