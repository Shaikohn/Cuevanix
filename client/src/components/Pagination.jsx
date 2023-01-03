import { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Pagination({page, setPage, max}) {

    const [input, setInput] = useState(1)
    const nextPage = () => {
        if(page < max) {
            setInput(input + 1)
            setPage(page + 1)
        }
    }
    const prevPage = () => {
        if(page > 1) {
            setInput(input - 1)
            setPage(page - 1)
        }
    }

    const onKeyDown = e => {
        if (e.keyCode === 13) {
            setPage (parseInt (e.target.value));
            if (
                parseInt (e.target.value < 1) ||
                parseInt (e.target.value) > max ||
                isNaN (parseInt (e.target.value))
            ) {
                setPage (1);
                setInput (1);
            } else {
            setPage (parseInt (e.target.value));
            }
        }
    };
    
    const onChange = e => {
        setInput (e.target.value);
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <button disabled={page === 1} onClick={prevPage}> <BsFillArrowLeftCircleFill size={30} /> </button>
            <input autoComplete="off" name="page" onChange={e => onChange(e)} onKeyDown={e => onKeyDown(e)} value={input} />
            <p className="text-center ms-2">OF {max} </p>
            <button onClick={nextPage} disabled={page === parseInt(max)}> <BsFillArrowRightCircleFill size={30} /> </button>
        </div>
    )
}