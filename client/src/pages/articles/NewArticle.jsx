// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import React, { useState } from "react";
import axios from "axios";
import MarkdownEditor from "./MarkdownEditor";
import { useAuth } from "../../context/Auth";
import Layout from "../../components/Layout/Layout";
import { useEffect } from "react";

function NewArticle() {
  const [auth, setAuth] = useAuth();
  const [title, settitle] = useState("");

  const handleSave = async (markdown) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/resources/create`,
        {
          title,
          markdownContent: markdown,
        },
        {
          headers: {
            authorization: auth.token, // Adjust the token retrieval as needed
          },
        }
      );
      //   console.log("Resource created:", response.data);
      console.log(res);
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  useEffect(() => {
    document.title = "New article";
  }, []);

  return (
    <Layout>
      <div className="m-3 p-3">
        <h1 className="text-xl font-semibold mb-3">
          Write and share articles with the community
        </h1>
        <input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="outline-none w-full p-3 text-xl my-3"
        />
        <MarkdownEditor onSave={handleSave} />
      </div>
    </Layout>
  );
}

export default NewArticle;
