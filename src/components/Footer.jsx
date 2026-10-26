import { FaFacebook } from "react-icons/fa6"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

const socialLinks = [
    {
        name: "Facebook",
        url: "https://www.facebook.com/?locale=es_LA",
        icon: FaFacebook
    },
    {
        name: "GitHub",
        url: "https://github.com/",
        icon: FaGithub
    },
    {
        name: "LinkedIn",
        url: "https://ar.linkedin.com/",
        icon: FaLinkedin
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/",
        icon: FaInstagram
    }
]

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full bg-success-subtle mt-4 dark:bg-gray-900 dark:border-t dark:border-gray-700">
            <div className="flex flex-wrap w-full my-2 justify-evenly items-center">
                <div className="flex flex-wrap w-auto mb-2">
                    <h3 className="content-center text-gray-600 font-bold dark:text-gray-200">
                        © {currentYear} - Desarrollado por FSoriano
                    </h3>
                </div>
                <div className="inline-flex justify-evenly">
                    <ul className="inline-flex w-auto gap-10">
                        {socialLinks.map(({ name, url, icon: Icon }) => (
                            <li className="rounded-full inline-flex" key={name}>
                                <a
                                    className="flex justify-center content-center"
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={name}
                                >
                                    <div className="flex p-2 place-items-center content-center hover:scale-105 duration-300 ease-in-out">
                                        <Icon size={30} color="gray" />
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
