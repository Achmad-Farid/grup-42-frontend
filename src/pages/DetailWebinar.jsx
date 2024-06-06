import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addRating, getWebinarById } from "../redux/actions/detailActions";

function DetailWebinar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.detailWebinar);
  const [newComment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ratingError, setRatingError] = useState("");
  // Tambahkan state untuk menyimpan rating rata-rata
  const [averageRating, setAverageRating] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getWebinarById(id));
  }, [id]);
  useEffect(() => {
    if (data && data.ratings && data.ratings.length > 0) {
      const totalRating = data.ratings.reduce((acc, cur) => acc + cur.rating, 0);
      const avgRating = totalRating / data.ratings.length;
      setAverageRating(avgRating.toFixed(1)); // Set nilai rating rata-rata dengan 1 desimal
    } else {
      // Jika tidak ada rating, set rata-rata rating menjadi 0
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
                <a href={data.link} target="_blank" className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-700">
                  Daftar
                </a>
              )}
            </div>
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
                      <span className="star text-2xl">&#9733;</span>
                    </button>
                  );
                })}
                <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                  Submit
                </button>
              </form>
              {ratingError && <p className="text-red-500 mt-2">{ratingError}</p>}
            </div>
            {/* Komentar */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Komentar</h2>
              <h2 className={!token ? "text-center" : "hidden"}>Login untuk memberi komentar</h2>
              <form onSubmit={handleCommentSubmit} className={token ? "mb-4" : "hidden"}>
                <textarea className="w-full p-2 border border-gray-300 rounded-md" value={newComment} onChange={handleCommentChange} placeholder="Tulis komentar Anda" rows="3"></textarea>
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                  Kirim
                </button>
              </form>
              <ul className="space-y-4">
                {!data
                  ? ""
                  : data.comments
                      .slice()
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((comment, index) => (
                        <div key={comment ? comment._id : index} className="flex">
                          <div className="flex-shrink-0 mr-3">
                            <img
                              className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                              src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                              alt=""
                            />
                          </div>
                          <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                            <strong>{comment ? comment.name : ""}</strong> <span className="text-xs text-gray-400">{comment ? new Date(comment.createdAt).toLocaleString() : ""}</span>
                            <p className="text-sm">{comment ? comment.comment : ""}</p>
                            <div className="mt-4 flex items-center">
                              <div className="text-sm text-gray-500 font-semibold">{comment ? comment.sentiment : ""}</div>
                            </div>
                          </div>
                        </div>
                      ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DetailWebinar;
