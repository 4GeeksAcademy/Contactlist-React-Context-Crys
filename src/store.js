// Reducer global de la aplicación
// guía: decide cómo cambia el estado según cada acción
export default function storeReducer(store, action = {}) {
  switch (action.type) {

    // --- ESTADOS DE CARGA ---
    case "SET_LOADING":
      return {
        ...store,
        loading: true,
        error: null
      };

    case "SET_ERROR":
      return {
        ...store,
        loading: false,
        error: action.payload
      };

    // --- LECTURA DE CONTACTOS ---
    case "GET_CONTACTS_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: action.payload
      };

    // --- CREAR CONTACTO ---
    case "ADD_CONTACT_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: [...store.contacts, action.payload]
      };

    // --- ACTUALIZAR CONTACTO ---
    case "UPDATE_CONTACT_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    // --- ELIMINAR CONTACTO ---
    case "DELETE_CONTACT_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: store.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    default:
      // guía: si no reconoce la acción, devuelve el estado actual
      return store;
  }
}