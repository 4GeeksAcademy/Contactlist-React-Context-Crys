// pages/Layout.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts, createAgendaIfNotExists } from "../service/contacts";

// Layout = shell global de la app
export const Layout = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const initApp = async () => {
      try {
        dispatch({ type: "SET_LOADING" });

        await createAgendaIfNotExists();
        const contacts = await getContacts();

        dispatch({
          type: "GET_CONTACTS_SUCCESS",
          payload: contacts
        });

      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: error.message || "Error inicializando la app"
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
