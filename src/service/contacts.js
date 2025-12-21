const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "crys_contact_manager";

// Contactos iniciales por defecto
const DEFAULT_CONTACTS = [
  {
    id: 1,
    name: "Vegeta IV, Príncipe de los Saiyajin",
    email: "vegeta.prince@capsulecorp.earth",
    phone: "+34 666 777 000",
    address: "Tierra – normalmente en Capsule Corporation, Ciudad del Oeste",
    avatar: "/img/vegeta.png"
  },
  {
    id: 2,
    name: "Homer Jay Simpson",
    email: "homer.simpson@springfieldmail.com",
    phone: "+34 600 222 222",
    address: "742 Evergreen Terrace, Springfield",
    avatar: "/img/homero.png"
  }
];

// ----------------------------
// Crear agenda si no existe
// ----------------------------
export const createAgendaIfNotExists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}`, { method: "POST" });
    if (!response.ok && response.status !== 400) throw new Error("No se pudo crear la agenda");

    // Guardamos los default en localStorage si no existen
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
    const stored = localStorage.getItem("contacts");
    if (stored) return JSON.parse(stored);

    const response = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
    if (!response.ok) throw new Error("Error al obtener contactos");

    const data = await response.json();
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
    const current = JSON.parse(localStorage.getItem("contacts")) || [];
    localStorage.setItem("contacts", JSON.stringify([...current, data]));

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
    const current = JSON.parse(localStorage.getItem("contacts")) || [];
    const updated = current.map(c => (String(c.id) === String(id) ? { ...c, ...contact } : c));
    localStorage.setItem("contacts", JSON.stringify(updated));

    // Intentamos API, pero fallar no bloquea
    try {
      await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
    } catch {}
    
    return updated.find(c => String(c.id) === String(id));
  } catch (error) {
    throw new Error(error.message);
  }
};

// ----------------------------
// Eliminar contacto
// ----------------------------
export const deleteContact = async (id) => {
  try {
    const current = JSON.parse(localStorage.getItem("contacts")) || [];
    const filtered = current.filter(c => String(c.id) !== String(id));
    localStorage.setItem("contacts", JSON.stringify(filtered));

    // Intentamos API, pero fallo no bloquea
    try {
      await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, { method: "DELETE" });
    } catch {}

  } catch (error) {
    throw new Error(error.message);
  }
};
