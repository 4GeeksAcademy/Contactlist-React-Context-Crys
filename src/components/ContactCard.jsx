import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { deleteContact } from "../service/contacts";

// Import de imágenes
import defaultImg from "../assets/default.jpg";
import vegetaImg from "../assets/vegeta.png";
import homeroImg from "../assets/homero.png";

export const ContactCard = ({ contact }) => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // --- Función de eliminación ---
    const handleDelete = async () => {
        try {
            await deleteContact(contact.id);
            dispatch({ type: "DELETE_CONTACT_SUCCESS", payload: contact.id });
            setShowModal(false);
        } catch (error) {
            console.error("Error eliminando contacto:", error.message);
            alert("Error eliminando contacto");
        }
    };

    // --- Resolver imagen ---
    const resolveImage = (contact) => {
        if (!contact || !contact.name) return defaultImg;
        const name = contact.name.toLowerCase();
        if (name.includes("vegeta")) return vegetaImg;
        if (name.includes("homer") || name.includes("homero")) return homeroImg;
        return contact.image ? require(`../assets/${contact.image}`) : defaultImg;
    };

    return (
        <>
            <div className="contact-card card d-flex flex-row p-3 mb-3 shadow-sm align-items-center">
                <div className="contact-img me-3">
                    <img
                        src={resolveImage(contact)}
                        alt={contact.name}
                        className="rounded-circle"
                        width={60}
                        height={60}
                    />
                </div>

                <div className="contact-info flex-grow-1">
                    <h5 className="contact-name mb-2">{contact.name}</h5>
                    <p className="mb-1 contact-location">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        {contact.address || "No especificada"}
                    </p>
                    <p className="mb-1 contact-phone">
                        <i className="bi bi-telephone-fill me-2"></i>
                        {contact.phone || "No disponible"}
                    </p>
                    <p className="mb-0 contact-email">
                        <i className="bi bi-envelope-fill me-2"></i>
                        {contact.email || "No disponible"}
                    </p>
                </div>

                <div className="contact-actions d-flex flex-column ms-3">
                    <button
                        className="btn btn-sm btn-warning mb-2"
                        title="Editar"
                        onClick={() => navigate(`/contacts/edit/${contact.id}`)}
                    >
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        title="Eliminar"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro que desea eliminar el contacto <strong>{contact.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        image: PropTypes.string
    }).isRequired
};
