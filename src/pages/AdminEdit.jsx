import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function AdminEdit() {
  const { id } = useParams(); // Get the webinar ID from the URL
  const [webinar, setWebinar] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    startTime: "",
    endTime: "",
    categories: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Fetch the token from local storage

  useEffect(() => {
    fetchWebinar();
  }, []);

  const fetchWebinar = async () => {
    try {
      const response = await axios.get(`http://119.81.65.98:3000/webinar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWebinar(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        link: response.data.link,
        image: null, // File input is not pre-filled
        startTime: new Date(response.data.startTime).toISOString().substring(0, 16),
        endTime: new Date(response.data.endTime).toISOString().substring(0, 16),
        categories: response.data.categories.join(", "),
      });
    } catch (error) {
      console.error("Error fetching webinar details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("description", formData.description);
    updatedData.append("link", formData.link);
    updatedData.append("startTime", formData.startTime);
    updatedData.append("endTime", formData.endTime);
    updatedData.append(
      "categories",
      formData.categories.split(",").map((cat) => cat.trim())
    );
    if (formData.image) {
      updatedData.append("image", formData.image);
    }

    try {
      const response = await axios.patch(`http://119.81.65.98:3000/webinar/edit/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        navigate(`/admin/webinar`);
        alert("Webinar updated successfully");
      } else {
        alert("Failed to update webinar");
      }
    } catch (error) {
      console.error("Error updating webinar:", error);
      alert("Failed to update webinar");
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
            <h1>Edit Webinar</h1>
            <small>List Webinar / Edit Webinar</small>
          </div>
          <div className="page-content">
            <div className="analytics">
              <div className="form-container">
                {webinar && (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label
                        htmlFor="title"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Judul Webinar:
                      </label>
                      <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="description"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Deskripsi Webinar:
                      </label>
                      <textarea id="description" name="description" className="form-control" rows={5} cols={60} value={formData.description} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="link"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Link Webinar:
                      </label>
                      <input type="text" id="link" name="link" className="form-control" value={formData.link} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="startTime"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Waktu Mulai:
                      </label>
                      <input type="datetime-local" id="startTime" name="startTime" className="form-control" value={formData.startTime} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="endTime"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Waktu Selesai:
                      </label>
                      <input type="datetime-local" id="endTime" name="endTime" className="form-control" value={formData.endTime} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="categories"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Kategori:
                      </label>
                      <input type="text" id="categories" name="categories" className="form-control" value={formData.categories} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="image"
                        style={{
                          fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
                          color: "gray",
                        }}
                      >
                        Gambar:
                      </label>
                      <input type="file" id="image" name="image" className="form-control-file" onChange={handleFileChange} />
                      {webinar.image && (
                        <div className="current-image">
                          <img src={webinar.image} alt="Current Webinar" />
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Simpan Perubahan
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminEdit;
