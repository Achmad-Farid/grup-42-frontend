import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addWebinar } from "../redux/reducers/webinarSlice";
import "react-toastify/dist/ReactToastify.css";

function AdminAdd() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.webinarAdd);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    startTime: "",
    endTime: "",
    categories: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Jika input adalah file, gunakan files[0]
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      // Jika input bukan file, atur nilai biasa
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "categories" ? value.split(",").map((category) => category.trim()) : value, // Mengubah kategori menjadi array jika nama input adalah 'categories'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, image, startTime, endTime, categories } = formData;
    if (!title || !description || !image || !startTime || !endTime || categories.length === 0) {
      // Jika ada bidang yang kosong, tampilkan pesan kesalahan
      setErrorMessage("Harap lengkapi semua bidang.");
      return;
    }

    dispatch(addWebinar(formData))
      .unwrap()
      .then((data) => {
        // Penambahan webinar berhasil
        console.log("Webinar berhasil ditambahkan:", data);
        // Reset form jika diperlukan
        setFormData({
          title: "",
          description: "",
          image: null,
          startTime: "",
          endTime: "",
          categories: [],
        });
        setErrorMessage("");
      })
      .catch((err) => {
        // Penambahan webinar gagal
        console.error("Gagal menambahkan webinar:", err);
        setErrorMessage(err.message || "Terjadi kesalahan saat menambahkan webinar");
      });
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
        {/* main */}
        <main>
          <div className="page-header">
            <h1>Tambah Webinar</h1>
            <small>Home / Tambah Webinar</small>
          </div>
          <div className="page-content">
            <div className="analytics">
              {/* add webinar */}
              <div className="form-container">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="form-group">
                    <label htmlFor="title" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Judul Webinar:
                    </label>
                    <input type="text" id="title" name="title" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Deskripsi Webinar:
                    </label>
                    <textarea id="description" name="description" className="form-control" rows={5} cols={60} required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="link" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Link Webinar:
                    </label>
                    <input type="text" id="link" name="link" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Gambar:
                    </label>
                    <input type="file" id="image" name="image" className="form-control-file" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startTime" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Waktu Mulai:
                    </label>
                    <input type="datetime-local" id="startTime" name="startTime" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Waktu Selesai:
                    </label>
                    <input type="datetime-local" id="endTime" name="endTime" className="form-control" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categories" style={{ fontFamily: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif', color: "gray" }}>
                      Kategori:
                    </label>
                    <input type="text" id="categories" name="categories" className="form-control" required onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Mengunggah..." : "Tambahkan Webinar"}
                  </button>
                  {error && <p className="error">{error}</p>}
                </form>
                {/* Pesan kesalahan */}
                {errorMessage && <p>{errorMessage}</p>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminAdd;
