import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { formatDate } from "./Post";

function Comments({ data }) {
  const [auth, setAuth] = useAuth();
  const [msg, setmsg] = useState("");
  const [comments, setcomments] = useState(null);

  const makeComment = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/posts/comment`,
        {
          postId: data._id,
          text: msg,
        },
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success == true) {
        console.log(res.data);
        setmsg("");
        setcomments([res.data.comment, ...comments]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/posts/comments/${data._id}`
      );
      if (res) {
        console.log(res.data);
        setcomments(res.data.comments);
      } else {
        console.log("Unknown error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-inherit mt-3">
      <h3>Comments</h3>
      <form className="flex mt-1" onSubmit={makeComment}>
        <input
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          type="text"
          placeholder="Write your comment.."
          className="flex-1 outline-none bg-[#f0f0f0] px-3 rounded-md"
        />
        <button
          type="submit"
          className="mx-3 bg-green-500 hover:bg-green-700 px-3 py-2 font-extrabold text-white rounded-md"
        >
          comment
        </button>
      </form>
      {comments && (
        <div>
          {comments.map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 px-3 bg-[#f0f0f0] my-1"
            >
              <p>{e.text}</p>
              <p className="text-[12px]">{formatDate(e.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
