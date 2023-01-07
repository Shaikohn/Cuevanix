import { FaGithub, FaLinkedin, FaFilePdf, FaReact, FaNodeJs } from 'react-icons/fa'
import { BsBriefcaseFill, BsFillBootstrapFill } from 'react-icons/bs'
import { SiMongodb } from 'react-icons/si'

import CV from '../assets/Shai Kohn CV.pdf'

export default function Footer() {
    return (
        <footer className="page-footer font-small blue pt-4 bg-success">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase">About Cuevanix</h5>
                <p>Hi! I am <a href="https://www.linkedin.com/in/shai-kohn/" target="_blank" rel="noopener noreferrer">Shai Kohn</a> and this is one of my newest personal projects, that is still in progress.
                In this opportunity, I am using <a href='https://www.themoviedb.org/' >The Movie Database API</a> to practice and increase my knowledges, working
                with MongoDB for my first time.
                </p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Technologies</h5>
                <ul className="list-unstyled">
                    <li><a href="https://es.reactjs.org/" target="_blank" rel="noopener noreferrer"> <FaReact size={30} /> </a></li>
                    <li><a href="https://nodejs.org/es/" target="_blank" rel="noopener noreferrer"> <FaNodeJs size={30} className='mt-1' /> </a></li>
                    <li><a href="https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-ar_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624305&adgroup=115749712783&gclid=CjwKCAiAqt-dBhBcEiwATw-ggCgcronQDx8z_aU5xfOVieuODiayP0BQC_zXGFrTHUNVODUEthzDUhoCZNMQAvD_BwE" target="_blank" rel="noopener noreferrer"> <SiMongodb size={30} className='mt-1' /> </a></li>
                    <li><a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer"> <BsFillBootstrapFill size={30} className='mt-1' /> </a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Contact Info</h5>
                <ul className="list-unstyled">
                    <li><a href="https://github.com/Shaikohn" target="_blank" rel="noopener noreferrer"> <FaGithub size={30} /> </a></li>
                    <li><a href="https://www.linkedin.com/in/shai-kohn/" target="_blank" rel="noopener noreferrer"> <FaLinkedin size={30} className='mt-1' /> </a></li>
                    <li><a href="https://portfolio-shaikohn.vercel.app/" target="_blank" rel="noopener noreferrer"><BsBriefcaseFill size={30} className='mt-1' /> </a></li>
                    <li><a href={CV} target="_blank" rel="noopener noreferrer" download="Shai Kohn Spanish CV.pdf"> <FaFilePdf size={30} className='mt-1' /> </a></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3"> © 2022 Copyright: Shai Kohn </div>

</footer>
    )
}