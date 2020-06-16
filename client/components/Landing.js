import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="landing">
    <div className="darkness">
      <div className="landing-inner">
        <h1> A Place to Learn What You Want to Learn</h1>
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
