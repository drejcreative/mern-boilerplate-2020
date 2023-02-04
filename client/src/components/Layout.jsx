import React from "react";
import "./Layout.scss";

export default function Layout({ children }) {
  return (
    <>
      <div className="container py-2">
        <div className="d-flex justify-content-center mb-4">
          <img width="150" src="/logo.png" alt="Home" />
        </div>
        {children}
      </div>
    </>
  );
}
