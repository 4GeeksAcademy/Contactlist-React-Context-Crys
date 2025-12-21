// pages/Layout.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {
  getContacts,
  createAgendaIfNotExists
} from "../service/contacts";

// Layout = shell global de la app
// aquí vive la inicialización real de la aplicación
export const Layout = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const initApp = async () => {
      try {
        // 1️⃣ Estado global de carga
        dispatch({ type: "SET_LOADING" });

        // 2️⃣ Crear agenda (usuario) si no existe
        await createAgendaIfNotExists();

        // 3️⃣ Obtener contactos desde la API
        const contacts = await getContacts();

        // 4️⃣ Guardar contactos en el store
        dispatch({
          type: "GET_CONTACTS_SUCCESS",
          payload: contacts
        });

      } catch (error) {
        // 5️⃣ Centralizar errores
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Error inicializando la aplicación"
        });
      }
    };

    initApp();
  }, [dispatch]);

  return (
    <ScrollToTop>
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
};
