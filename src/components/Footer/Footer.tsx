import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-dark sticky-bottom text-white">
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <NavLink to="/faq" className="nav-link text-white">
                        FAQ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-link text-white ml-3">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="nav-link text-white ml-3">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
