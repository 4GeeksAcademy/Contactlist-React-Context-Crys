// Estado inicial global de la app
export const initialStore = {
  contacts: [],
  loading: false,
  error: null
};

// Reducer global
export const storeReducer = (store, action = {}) => {
  switch (action.type) {

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

    case "GET_CONTACTS_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: action.payload
      };

    case "ADD_CONTACT_SUCCESS":
  return {
    ...store,
    loading: false,
    contacts: Array.isArray(store.contacts)
      ? [...store.contacts, action.payload]
      : [action.payload]
  };

    case "UPDATE_CONTACT_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case "DELETE_CONTACT_SUCCESS":
      return {
        ...store,
        loading: false,
        contacts: store.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    default:
      return store;
  }
};
