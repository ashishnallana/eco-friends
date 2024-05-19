import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Post from "../Home/Post";

function ProfilePosts({ data }) {
  const [posts, setposts] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/posts/${data._id}`
      );
      if (res.data.success) {
        console.log(res.data);
        setposts(res.data.posts);
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
    fetchPosts();
  }, []);

  return (
    <div className="my-5 px-1">
      <h1 className="text-xl font-semibold">Posts</h1>
      {posts && posts.length == 0 && <p>No posts yet!</p>}
      <div
        className={`${
          posts && posts.length !== 0 && "h-[400px] overflow-y-scroll"
        } bg-[#f0f0f0] px-2 mt-2`}
      >
        {posts && posts.map((e, i) => <Post e={e} key={i} />)}
      </div>
    </div>
  );
}

export default ProfilePosts;
