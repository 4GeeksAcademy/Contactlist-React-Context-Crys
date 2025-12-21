// services/contacts.js

const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "crys_contact_manager";

// ----------------------------
// Crear agenda si no existe
// ----------------------------
export const createAgendaIfNotExists = async () => {
  const response = await fetch(`${BASE_URL}/agendas/${AGENDA}`, {
    method: "POST"
  });

  // 400 = ya existe → OK
  if (!response.ok && response.status !== 400) {
    throw new Error("No se pudo crear la agenda");
  }
};

// ----------------------------
// Obtener contactos
// ----------------------------
export const getContacts = async () => {
  const response = await fetch(
    `${BASE_URL}/agendas/${AGENDA}/contacts`
  );

  if (!response.ok) throw new Error("Error al obtener contactos");
  return await response.json();
};

// ----------------------------
// Crear contacto
// ----------------------------
export const createContact = async (contact) => {
  const response = await fetch(
    `${BASE_URL}/agendas/${AGENDA}/contacts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    }
  );

  if (!response.ok) throw new Error("Error al crear contacto");
  return await response.json();
};

// ----------------------------
// Actualizar contacto
// ----------------------------
export const updateContact = async (id, contact) => {
  const response = await fetch(
    `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    }
  );

  if (!response.ok) throw new Error("Error al actualizar contacto");
  return await response.json();
};

// ----------------------------
// Eliminar contacto
// ----------------------------
export const deleteContact = async (id) => {
  const response = await fetch(
    `${BASE_URL}/agendas/${AGENDA}/contacts/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) throw new Error("Error al eliminar contacto");
};
