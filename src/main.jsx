import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Landing_page from "./pages/Landing_page.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Admin from "./pages/Admin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing_page></Landing_page>} />
        <Route path="/login" element={<Signin></Signin>} />
        <Route path="/daftar" element={<Signup></Signup>} />
        <Route path="/admin" element={<Admin></Admin>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
