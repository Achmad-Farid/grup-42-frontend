import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";

import Landing_page from "./pages/Landing_page.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Admin from "./pages/Admin.jsx";
import Webinar from "./pages/Webinar.jsx";
import store from "./redux/store/store.js";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import AdminAdd from "./pages/AdminAdd.jsx";
import DetailWebinar from "./pages/DetailWebinar.jsx";
import Verify from "./pages/Verify.jsx";
import AdminList from "./pages/AdminList.jsx";
import AdminEdit from "./pages/AdminEdit.jsx";
import SearchWebinar from "./pages/SearchWebinar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin></Admin>} />
          <Route path="/admin/webinar" element={<AdminList></AdminList>} />
          <Route path="/admin/add" element={<AdminAdd></AdminAdd>} />
          <Route path="/admin/edit/:id" element={<AdminEdit></AdminEdit>} />
          <Route path="/" element={<Landing_page></Landing_page>} />
          <Route path="/login" element={<Signin></Signin>} />
          <Route path="/daftar" element={<Signup></Signup>} />
          <Route path="/webinar" element={<Webinar></Webinar>} />
          <Route path="/search" element={<SearchWebinar></SearchWebinar>} />
          <Route path="/webinar/:id" element={<DetailWebinar></DetailWebinar>} />
          <Route path="/verify/:token" element={<Verify></Verify>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
