import axios from "axios";
import Swal from "sweetalert2";
import { getData, getInquiries } from "../slices/inquirieSlice";

export const postInquirie = (inquirieData, closeModal, setLoading) => async() => {
    setLoading(true)
    try {
        await axios.post("http://localhost:3001/inquiries", inquirieData);
        setLoading(false)
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

export const postInquirieAnswer = (answerData, closeModal, setLoading) => async() => {
    setLoading(true)
    try {
        await axios.post("http://localhost:3001/inquiries/answer", answerData);
        setLoading(false)
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
        const { data } = await axios.get('http://localhost:3001/inquiries/all')
        dispatch(getInquiries(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const getInquirie = (_id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/inquiries/${_id}`)
        dispatch(getData(data))
    }
    catch(e) {
        console.log(e)
    }
}

export const deleteInquirie = (_id, navigate) => async() => {
    try {
        await axios.delete(`http://localhost:3001/inquiries/${_id}`)
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

export const deleteInquirieAnswer = (_id, userId) => async() => {
    try {
        await axios.delete(`http://localhost:3001/inquiries/answer/${userId}/${_id}`)
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