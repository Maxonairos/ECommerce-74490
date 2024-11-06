import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-success-subtle mt-4">
        <div className="flex inline-flex flex-wrap w-full my-2 justify-evenly" >
            <div className="flex flex-wrap w-auto bg-success-subtle mb-2">
                <h3 className="content-center text-gray-500 font-bold">Copyright - Desarrollado por FSoriano</h3>
            </div>
            <div className="inline-flex justify-evenly">
                <ul className=" inline-flex w-auto gap-10">
                    <li className="rounded-full inline-flex">
                        <a className="flex justifiy-center content-center" href="https://www.facebook.com/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                            <div className="flex p-2 place-items-center content-center hover:scale-105 duration-300 ease-in-out">
                                <FaFacebook size={30} color="gray" />
                            </div>
                        </a>
                    </li>
                    <li className="rounded-full inline-flex">
                        <a className="flex justifiy-center content-center" href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <div className="flex p-2 place-items-center content-center hover:scale-105 duration-300 ease-in-out">
                                <FaGithub  size={30} color="gray" />
                            </div>
                        </a>
                    </li>
                    <li className=" rounded-full inline-flex">
                        <a className="flex justifiy-center content-center" href="https://ar.linkedin.com/"target="_blank" rel="noopener noreferrer" >
                            <div className="flex p-2 place-items-center content-center hover:scale-105 duration-300 ease-in-out">
                                <FaLinkedin  size={30} color="gray" />
                            </div>
                        </a>
                    </li>
                    <li className=" rounded-full inline-flex">
                        <a className="flex justifiy-center content-center" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <div className="flex p-2 place-items-center content-center hover:scale-105 duration-300 ease-in-out">
                                <FaInstagram size={30} color="gray" />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    )
}

export default Footer