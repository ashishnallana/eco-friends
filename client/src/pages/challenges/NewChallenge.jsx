import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewChallenge() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [points, setpoints] = useState(10);
  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/challenges/create`,
        {
          title,
          description,
          points,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/challenges`);
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
    document.title = "New Challenge";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] w-screen">
        <div className="bg-white shadow-lg p-5 rounded-md flex flex-col items-center">
          <div className="bg-green-800 text-white text-center p-5 rounded-md">
            <h1 className="text-3xl font-bold">Start a new CHALLENGE</h1>
            <p className="text-lg font-semibold">
              Move together, Groww together!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-5 w-full mt-5"
          >
            <input
              type="text"
              required
              placeholder="Challenge title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="text-lg outline-none border-b-2 border-green-500"
            />
            <textarea
              required
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="text-lg outline-none border-b-2 border-green-500"
            />
            <input
              required
              type="number"
              placeholder="Points"
              min={0}
              max={10}
              value={points}
              onChange={(e) =>
                e.target.value > 10
                  ? alert(
                      "A max of 10 points can be allocated to each challenge"
                    )
                  : setpoints(e.target.value)
              }
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

export default NewChallenge;
