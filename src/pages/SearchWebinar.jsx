import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const SearchWebinar = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("http://119.81.65.99:3000/search", { params: searchCriteria });
      setSearchResults(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error searching for webinars:", error);
      setSearchResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="max-w-screen-md mx-auto py-8 mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" name="title" value={searchCriteria.title} onChange={handleChange} placeholder="Title" className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-indigo-500" />
          <input type="text" name="description" value={searchCriteria.description} onChange={handleChange} placeholder="Description" className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-indigo-500" />
          <input type="text" name="category" value={searchCriteria.category} onChange={handleChange} placeholder="Category" className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-indigo-500" />
          <div className="flex space-x-4">
            <input type="date" name="startDate" value={searchCriteria.startDate} onChange={handleChange} placeholder="Start Date" className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-indigo-500" />
            <input type="date" name="endDate" value={searchCriteria.endDate} onChange={handleChange} placeholder="End Date" className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-indigo-500" />
          </div>
          <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300">
            Search
          </button>
        </form>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
            {loading && <p className="mt-4 text-gray-600">Loading...</p>}
            {!loading && searchResults.length === 0 && <p className="mt-4 text-gray-600">Data not found.</p>}
            {searchResults.map((webinar) => (
              <a key={webinar._id} href={`/webinar/${webinar._id}`} className="group block">
                {/* Menampilkan gambar dari URL */}
                <img src={webinar.image} alt={webinar.title} className="aspect-square w-full rounded object-cover" />
                <div className="mt-3">
                  <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">{webinar.title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{webinar.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchWebinar;
