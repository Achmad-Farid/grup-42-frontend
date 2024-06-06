import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  let name;
  if (token) {
    name = jwtDecode(token);
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    navigate("/");
    // Menghapus token dari localStorage
    localStorage.removeItem("token");
    // Anda dapat menambahkan logika tambahan di sini, seperti mengarahkan pengguna ke halaman login
    console.log("Token removed, logged out successfully.");
  };
  return (
    <>
      <header className="bg-white fixed-top">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-purple-600" onClick={() => navigate("/")}>
                <span className="sr-only">Home</span>
                <img className="h-14" src={logo} alt="" />
              </a>
            </div>
            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm ">
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75 align-middle text-center" onClick={() => navigate("/webinar")}>
                      {" "}
                      Webinar{" "}
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-500 transition hover:text-gray-500/75" onClick={() => navigate("/")} href="#tentang">
                      {" "}
                      Tentang Kami
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center gap-4">
                <div className={token ? "rounded-md md:block hidden" : "hidden"}>{name ? name.name : ""}</div>
                <button className={token ? "rounded-md  md:block hidden " : "hidden"} onClick={handleLogout}>
                  Logout
                </button>
                <div className={!token ? "hidden sm:flex sm:gap-4 " : "hidden"}>
                  <a className="rounded-md bg-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer" onClick={() => navigate("/login")}>
                    Masuk
                  </a>
                  <div className="hidden sm:flex">
                    <a className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-purple-600 cursor-pointer" onClick={() => navigate("/daftar")}>
                      Daftar
                    </a>
                  </div>
                </div>
                <div className="block md:hidden">
                  <div>
                    <button onClick={toggleMenu} className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <div className={`fixed top-16 left-0 w-full bg-white shadow-md ${isOpen ? "block" : "hidden"}`}>
                      <ul className="flex flex-col items-center gap-1">
                        <li className="p-2 w-full text-center border-b">
                          <a className="text-gray-500 transition hover:text-gray-500/75" onClick={() => navigate("/webinar")}>
                            Webinar
                          </a>
                        </li>
                        <li className="p-2 w-full text-center border-b">
                          <a className="text-gray-500 transition hover:text-gray-500/75" href="#tentang">
                            Tentang Kami
                          </a>
                        </li>

                        <li className={!token ? "p-2 w-full text-center border-b " : "hidden"}>
                          <a className="rounded-md bg-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer" onClick={() => navigate("/login")}>
                            Masuk
                          </a>
                        </li>
                        <li className={!token ? "p-2 w-full text-center border-b " : "hidden"}>
                          <a className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-purple-600 cursor-pointer" onClick={() => navigate("/daftar")}>
                            Daftar
                          </a>
                        </li>
                        <li className={token ? "p-2 w-full text-center border-b " : "hidden"}>
                          <div className="rounded-md">{name ? name.name : ""}</div>
                        </li>
                        <li className={token ? "p-2 w-full text-center border-b " : "hidden"}>
                          <button className="rounded-md" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
