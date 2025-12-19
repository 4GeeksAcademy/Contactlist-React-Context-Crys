// services/contacts.js
// guía: centraliza todas las llamadas a la API de contactos

const BASE_URL = "https://playground.4geeks.com/contact"; // base API

// --- GET ALL CONTACTS ---
export const getContacts = async () => {
  const response = await fetch(`${BASE_URL}/contact`);
  if (!response.ok) throw new Error("Error al obtener contactos");
  return await response.json();
};

// --- CREATE CONTACT ---
export const createContact = async (contact) => {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
  if (!response.ok) throw new Error("Error al crear contacto");
  return await response.json();
};

// --- UPDATE CONTACT ---
export const updateContact = async (id, contact) => {
  const response = await fetch(`${BASE_URL}/contact/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  });
  if (!response.ok) throw new Error("Error al actualizar contacto");
  return await response.json();
};

// --- DELETE CONTACT ---
export const deleteContact = async (id) => {
  const response = await fetch(`${BASE_URL}/contact/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Error al eliminar contacto");
  return await response.json();
};
