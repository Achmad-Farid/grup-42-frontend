import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const signup = async (userData) => {
    try {
      const response = await axios.post("http://119.81.65.99:3000/signup", userData);
      return response.data;
    } catch (error) {
      // Tangani kesalahan jika ada
      if (error.response) {
        // Respon dari server dengan status kode yang tidak dalam kisaran 2xx
        console.log(error.response.data.message);
        return { error: error.response.data.message };
      } else if (error.request) {
        // Permintaan terbuat tetapi tidak menerima respons
        return { error: "No response from server" };
      } else {
        // Ada kesalahan saat menyiapkan permintaan
        return { error: error.message };
      }
    }
  };
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    username: "",
    general: "",
  });
  const [verificationPopup, setVerificationPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when user starts typing again
    setErrorMessage((prevError) => ({
      ...prevError,
      [name]: "",
      general: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const response = await signup(userData);
    if (response.error) {
      if (response.error.includes("Email")) {
        setErrorMessage((prevError) => ({
          ...prevError,
          email: response.error,
        }));
      } else if (response.error.includes("Username")) {
        setErrorMessage((prevError) => ({
          ...prevError,
          username: response.error,
        }));
      } else {
        setErrorMessage((prevError) => ({
          ...prevError,
          general: response.error,
        }));
      }
    } else {
      setVerificationPopup(true);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center py-10">
        <div className="container mx-auto max-w-xl px-4 py-8">
          <div className="login-form bg-white shadow-md rounded-lg px-8 pb-8 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6">Daftar</h2>
            <form onSubmit={handleSubmit} method="post" className="w-full">
              <div className="mb-4">
                <label htmlFor="email" className="block text-left font-medium mb-2">
                  Email:
                </label>
                <input
                  value={userData.email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`border ${errorMessage.email ? "border-red-500" : "border-gray-300"} shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border `}
                />
                {errorMessage.email && <p className="text-red-500 text-xs mt-1">{errorMessage.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-left font-medium mb-2">
                  Nama Pengguna:
                </label>
                <input
                  value={userData.username}
                  onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={`border ${errorMessage.username ? "border-red-500" : "border-gray-300"}shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border border-gray-300`}
                />
                {errorMessage.username && <p className="text-red-500 text-xs mt-1">{errorMessage.username}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-left font-medium mb-2">
                  Nama Lengkap:
                </label>
                <input
                  value={userData.name}
                  onChange={handleChange}
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border border-gray-300"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-left font-medium mb-2">
                  Kata Sandi:
                </label>
                <input
                  value={userData.password}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border border-gray-300"
                />
              </div>
              <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white font-bold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Daftar
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Sudah Punya Akun?{" "}
                <a onClick={() => navigate("/login")} className="text-indigo-500 hover:text-indigo-700 cursor-pointer">
                  Masuk
                </a>
              </p>
            </form>
            {verificationPopup && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white shadow-md rounded-md p-6">
                  <p className="text-center">Link verifikasi telah dikirim ke email Anda.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
