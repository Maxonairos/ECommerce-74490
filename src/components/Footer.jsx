import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer>
        <div className="flex inline-flex flex-wrap border w-full m-2 justify-evenly " >
            <div className="flex flex-wrap w-auto bg-success-subtle">
                <h3 className="content-center text-gray-500 font-bold">Copyright - Desarrollado por FSoriano</h3>
            </div>
            <div className="inline-flex">
                <ul className="border inline-flex w-auto">
                    <li className="border inline-flex w-20 h-12  fill-gray-900">
                        <a className="flex justifiy-center content-center" href="">
                            <div className="flex p-2 self-center content-center">
                                <FaFacebook size={25} color="black" />
                            </div>
                            
                        </a>
                    </li>
                    <li className="border inline-flex w-20 bg-seagreen fill-gray-900">
                        <a href="">
                            <img className="justify-center bg-gray-500" src="./svg/instagram.svg" alt="" />
                        </a>
                    </li>
                    <li className="border inline-flex w-20 bg-seagreen fill-gray-900">
                        <a href="">
                            <img className="justify-center bg-gray-500" src="./svg/github.svg" alt="" />
                        </a>
                    </li>
                    <li className="border inline-flex w-20 bg-seagreen fill-gray-900">
                        <a href="">
                            <img className="justify-center bg-gray-500" src="./svg/linkedin.svg" alt="" />
                        </a>
                    </li>
                    <li className="border inline-flex w-20 bg-seagreen fill-gray-900">
                        <a href="">
                            <img className="justify-center bg-gray-500 w-auto" src="./svg/whatsapp.svg" alt="" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    )
}

export default Footer