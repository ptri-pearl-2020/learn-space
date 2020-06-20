import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="landing">
    <div className="darkness">
      <div className="landing-inner">
        <h1> Catch the learning bug, not the other one ;)</h1>
        <div className="landingButtons">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
