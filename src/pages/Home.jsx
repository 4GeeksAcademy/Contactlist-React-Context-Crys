// pages/Home.jsx
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import homeImg from "../assets/hoome.jpg";
import homeImgActive from "../assets/hoome2.jpg";

export const Home = () => {
    const { store } = useGlobalReducer();
    const { contacts, loading, error } = store;

    return (
        <section className="home-wrapper">
            <div className="home-card container">

                {/* Imagen decorativa (no bloquea clicks) */}
                <div className="home-visual">
                    <img
                        src={homeImg}
                        alt="Personaje sentado"
                        className="home-img home-img--idle"
                    />
                    <img
                        src={homeImgActive}
                        alt="Personaje de pie"
                        className="home-img home-img--active"
                    />
                </div>

                {/* Contenido funcional */}
                <div className="home-content">
                    <h1 className="home-title">Contact Manager</h1>

                    <p className="home-subtitle">
                        Gestiona, crea y controla tus contactos sin fricción
                    </p>

                    {loading && (
                        <p className="home-loading">Cargando datos…</p>
                    )}

                    {error && (
                        <p className="home-error">{error}</p>
                    )}

                    {!loading && !error && (
                        <>
                            <p className="home-summary">
                                Tienes <strong>{contacts.length}</strong> contactos activos
                            </p>

                            <div className="home-actions">
                                <Link
                                    to="/contacts"
                                    className="home-btn home-btn--view"
                                >
                                    <i className="bi bi-eye-fill"></i>
                                    <span>Ver contactos</span>
                                </Link>

                                <Link
                                    to="/contacts/add"
                                    className="home-btn home-btn--add"
                                >
                                    <i className="bi bi-person-plus-fill"></i>
                                    <span>Agregar contacto</span>
                                </Link>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
};
