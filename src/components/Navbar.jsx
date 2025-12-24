import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import logo from "../assets/logotipo.jpg";

export const Navbar = () => {
    const { dispatch } = useGlobalReducer();

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
                    <span className="navbar-title-text">Contact Manager</span>
                </Link>

                {/* Acción */}
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
