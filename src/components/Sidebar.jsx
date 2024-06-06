import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="side-header">
        <h3>Admin</h3>
      </div>
      <div className="side-menu">
        <ul>
          <li>
            <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
              <span className="las la-home" />
              <small>Dashboard</small>
            </Link>
          </li>
          <li>
            <Link to="/admin/webinar" className={location.pathname === "/admin/webinar" ? "active" : ""}>
              <span className="las la-clipboard-list" />
              <small>List Webinar</small>
            </Link>
          </li>
          <li>
            <Link to="/admin/add" className={location.pathname === "/admin/add" ? "active" : ""}>
              <span className="las la-clipboard-list" />
              <small>Tambah Webinar</small>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
