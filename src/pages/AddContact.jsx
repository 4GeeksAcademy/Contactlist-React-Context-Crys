// pages/AddContact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact } from "../service/contacts";

export const AddContact = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "/img/default.jpg" // imagen default para nuevos
  });

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
      const newContact = await createContact(formData);

      dispatch({ type: "ADD_CONTACT_SUCCESS", payload: newContact });
      navigate("/contacts");

    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <div className="add-contact-container container mt-5">
      <h1 className="add-contact-title mb-4">Agregar nuevo contacto</h1>
      <form className="add-contact-form" onSubmit={handleSubmit}>

        <div className="form-group mb-3">
          <label className="form-label">Nombre completo</label>
          <input type="text" className="form-control add-contact-input" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del contacto"/>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control add-contact-input" name="email" value={formData.email} onChange={handleChange} placeholder="correo@email.com"/>
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control add-contact-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+34 600 000 000"/>
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control add-contact-input" name="address" value={formData.address} onChange={handleChange} placeholder="Dirección completa"/>
        </div>

        <div className="add-contact-actions d-flex gap-2">
          <button type="submit" className="btn btn-primary">Guardar contacto</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/contacts")}>Cancelar</button>
        </div>

      </form>
    </div>
  );
};
