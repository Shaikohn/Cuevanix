import { FaGithub, FaLinkedin, FaFilePdf, FaReact, FaNodeJs } from 'react-icons/fa';
import { BsBriefcaseFill, BsFillBootstrapFill } from 'react-icons/bs';
import { SiMongodb } from 'react-icons/si';
import CV from '../assets/Shai Kohn CV.pdf';

export default function Footer() {
    return (
        <footer className="text-light pt-5 pb-3 mt-3" style={{backgroundColor: '#1e1e1e'}}>
            <div className="container">
                <div className="row text-center text-md-start">
                    <div className="col-md-6 mb-4">
                        <h5 className="text-uppercase fw-bold mb-3 text-warning">About Cuevanix</h5>
                        <p>
                            Cuevanix is a fullstack project developed to simulate a complete movie platform experience. It uses React for the frontend, Bootstrap for responsive design, and MongoDB on the backend. The Movie Database API is integrated to manage the visual and technical information of each title.
                        </p>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase fw-bold mb-3 text-warning">Technologies</h5>
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <a href="https://es.reactjs.org/" target="_blank" rel="noopener noreferrer"><FaReact size={28} className="text-info" /></a>
                            <a href="https://nodejs.org/es/" target="_blank" rel="noopener noreferrer"><FaNodeJs size={28} className="text-success" /></a>
                            <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer"><SiMongodb size={28} className="text-success" /></a>
                            <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer"><BsFillBootstrapFill size={28} className="text-primary" /></a>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5 className="text-uppercase fw-bold mb-3 text-warning">Contact</h5>
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <a href="https://github.com/Shaikohn" target="_blank" rel="noopener noreferrer"><FaGithub size={28} className="text-light" /></a>
                            <a href="https://www.linkedin.com/in/shai-kohn/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={28} className="text-primary" /></a>
                            <a href="https://portfolio-shaikohn.vercel.app/" target="_blank" rel="noopener noreferrer"><BsBriefcaseFill size={28} className="text-warning" /></a>
                            <a href={CV} download="Shai Kohn CV.pdf" target="_blank" rel="noopener noreferrer"><FaFilePdf size={28} className="text-danger" /></a>
                        </div>
                    </div>
                </div>
                <hr className="border-top border-secondary" />
                <div className="text-center text-muted mt-3 small">
                    © {new Date().getFullYear()} Cuevanix | Developed by Shai Kohn
                </div>
            </div>
        </footer>
    );
}