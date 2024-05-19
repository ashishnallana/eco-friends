import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TruncatedText from "../Home/TruncatedText";
import { formatDate } from "../Home/Post";

function ArticleCard({ e }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/article/${e._id}`)}
      className="bg-white shadow-md p-5 my-3 rounded-md cursor-pointer"
    >
      <h1 className="text-3xl font-semibold mb-3">{e.title}</h1>
      <h2>{e.createdBy.name}</h2>
      <p className="text-sm">{formatDate(e.createdAt)}</p>
    </div>
  );
}

export default ArticleCard;
