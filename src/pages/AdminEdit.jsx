import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function AdminEdit() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: "", // Change to store URL string instead of file
    startTime: "",
    endTime: "",
    categories: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchWebinar();
  }, []);

  const fetchWebinar = async () => {
    try {
      const response = await axios.get(`https://digiumkm-backend.vercel.app/webinar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWebinar(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        link: response.data.link,
        image: response.data.image || "", // Set the URL directly
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: formData.title,
      description: formData.description,
      link: formData.link,
      image: formData.image, // Use URL string directly
      startTime: formData.startTime,
      endTime: formData.endTime,
      categories: formData.categories.split(",").map((cat) => cat.trim()),
    };

    try {
      const response = await axios.patch(`https://digiumkm-backend.vercel.app/webinar/edit/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
                    {/* Other form fields */}
                    <div className="form-group">
                      <label htmlFor="image">URL Gambar:</label>
                      <input type="text" id="image" name="image" className="form-control" value={formData.image} onChange={handleInputChange} required />
                      {formData.image && (
                        <div className="current-image">
                          <img src={formData.image} alt="Current Webinar" />
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
