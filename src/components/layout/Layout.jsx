import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


function Layout({ children }) {
  return (
    <div className="container-scroller" style={{width: "100%"}}>
      <Header />

      <div className="container-fluid page-body-wrapper" style={{width: "100%"}}>
        <Sidebar />

        <div className="main-panel">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;