// pages/Home.jsx
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
    const { store } = useGlobalReducer();
    const { contacts, loading, error } = store;

    return (
        <div className="home-container container mt-5 text-center">

            <h1 className="home-title mb-3">Contact Manager</h1>
            <p className="home-subtitle text-muted mb-4">
                Gestiona tus contactos desde un solo lugar
            </p>

            {/* Estados globales */}
            {loading && (
                <p className="home-loading text-primary">
                    Cargando datos...
                </p>
            )}

            {error && (
                <p className="home-error text-danger">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <>
                    <p className="home-summary mb-4">
                        Actualmente tienes{" "}
                        <strong>{contacts.length}</strong>{" "}
                        contactos guardados.
                    </p>

                    <div className="home-actions d-flex justify-content-center gap-3">
                        <Link to="/contacts" className="btn btn-primary">
                            Ver contactos
                        </Link>

                        <Link to="/contacts/add" className="btn btn-success">
                            Agregar contacto
                        </Link>
                    </div>
                </>
            )}

        </div>
    );
};
