// pages/EditContact.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { updateContact } from "../service/contacts";
import { getContacts } from "../service/contacts"; // para obtener el contacto actual si no lo tenemos en store

export const EditContact = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { contacts } = store;

  const { theId } = useParams(); // ID del contacto a editar

  // 1️⃣ Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(true); // estado local para cargar datos

  // 2️⃣ Cargar datos del contacto
  useEffect(() => {
    const contact = contacts.find(c => c.id === parseInt(theId));

    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address
      });
      setLoading(false);
    } else {
      // Si no está en store, buscar en API
      getContacts()
        .then(allContacts => {
          const c = allContacts.find(c => c.id === parseInt(theId));
          if (c) {
            setFormData({
              name: c.name,
              email: c.email,
              phone: c.phone,
              address: c.address
            });
          }
          setLoading(false);
        })
        .catch(err => {
          dispatch({ type: "SET_ERROR", payload: err.message });
          setLoading(false);
        });
    }
  }, [theId, contacts, dispatch]);

  // 3️⃣ Manejo de inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 4️⃣ Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Nombre y email son obligatorios");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING" });

      const updated = await updateContact(theId, formData);

      dispatch({
        type: "UPDATE_CONTACT_SUCCESS",
        payload: updated
      });

      navigate("/contacts");

    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Error al actualizar contacto"
      });
    }
  };

  // 5️⃣ Render
  if (loading) return <p className="edit-contact-loading text-center mt-5">Cargando contacto...</p>;

  return (
    <div className="edit-contact-container container mt-5">
      <h1 className="edit-contact-title mb-4">Editar contacto</h1>

      <form className="edit-contact-form" onSubmit={handleSubmit}>

        <div className="form-group mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control edit-contact-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control edit-contact-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control edit-contact-input"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control edit-contact-input"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="edit-contact-actions d-flex gap-2">
          <button type="submit" className="btn btn-primary">Guardar cambios</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/contacts")}>Cancelar</button>
        </div>

      </form>
    </div>
  );
};
