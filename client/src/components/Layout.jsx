import React from "react";
import _ from "./Layout.scss";

export default function Layout({ children }) {
  return (
    <>
      <div className="container py-2">
        <div className="d-flex justify-content-center">
          <img src="/logo.png" alt="Home" />
        </div>
        {children}
      </div>
    </>
  );
}
