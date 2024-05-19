import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
let today = new Date();

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function NewInitiative() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [data, setdata] = useState({
    name: "",
    description: "",
    location: "",
    date: formatDate(today),
    createdBy: auth.user._id,
    _id: auth.user._id,
    photo:
      "https://www.verizon.com/about/sites/default/files/2021-04/trees-planting-1230x690.jpg",
  });

  const updateData = (key, value) => {
    setdata((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/initiatives/new`,
        data
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/initiatives`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    document.title = "Create new Initiative";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] w-screen">
        <div className="bg-white shadow-lg p-5 rounded-md flex flex-col items-center">
          <div className="bg-green-800 text-white text-center p-5 rounded-md">
            <h1 className="text-3xl font-bold">Start a new INITIATIVE</h1>
            <p className="text-lg font-semibold">
              Let's save this planet together!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-5 w-full mt-5"
          >
            <input
              type="text"
              value={data.name}
              placeholder="Create a name"
              onChange={(e) => updateData("name", e.target.value)}
              className="text-lg outline-none border-b-2 border-green-500"
            />
            <textarea
              type="text"
              value={data.description}
              placeholder="Describe your Initiative."
              onChange={(e) => updateData("description", e.target.value)}
              className="text-lg outline-none border-b-2 border-green-500"
            />
            <div>
              <label>Start date :</label>
              <input
                type="date"
                placeholder="select date"
                value={data.date}
                onChange={(e) => {
                  updateData("date", e.target.value);
                }}
                className="text-lg outline-none border-b-2 border-green-500 ml-2"
              />
            </div>
            <input
              type="text"
              value={data.location}
              placeholder="Enter Location"
              onChange={(e) => updateData("location", e.target.value)}
              className="text-lg outline-none border-b-2 border-green-500"
            />
            <button
              type="submit"
              className="bg-green-800 text-white py-3 px-2 rounded-md transition-all hover:bg-green-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewInitiative;
