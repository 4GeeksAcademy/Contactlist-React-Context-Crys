// services/contacts.js

const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "crys_contact_manager";

// Contactos iniciales por defecto
const DEFAULT_CONTACTS = [
  {
    id: 1,
    name: "Vegeta",
    email: "vegeta@dbz.com",
    phone: "+34 600 111 111",
    address: "Planeta Vegeta",
    avatar: "/img/vegeta.jpg"
  },
  {
    id: 2,
    name: "Homero Simpson",
    email: "homero@simpsons.com",
    phone: "+34 600 222 222",
    address: "Springfield",
    avatar: "/img/homero.jpg"
  }
];

// ----------------------------
// Crear agenda si no existe
// ----------------------------
export const createAgendaIfNotExists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}`, {
      method: "POST"
    });
    // 400 = ya existe → OK
    if (!response.ok && response.status !== 400) {
      throw new Error("No se pudo crear la agenda");
    }

    // Si no hay contactos en localStorage, guardamos los default
    if (!localStorage.getItem("contacts")) {
      localStorage.setItem("contacts", JSON.stringify(DEFAULT_CONTACTS));
    }
  } catch (error) {
    throw new Error(error.message || "Error creando agenda");
  }
};

// ----------------------------
// Obtener contactos
// ----------------------------
export const getContacts = async () => {
  try {
    // Intentamos primero desde localStorage
    const stored = localStorage.getItem("contacts");
    if (stored) return JSON.parse(stored);

    // Si no hay nada, pedimos a la API
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
    if (!response.ok) throw new Error("Error al obtener contactos");
    const data = await response.json();

    // Guardamos en localStorage
    localStorage.setItem("contacts", JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ----------------------------
// Crear contacto
// ----------------------------
export const createContact = async (contact) => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error("Error al crear contacto");

    const data = await response.json();

    // Guardamos en localStorage
    const current = JSON.parse(localStorage.getItem("contacts")) || [];
    localStorage.setItem(
      "contacts",
      JSON.stringify([...current, data])
    );

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ----------------------------
// Actualizar contacto
// ----------------------------
export const updateContact = async (id, contact) => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error("Error al actualizar contacto");

    const data = await response.json();

    // Actualizamos localStorage
    const current = JSON.parse(localStorage.getItem("contacts")) || [];
    const updated = current.map(c => (String(c.id) === String(id) ? data : c));
    localStorage.setItem("contacts", JSON.stringify(updated));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ----------------------------
// Eliminar contacto
// ----------------------------
export const deleteContact = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar contacto");

    // Actualizamos localStorage
    const current = JSON.parse(localStorage.getItem("contacts")) || [];
    const filtered = current.filter(c => String(c.id) !== String(id));
    localStorage.setItem("contacts", JSON.stringify(filtered));

  } catch (error) {
    throw new Error(error.message);
  }
};
