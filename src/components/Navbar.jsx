import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer"; // si luego manejamos modal o acciones

export const Navbar = () => {
    const { dispatch } = useGlobalReducer(); // opcional si quieres usarlo para abrir modal

    return (
        <nav className="navbar navbar-light bg-light navbar-app shadow-sm">
            <div className="container d-flex justify-content-between align-items-center">

                {/* Título con logo */}
                <Link to="/" className="navbar-title d-flex align-items-center text-decoration-none">
                    <i className="bi bi-people-fill me-2"></i> {/* Icono Bootstrap */}
                    <span className="h4 mb-0">ContactMaster</span>
                </Link>

                {/* Botón agregar contacto */}
                <div className="navbar-actions">
                    <Link to="/contacts/add">  {/* más adelante será ruta de formulario */}
                        <button className="btn btn-success btn-add-contact">
                            <i className="bi bi-person-plus-fill me-1"></i>
                            Agregar contacto
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
};
