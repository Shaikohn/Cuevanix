import Cinema from "../assets/Cuevanix.jpg"
import Popcorn from "../assets/Popcorn.png"
import { AiOutlineUserAdd } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { BiCommentAdd } from 'react-icons/bi'
import { RiQuestionnaireFill } from 'react-icons/ri'
import { FaCommentDots } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdMovie } from 'react-icons/md'

export default function LandingPage() {
    return (
        <>
        <div className="bg-light d-flex">
            <img src={Cinema} alt="cinema" style={{height: '450px', width: '100%'}} />
            <img src={Popcorn} alt="popcorn" />
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title text-align-center ms-3">Sign Up</h5>
                    < AiOutlineUserAdd size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">Search movies</h5>
                    <AiOutlineSearch className="ms-3" size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">Buy movies</h5>
                    <BsFillBagCheckFill size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">Comment</h5>
                    <BiCommentAdd size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">Make inquiries</h5>
                    <RiQuestionnaireFill className="ms-2" size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">Receive answers from admins</h5>
                    <FaCommentDots style={{marginLeft: '80px'}} size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">View your profile</h5>
                    <ImProfile  className="ms-4" size={100} />
                </div>
        </div>
        <div className="card d-inline-flex ms-4 mb-3 mt-3 align-items-center" style={{width: '19rem', height: '160px'}}>
                <div className="card-body">
                    <h5 className="card-title">Watch movies</h5>
                    <MdMovie  className="ms-3" size={100} />
                </div>
        </div>
        </>
    )
}