import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminList() {
  const [webinars, setWebinars] = useState([]);
  const token = localStorage.getItem("token"); // Fetch the token from local storage
  const navigate = useNavigate();

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const response = await axios.get("http://119.81.65.98:3000/webinar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWebinars(response.data);
    } catch (error) {
      console.error("Error fetching webinars:", error);
    }
  };

  const deleteWebinar = async (id) => {
    try {
      const response = await axios.delete(`http://119.81.65.98:3000/webinar/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Remove the deleted webinar from the state
        setWebinars(webinars.filter((webinar) => webinar._id !== id));
      } else {
        console.error("Failed to delete webinar");
      }
    } catch (error) {
      console.error("Error deleting webinar:", error);
    }
  };

  return (
    <>
      <Sidebar />
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
        <main>
          <div className="page-header">
            <h1>List Webinar</h1>
            <small>Home / List Webinar</small>
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
                    <span className="las la-sort" /> DESKRIPSI
                  </th>
                  <th>
                    <span className="las la-sort" /> TANGGAL
                  </th>
                  <th>
                    <span className="las la-sort" /> ACTIONS
                  </th>
                  <th>
                    <span className="las la-sort" /> ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {webinars.map((webinar, index) => (
                  <tr key={webinar._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="judul">
                        <h4>{webinar.title}</h4>
                      </div>
                    </td>
                    <td>{webinar.description}</td>
                    <td>{new Date(webinar.startTime).toLocaleDateString()}</td>
                    <td>
                      <a onClick={() => navigate(`/admin/edit/${webinar._id}`)}>
                        <button>Edit</button>
                      </a>
                    </td>
                    <td>
                      <button onClick={() => deleteWebinar(webinar._id)}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminList;
