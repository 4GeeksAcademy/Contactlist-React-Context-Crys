// routes.jsx
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

// Configuración de rutas principales y anidadas
export const router = createBrowserRouter(
    createRoutesFromElements(
        // Ruta raíz que contiene Layout (Navbar, Footer y Outlet)
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            
            {/* Ruta por defecto: Home */}
            <Route path="/" element={<Home />} />

            {/* Ruta para la lista de contactos */}
            <Route path="/contacts" element={<Contacts />} />

            {/* Ruta dinámica para detalle individual */}
            <Route path="/single/:theId" element={<Single />} />

            {/* Ruta demo / experimental */}
            <Route path="/demo" element={<Demo />} />
        </Route>
    )
);
