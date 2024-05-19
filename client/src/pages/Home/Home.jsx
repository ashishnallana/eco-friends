import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
// import Sidebar from "./Sidebar";
import Posts from "./Posts";

function Home() {
  useEffect(() => {
    document.title = "Ecofriends | Home";
  }, []);

  return (
    <Layout>
      <div className="p-5 flex justify-center w-screen">
        <Posts />
      </div>
    </Layout>
  );
}

export default Home;
