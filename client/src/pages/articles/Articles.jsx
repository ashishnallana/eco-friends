import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader";
import { NavLink } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function Articles() {
  const [data, setdata] = useState(null);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/resources/`);
      if (res) {
        console.log(res);
        setdata(res.data.resources);
        // setposts(res.data.posts);
      } else {
        console.log("Unknown error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    document.title = "Articles";
  }, []);

  return (
    <Layout>
      {data ? (
        <div className="p-5">
          {data.map((e, i) => (
            <ArticleCard e={e} key={i} />
          ))}
          <NavLink
            to={"/new-article"}
            className="bg-green-800 shadow-lg fixed bottom-3 right-2 text-white font-semibold py-2 px-3 rounded-md hover:bg-green-500"
          >
            <h2>New article</h2>
          </NavLink>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}

export default Articles;
