import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import imgAris from "../img/arys.jpg";
import imgFarid from "../img/farid.jpg";
import imgMarwa from "../img/marwa.jpg";
import imgOkta from "../img/okta.jpg";
import imgIrzia from "../img/irzia.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Landing_page() {
  const navigate = useNavigate();
  const [webinarData, setWebinarData] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://digiumkm-backend.vercel.app/webinar");
        setWebinarData(response.data[0]);
      } catch (error) {
        console.error("Error fetching webinar data:", error);
      }
    };

    // Panggil fungsi fetchData saat komponen pertama kali dimuat
    fetchData();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div>
        {/* Banner */}
        <section className="relative bg-image bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25" />
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl text-left">
              {" "}
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Webinar Keren Lagi
                <strong className="block font-extrabold text-purple-600"> Jangan Sampai Ketinggalan!</strong>
              </h1>
              <p className="mt-4 max-w-lg sm:text-xl/relaxed">Cari webinar terbaru disini, tingkatkan skillmu sebagai UMKM</p>
              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a onClick={() => navigate("/search")} className="block w-full rounded bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 focus:outline-none focus:ring active:bg-purle-500 sm:w-auto">
                  Cari Webinar
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* End banner */}
        {/* Webinar Highlight */}
        <section>
          <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
            <div onClick={() => navigate(`/webinar/${webinarData._id}`)} className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
              <div className="relative z-10 lg:py-16">
                <div className="relative h-64 sm:h-80 lg:h-full">{webinarData && webinarData.image && <img alt="" src={webinarData.image} className="absolute inset-0 h-full w-full object-cover" />}</div>
              </div>
              <div className="relative flex items-center bg-gray-100">
                <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100" />
                <div className="p-8 sm:p-16 lg:p-24">
                  {webinarData ? (
                    <>
                      <h2 onClick={() => navigate(`/webinar/${webinarData._id}`)} className="text-2xl font-bold sm:text-3xl cursor-pointer">
                        {webinarData.title}
                      </h2>
                      <p className="mt-4 text-gray-600">{webinarData.description}</p>
                      <a className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">Daftar</a>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End Webinar Highlight */}
        {/* Tentang Kami */}
        <section id="tentang">
          <div className="container-fluid pt-4 pb-4 bg-light">
            <div className="text-center py-16">
              <h2 className="display-6 font-bold">Tim Kami</h2>
              <p>Tim kami terdiri dari individu-individu berbakat yang bekerja sama untuk mencapai visi bersama."</p>
              <div className="row justify-content-center pt-4 gx-4 gy-4">
                <div className="col-md-4 text-center tim">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    {" "}
                    <img src={imgMarwa} className="rounded-circle mb-3" />
                    <h4 className="font-bold">Marwa Sagita</h4>
                    <p>Project Manager</p>
                    <p>
                      <a href="https://www.instagram.com/gia_msr/" className="social">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/marwa-sagita-37576a2b5/" className="social">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-center tim">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    {" "}
                    <img src={imgIrzia} className="rounded-circle mb-3" />
                    <h4 className="font-bold">R. Irzia Fitri Muthmainah</h4>
                    <p>Front-end Developer</p>
                    <p>
                      <a href="https://www.instagram.com/irziaftrr/" className="social">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/irziafiri" className="social">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-center tim">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    {" "}
                    <img src={imgFarid} className="rounded-circle mb-3" />
                    <h4 className="font-bold">Achmad Farid</h4>
                    <p>Back-end Developer</p>
                    <p>
                      <a href="https://www.instagram.com/carbonox_lack/" className="social">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/achmad-farid-77a49a299/" className="social">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-center tim">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    {" "}
                    <img src={imgOkta} className="rounded-circle mb-3" />
                    <h4 className="font-bold">Oktavianda</h4>
                    <p>Data Scientist</p>
                    <p>
                      <a href="https://www.instagram.com/oktavndaaa/" className="social">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/okta-vianda" className="social">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-center tim">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    {" "}
                    <img src={imgAris} className="rounded-circle mb-3" />
                    <h4 className="font-bold">Arys Naufal</h4>
                    <p>Developer and Operations</p>
                    <p>
                      <a href="https://www.instagram.com/arys.naufal/" className="social">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="https://www.linkedin.com/in/arysnaufal" className="social">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Tentang Kami */}
      </div>

      <Footer></Footer>
    </>
  );
}

export default Landing_page;
