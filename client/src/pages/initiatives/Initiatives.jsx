import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Initiative from "./Initiative";

function Initiatives() {
  const [data, setdata] = useState(null);

  const fetchInitiatives = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/initiatives/`,
        data
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        console.log(res);
        setdata(res.data.initiatives);
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
    fetchInitiatives();
    document.title = "Initiatives";
  }, []);

  return (
    <Layout>
      {data ? (
        <div className="p-5 w-screen">
          {data.map((e, i) => (
            <Initiative key={i} data={e} />
          ))}
          <NavLink
            to={"/new-initiative"}
            className="bg-green-800 shadow-lg fixed bottom-3 right-2 text-white font-semibold py-2 px-3 rounded-md hover:bg-green-500"
          >
            <h2>Create Initiative</h2>
          </NavLink>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Initiatives;
