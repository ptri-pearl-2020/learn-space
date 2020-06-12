import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div id="navbar">
    <Link to="/dashboard">
      <span>Home</span>
    </Link>
    <span className="horizontalSpacer" />
    <Link to="/">
      <span>Log Out</span>
    </Link>
  </div>
);

export default Navbar;
