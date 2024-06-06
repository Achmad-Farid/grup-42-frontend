import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signin() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://119.81.65.98:3000/login", userData);

      const token = response.data.token;

      // Decode token
      const decodedToken = jwtDecode(token);
      const { role } = decodedToken;

      // Save token to localStorage
      localStorage.setItem("token", token);
      // Set token expiration time to 24 hours
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("tokenExpiration", expirationTime);

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setErrorMessage("Verifikasi akun Anda.");
        } else if (error.response.status === 401 || error.response.status === 404) {
          setErrorMessage("Email atau Password salah.");
        } else {
          setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
        }
      } else {
        setErrorMessage("Terjadi kesalahan jaringan. Silakan coba lagi.");
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container max-w-xl">
          <div className="login-form bg-white shadow-md rounded-lg px-8 pb-8 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6 ">Masuk</h2>
            <form id="login-form" className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-left font-medium mb-2">
                  Nama Pengguna:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                  className="shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-md border border-gray-300"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-left font-medium mb-2">
                  Kata Sandi:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  className="shadow-sm px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500 w-full rounded-md border border-gray-300"
                />
              </div>
              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
              <button type="submit" className="inline-flex items-center px-4 py-2 bg-purple-500 text-white font-bold rounded-md shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Masuk
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              Belum Punya Akun?{" "}
              <a onClick={() => navigate("/daftar")} className="text-indigo-500 hover:text-indigo-700">
                Daftar
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
