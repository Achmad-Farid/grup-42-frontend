import React from "react";
import Sidebar from "../components/Sidebar";

function Admin() {
  return (
    <>
      {/* sidebar */}
      <Sidebar></Sidebar>
      <div className="main-content">
        <header>
          <div className="header-content">
            <label htmlFor="menu-toggle">
              <span className="las la-bars" />
            </label>
            <div className="header-menu">
              <div className="user">
                <div className="bg-img" style={{ backgroundImage: "url(img/1.jpeg)" }} />
                <span className="las la-power-off" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </header>
        {/* main */}
        <main>
          <div className="page-header">
            <h1>Dashboard</h1>
            <small>Home / Dashboard</small>
          </div>
          <div className="page-content">
            <div className="analytics">
              {/* konten dashboard */}
              <div className="card">
                <div className="card-head">
                  <h2>5</h2>
                  <span className="las la-user-friends" />
                </div>
                <div className="card-progress">
                  <small>User</small>
                  <div className="card-indicator">
                    <div className="indicator one" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>20</h2>
                  <span className="las la-eye" />
                </div>
                <div className="card-progress">
                  <small>Page views</small>
                  <div className="card-indicator">
                    <div className="indicator two" style={{ width: "80%" }} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>9</h2>
                  <span className="las la-clipboard-list" />
                </div>
                <div className="card-progress">
                  <small>Webinar</small>
                  <div className="card-indicator">
                    <div className="indicator three" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-head">
                  <h2>5</h2>
                  <span className="las la-" />
                </div>
                <div className="card-progress">
                  <small>Ulasan Masuk</small>
                  <div className="card-indicator">
                    <div className="indicator four" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <table width="100%">
              <thead>
                <tr>
                  <th>No</th>
                  <th>
                    <span className="las la-sort" /> JUDUL WEBINAR
                  </th>
                  <th>
                    <span className="las la-sort" /> ULASAN
                  </th>
                  <th>
                    <span className="las la-sort" /> SENTIMEN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <div className="judul">
                      <h4>Judul Webinar</h4>
                    </div>
                  </td>
                  <td>Lorem Ipsum</td>
                  <td style={{ color: "red" }}>Negatif</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <div className="judul">
                      <h4>Judul Webinar</h4>
                    </div>
                  </td>
                  <td>Lorem Ipsum</td>
                  <td style={{ color: "green" }}>Positif</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Admin;
