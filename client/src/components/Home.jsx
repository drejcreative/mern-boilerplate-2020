import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import PlusIcon from "@mui/icons-material/PlusOne";
import ViewIcon from "@mui/icons-material/ViewList";
import ReactPDF, { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./PDF";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="d-flex justify-content-center mb-4">
          <Link to={"/"}>
            <img role={"button"} width="150" src="/logo.png" alt="Home" />
          </Link>
        </div>
      </div>
      <div className="d-flex align-items-center flex-column">
        <div className="mb-2">
          {/* <Link to="/newform"> */}
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PlusIcon />}
            onClick={() => {
              navigate("/newform");
            }}
          >
            Add New Form
          </Button>
          {/* </Link> */}
        </div>
        <div className="d-flex justify-content-center flex-row">
          <div className="me-2">
            {/* <Link to="/list"> */}
            <Button
              variant="contained"
              startIcon={<ViewIcon />}
              onClick={() => {
                navigate("/list");
              }}
            >
              View forms
            </Button>
            {/* </Link> */}
          </div>
          <div>
            {/* <Link to="/reciepts"> */}
            <Button
              variant="contained"
              startIcon={<ViewIcon />}
              onClick={() => {
                navigate("/reciepts");
              }}
            >
              View reciepts
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
