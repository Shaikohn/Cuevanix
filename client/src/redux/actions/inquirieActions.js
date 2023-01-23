import axios from "axios";
import Swal from "sweetalert2";
import { getData, getInquiries } from "../slices/inquirieSlice";

export const postInquirie = (inquirieData, closeModal) => async() => {
    try {
        await axios.post("http://localhost:3001/inquiries", inquirieData);
        closeModal()
        Swal.fire({
            title: "Success!",
            text: "Inquirie sent!",
            icon: "success",
            timer: 2000,
        });
    } catch (e) {
        Swal.fire({
            title: "Failed!",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        });
    }
}

export const postInquirieAnswer = (answerData, closeModal) => async() => {
    try {
        await axios.post("http://localhost:3001/inquiries/answer", answerData);
        closeModal()
        Swal.fire({
            title: "Success!",
            text: "Answer sent!",
            icon: "success",
            timer: 2000,
        });
    } catch (e) {
        Swal.fire({
            title: "Failed!",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
        });
    }
}

export const getAllInquiries = () => (dispatch) => {
    axios.get('http://localhost:3001/inquiries/all')
    .then(res => dispatch(getInquiries(res.data)))
    .catch(e => console.log(e))
}

export const getInquirie = (_id) => (dispatch) => {
    axios.get(`http://localhost:3001/inquiries/${_id}`)
    .then(res => dispatch(getData(res.data)))
    .catch(e => console.log(e))
}

export const deleteInquirie = (_id, navigate) => () => {
    try {
        axios.delete(`http://localhost:3001/inquiries/${_id}`)
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

export const deleteInquirieAnswer = (id, email) => () => {
    try {
        axios.delete(`http://localhost:3001/inquiries/answer/${id}`, email)
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