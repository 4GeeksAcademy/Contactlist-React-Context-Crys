// pages/Contacts.jsx
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

// Vista de listado de contactos
export const Contacts = () => {
    const { store } = useGlobalReducer();
    const { contacts, loading, error } = store;

    // 1️⃣ Estado de carga
    if (loading) {
        return (
            <div className="contacts-container contacts-loading text-center mt-5">
                <p className="contacts-loading-text">Cargando contactos...</p>
            </div>
        );
    }

    // 2️⃣ Estado de error
    if (error) {
        return (
            <div className="contacts-container contacts-error text-center mt-5">
                <p className="contacts-error-text text-danger">{error}</p>
            </div>
        );
    }

    // 3️⃣ Estado sin contactos
    if (!contacts || contacts.length === 0) {
        return (
            <div className="contacts-container contacts-empty text-center mt-5">
                <p className="contacts-empty-text">No hay contactos disponibles.</p>
            </div>
        );
    }

    // 4️⃣ Render normal con ContactCard
    return (
        <div className="contacts-container mt-5">
            <h1 className="contacts-title mb-4">Lista de contactos</h1>

            <div className="contacts-list d-flex flex-column">
                {contacts.map(contact => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
};
