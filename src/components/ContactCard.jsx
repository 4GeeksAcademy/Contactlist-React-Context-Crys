// components/ContactCard.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap"; // Modal y Button para warning
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { deleteContact } from "../service/contacts"; // función de servicio API

export const ContactCard = ({ contact }) => {
    const { dispatch } = useGlobalReducer();

    // Estado para mostrar/ocultar modal
    const [showModal, setShowModal] = useState(false);

    // --- Función para eliminar contacto con confirmación ---
    const handleDelete = async () => {
        try {
            await deleteContact(contact.id); // Llama a la API
            dispatch({ type: "DELETE_CONTACT_SUCCESS", payload: contact.id });
            setShowModal(false); // cerrar modal
        } catch (error) {
            console.error("Error eliminando contacto:", error.message);
            alert("Error eliminando contacto");
        }
    };

    return (
        <>
            {/* Caja principal de cada contacto */}
            <div className="contact-card card d-flex flex-row p-3 mb-3 shadow-sm align-items-center">
                
                {/* --- Foto a la izquierda --- */}
                <div className="contact-img me-3">
                    <img
                        src={contact.image || "https://via.placeholder.com/60"} // placeholder si no hay imagen
                        alt={contact.name}
                        className="rounded-circle"
                        width={60}
                        height={60}
                    />
                </div>

                {/* --- Datos del contacto (nombre, ubicación, teléfono, email) --- */}
                <div className="contact-info flex-grow-1">
                    <h5 className="contact-name mb-2">{contact.name}</h5>

                    {/* Ubicación */}
                    <p className="mb-1 contact-location">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        {contact.address || "No especificada"}
                    </p>

                    {/* Teléfono */}
                    <p className="mb-1 contact-phone">
                        <i className="bi bi-telephone-fill me-2"></i>
                        {contact.phone || "No disponible"}
                    </p>

                    {/* Email */}
                    <p className="mb-0 contact-email">
                        <i className="bi bi-envelope-fill me-2"></i>
                        {contact.email || "No disponible"}
                    </p>
                </div>

                {/* --- Botones a la derecha (editar y eliminar) --- */}
                <div className="contact-actions d-flex flex-column ms-3">
                    <button className="btn btn-sm btn-warning mb-2" title="Editar">
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

            {/* --- Modal de confirmación de eliminación --- */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro que desea eliminar el contacto <strong>{contact.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

// Validación de props
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
