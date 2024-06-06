import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { fetchWebinars } from "../redux/actions/webinarActions";

function Webinar() {
  const dispatch = useDispatch();
  const webinarData = useSelector((state) => state.webinar);
  const { loading, webinars, error, totalPages, currentPage } = webinarData;

  useEffect(() => {
    dispatch(fetchWebinars(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(fetchWebinars(page));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            webinars.map((webinar) => (
              <a key={webinar._id} href={`/webinar/${webinar._id}`} className="group block">
                {/* Menampilkan gambar dari URL */}
                <img src={webinar.image} alt={webinar.title} className="aspect-square w-full rounded object-cover" />
                <div className="mt-3">
                  <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">{webinar.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{webinar.description}</p>
                </div>
              </a>
            ))
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Webinar;
