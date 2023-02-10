import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="d-flex mt-3 align-items-center">
      <Link to="/">
        <img
          role={"button"}
          style={{ marginRight: "10px" }}
          width="90"
          src="/logo.png"
          alt="Home"
        />
      </Link>
      <Typography variant="h4" component="h4" color={"#966919"}>
        {props.header}
      </Typography>
    </div>
  );
};

export default Header;
