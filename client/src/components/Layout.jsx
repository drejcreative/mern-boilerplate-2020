import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./Layout.scss";
import Store from "../store/store";
import ToastService from "./ToastService";

export default function Layout({ children }) {
  const { state } = React.useContext(Store);
  return (
    <>
      <div className="container py-2">{children}</div>
      <div
        style={{
          display: "flex",
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: state.apiCallsInProgress ? "1080" : "-1",
          opacity: state.apiCallsInProgress ? 1 : 0,
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity .5s ease-in-out .2s",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
      {ToastService()}
    </>
  );
}
