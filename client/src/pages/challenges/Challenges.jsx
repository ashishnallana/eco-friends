import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader";
import ChallengeCard from "./ChallengeCard";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";

function Challenges() {
  const [data, setdata] = useState(null);

  const [auth, setAuth] = useAuth();

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/challenges/${auth.user._id}`
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        console.log(res.data);
        setdata(res.data.challenges);
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
    fetchChallenges();
    document.title = "Challenges";
  }, []);

  return (
    <Layout>
      {data ? (
        <div>
          {data.map((e, i) => (
            <ChallengeCard key={i} e={e} />
          ))}
          <NavLink
            to={"/new-challenge"}
            className="bg-green-800 shadow-lg fixed bottom-3 right-2 text-white font-semibold py-2 px-3 rounded-md hover:bg-green-500"
          >
            <h2>Create a challenege</h2>
          </NavLink>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Challenges;
