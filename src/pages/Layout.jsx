import { useEffect } from "react";
import { Outlet } from "react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts } from "../services/contacts";

// Layout = punto de arranque global de la app
export const Layout = () => {
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        // 1️⃣ Activamos estado de carga global
        dispatch({ type: "SET_LOADING" });

        // 2️⃣ Pedimos los contactos a la API
        getContacts()
            .then((contacts) => {
                // 3️⃣ Guardamos contactos en el store
                dispatch({
                    type: "GET_CONTACTS_SUCCESS",
                    payload: contacts
                });
            })
            .catch((error) => {
                // 4️⃣ Centralizamos el error
                dispatch({
                    type: "SET_ERROR",
                    payload: error.message || "Error loading contacts"
                });
            });
    }, []);

    return (
        <ScrollToTop>
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    );
};
