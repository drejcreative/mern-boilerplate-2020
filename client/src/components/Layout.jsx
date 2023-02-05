import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import "./Layout.scss";
import Store from "../store/store";

export default function Layout({ children }) {
  const { state } = React.useContext(Store);
  return (
    <>
      <div className="container py-2">
        <div className="d-flex justify-content-center mb-4">
          <Link to={"/"}>
            <img width="150" src="/logo.png" alt="Home" />
          </Link>
        </div>
        {children}
      </div>
      {state.apiCallsInProgress ? (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "1080",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : null}
    </>
  );
}
