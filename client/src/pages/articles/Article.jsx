import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader";
import ReactMarkdown from "react-markdown";

function Article() {
  const { id } = useParams();
  const [data, setdata] = useState(null);

  const fetchArticle = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/resources/${id}`
      );
      if (res.data.success) {
        console.log(res.data);
        setdata(res.data.resource);
        // setdata(res.data.user);
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
    fetchArticle();
  }, []);

  return (
    <Layout>
      {data ? (
        <div className="m-5 bg-white min-h-screen p-5">
          <h1 className="text-3xl mb-5">{data.title}</h1>
          <ReactMarkdown>{data.markdownContent}</ReactMarkdown>
          <p className="mt-5 mb-1">Resource provided by : </p>
          <NavLink
            to={`/profiles/${data.createdBy._id}`}
            className="flex space-x-2 items-center"
          >
            <div
              className="rounded-full"
              style={{
                width: "35px",
                height: "35px",
                backgroundImage: `url(${data.createdBy.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div>
              <p className="font-semibold">@{data.createdBy.username}</p>
              <p className="text-[12px] font-regular">{data.createdBy.name}</p>
            </div>
          </NavLink>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Article;
