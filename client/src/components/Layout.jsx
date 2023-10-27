import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className=" w-full min-h-[100vh] bg-slate-800">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
