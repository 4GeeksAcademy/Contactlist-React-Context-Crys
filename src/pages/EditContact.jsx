// pages/EditContact.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { updateContact, getContacts } from "../service/contacts";

export const EditContact = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { contacts } = store;
  const { theId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "/img/default.jpg"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contact = contacts.find(c => String(c.id) === String(theId));

    if (contact) {
      setFormData(contact);
      setLoading(false);
    } else {
      getContacts().then(allContacts => {
        const c = allContacts.find(c => String(c.id) === String(theId));
        if (c) setFormData(c);
        setLoading(false);
      }).catch(err => {
        dispatch({ type: "SET_ERROR", payload: err.message });
        setLoading(false);
      });
    }
  }, [theId, contacts, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Nombre y email son obligatorios");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING" });
      const updated = await updateContact(theId, formData);
      dispatch({ type: "UPDATE_CONTACT_SUCCESS", payload: updated });
      navigate("/contacts");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  if (loading) return <p className="edit-contact-loading text-center mt-5">Cargando contacto...</p>;

  return (
    <div className="edit-contact-container container mt-5">
      <h1 className="edit-contact-title mb-4">Editar contacto</h1>
      <form className="edit-contact-form" onSubmit={handleSubmit}>

        <div className="form-group mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control edit-contact-input" name="name" value={formData.name} onChange={handleChange}/>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control edit-contact-input" name="email" value={formData.email} onChange={handleChange}/>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control edit-contact-input" name="phone" value={formData.phone} onChange={handleChange}/>
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control edit-contact-input" name="address" value={formData.address} onChange={handleChange}/>
        </div>

        <div className="edit-contact-actions d-flex gap-2">
          <button type="submit" className="btn btn-primary">Guardar cambios</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/contacts")}>Cancelar</button>
        </div>

      </form>
    </div>
  );
};
