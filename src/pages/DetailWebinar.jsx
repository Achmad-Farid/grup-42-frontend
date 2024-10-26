import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addRating, getWebinarById } from "../redux/actions/detailActions";
import { PDFDownloadLink } from "@react-pdf/renderer"; // Import PDFDownloadLink for PDF generation
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"; // Import necessary components for PDF
import { jwtDecode } from "jwt-decode";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    margin: 5,
    fontSize: 12,
  },
});

function DetailWebinar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.detailWebinar);
  const [newComment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  // State for the registration popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getWebinarById(id));
  }, [id]);

  useEffect(() => {
    if (data && data.ratings && data.ratings.length > 0) {
      const totalRating = data.ratings.reduce((acc, cur) => acc + cur.rating, 0);
      const avgRating = totalRating / data.ratings.length;
      setAverageRating(avgRating.toFixed(1));
    } else {
      setAverageRating(0);
    }
  }, [data]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch(addComment(id, newComment, token));
      setComment("");
    }
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (rating >= 1 && rating <= 5) {
      dispatch(addRating(id, rating, token));
      setRatingError("");
    } else {
      setRatingError("Rating must be a number between 1 and 5");
    }
  };

  let name;
  if (token) {
    name = jwtDecode(token);
  }

  const handleRegister = () => {
    // Set the registration details
    const currentDate = new Date().toLocaleString();
    const details = {
      accountName: token ? name.name : "Guest",
      registrationDate: currentDate,
      webinarTitle: data.title,
      description: data.description,
      startTime: new Date(data.startTime).toLocaleString(),
      endTime: new Date(data.endTime).toLocaleString(),
      categories: data.categories.join(", "),
      link: data.link,
    };

    setRegistrationDetails(details);
    setPopupVisible(true);
  };

  console.log(registrationDetails);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="container flex flex-col sm:flex-row h-screen">
          {data && data.image && <img src={data.image} alt="Webinar" className="w-full h-auto object-cover sm:w-1/2" />}
          <div className="flex flex-col flex-grow sm:w-1/2 pl-4 overflow-auto">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Judul Webinar</dt>
                <dd className="text-gray-700 sm:col-span-2">{data ? data.title : ""}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Deskripsi</dt>
                <dd className="text-gray-700 sm:col-span-2">{data ? data.description : ""}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Waktu Mulai</dt>
                <dd className="text-gray-700 sm:col-span-2">{data ? new Date(data.startTime).toLocaleString() : ""}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Waktu Selesai</dt>
                <dd className="text-gray-700 sm:col-span-2">{data ? new Date(data.endTime).toLocaleString() : ""}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Kategori</dt>
                <dd className="text-gray-700 sm:col-span-2">{data && data.categories ? data.categories.join(", ") : ""}</dd>
              </div>
            </dl>
            <div className="flex justify-end mt-4">
              {data && data.link && (
                <button onClick={handleRegister} className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-700">
                  Daftar
                </button>
              )}
            </div>

            {/* Popup for Registration Confirmation */}
            {popupVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold text-center">PENDAFTARAN BERHASIL</h2>
                  <p>Atas nama akun: {registrationDetails.accountName}</p>
                  <p>Hari/tanggal: {registrationDetails.registrationDate}</p>
                  <p className="font-bold text-center">{registrationDetails.webinarTitle}</p>
                  <p className="mt-2">{registrationDetails.description}</p>
                  <p>Waktu Mulai: {registrationDetails.startTime}</p>
                  <p>Waktu Selesai: {registrationDetails.endTime}</p>
                  <p>Kategori: {registrationDetails.categories}</p>
                  <p>Silahkan Daftar Ulang di Link Berikut: {registrationDetails.link}</p>
                  <PDFDownloadLink
                    document={
                      <Document>
                        <Page size="A4" style={styles.page}>
                          <Text style={styles.title}>{registrationDetails.webinarTitle}</Text>
                          <Text style={styles.text}>Atas nama akun: {registrationDetails.accountName}</Text>
                          <Text style={styles.text}>Hari/tanggal: {registrationDetails.registrationDate}</Text>
                          <Text style={styles.text}>{registrationDetails.description}</Text>
                          <Text style={styles.text}>Waktu Mulai: {registrationDetails.startTime}</Text>
                          <Text style={styles.text}>Waktu Selesai: {registrationDetails.endTime}</Text>
                          <Text style={styles.text}>Kategori: {registrationDetails.categories}</Text>
                          <Text style={styles.text}>Silahkan Daftar Ulang di Link Berikut: {registrationDetails.link}</Text>
                        </Page>
                      </Document>
                    }
                    fileName="registration_details.pdf"
                    className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
                  >
                    {({ loading }) => (loading ? "Loading document..." : "Cetak")}
                  </PDFDownloadLink>
                  <button className="mt-4 bg-red-500 text-white rounded-md px-4 py-2" onClick={() => setPopupVisible(false)}>
                    Tutup
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Rating Rata-rata</h2>
              <p>{averageRating}</p>
            </div>
            {/* Rating */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Beri Rating</h2>
              <form onSubmit={handleRatingSubmit} className="flex items-center">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button type="button" key={index} className={index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}>
                      ★
                    </button>
                  );
                })}
                <span className="ml-2 text-red-500">{ratingError}</span>
                <button type="submit" className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white">
                  Kirim
                </button>
              </form>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Komentar</h2>
              <form onSubmit={handleCommentSubmit} className="flex">
                <input type="text" value={newComment} onChange={handleCommentChange} className="border p-2 flex-grow" placeholder="Tulis komentar..." />
                <button type="submit" className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white">
                  Kirim
                </button>
              </form>
            </div>
            <div className="mt-4">
              {data &&
                data.comments &&
                data.comments.map((comment) => (
                  <div key={comment._id} className="border-b p-2">
                    <p>
                      <strong>{comment.name}:</strong> {comment.comment}
                    </p>
                    <p className="text-gray-500 text-xs">{new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailWebinar;
