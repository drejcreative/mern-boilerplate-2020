import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/PlusOne";
import ViewIcon from "@mui/icons-material/ViewList";
import { HOME_HEADER } from "../constants";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="d-flex flex-column align-items-center mb-4">
          <img
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
            width="150"
            src="/logo.png"
            alt="Home"
          />
          <Typography variant="h4" component="h4" color={"#966919"}>
            {HOME_HEADER}
          </Typography>
        </div>
      </div>
      <div className="d-flex align-items-center flex-column">
        <div className="mb-2">
          <Button
            style={{ marginRight: "10px" }}
            variant="outlined"
            color="secondary"
            startIcon={<PlusIcon />}
            onClick={() => {
              navigate("/newform");
            }}
          >
            Add New Form
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<PlusIcon />}
            onClick={() => {
              navigate("/newreceipt");
            }}
          >
            Add New Receipt
          </Button>
        </div>
        <div className="d-flex justify-content-center flex-row">
          <div className="me-2">
            <Button
              variant="contained"
              startIcon={<ViewIcon />}
              onClick={() => {
                navigate("/formlist");
              }}
            >
              View forms
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              startIcon={<ViewIcon />}
              onClick={() => {
                navigate("/receiptlist");
              }}
            >
              View reciepts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
