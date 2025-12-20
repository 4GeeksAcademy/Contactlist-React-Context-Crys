// routes.jsx
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

            {/* HOME → se renderiza en "/" */}
            <Route index element={<Home />} />

            {/* CONTACTS */}
            <Route path="contacts" element={<Contacts />} />
            {/* ADDCONTACTS */}
            <Route path="contacts/add" element={<AddContact />} />

            {/* SINGLE */}
            <Route path="single/:theId" element={<Single />} />

            {/* DEMO */}
            <Route path="demo" element={<Demo />} />

        </Route>
    )
);
