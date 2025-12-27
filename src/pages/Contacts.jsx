import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
  const { store } = useGlobalReducer();
  const { contacts, loading, error } = store;

  return (
    <div className="contacts-container mt-5">
      {loading ? (
        <div className="contacts-loading text-center">
          <p className="contacts-loading-text">Cargando contactos...</p>
        </div>
      ) : error ? (
        <div className="contacts-error text-center">
          <p className="contacts-error-text text-danger">{error}</p>
        </div>
      ) : !contacts || contacts.length === 0 ? (
        <div className="contacts-empty text-center">
          <p className="contacts-empty-text">Aún no tienes ningún contacto guardado.</p>
        </div>
      ) : (
        <>
          <h1 className="contacts-title mb-4">Lista de contactos</h1>
          <div className="contacts-list d-flex flex-column">
            {contacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
