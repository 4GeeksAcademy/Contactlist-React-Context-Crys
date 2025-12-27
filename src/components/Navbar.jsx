import { Link } from "react-router-dom";
import logo from "../assets/logotipo.jpg";

export const Navbar = () => {
   
    return (
        <nav className="navbar navbar-app">
            <div className="container navbar-inner">

                {/* Logo + nombre */}
                <Link to="/" className="navbar-title">
                    <img
                        src={logo}
                        alt="Contact logo"
                        className="navbar-logo"
                    />
                    <span className="navbar-title-text">ContactManager</span>
                </Link>

                {/*boton pra agregar nuevo contacto */}
                <div className="navbar-actions">
                    <Link to="/contacts/add">
                        <button className="btn-add-contact">
                            <i className="bi bi-person-plus-fill"></i>
                            <span className="btn-text">Agregar contacto</span>
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
};
