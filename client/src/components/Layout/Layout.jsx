import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex">
        {/* <Header /> */}
        <Navbar />
        <main className="mt-[60px] w-full h-full">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
