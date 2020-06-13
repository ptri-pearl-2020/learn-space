import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <>
    <h1>Hello Team Pearl!</h1>
    <div className="landingButtons center">
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Log In</button>
      </Link>
    </div>
  </>
);

export default Landing;
