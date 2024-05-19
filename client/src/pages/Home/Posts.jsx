import axios from "axios";
import React, { useEffect, useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";

function Posts() {
  const [posts, setposts] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/posts/`);
      if (res) {
        console.log(res);
        setposts(res.data.posts);
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
    <div className="min-h-screen max-w-[670px]">
      <NewPost posts={posts} setposts={setposts} />
      {posts !== null && posts.map((e, i) => <Post e={e} key={i} />)}
    </div>
  );
}

export default Posts;
