import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

const Signup = () => {
  let history = useHistory();
  // delete this line after backend is made. Just for test purposes.
  let isAuthenticated;

  // use a hook to setup state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { email, password, firstName, lastName } = formData;

  // when the user types, the appropriate property in state is changed
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // dummy login function

  // final signup function will be one of the actions once redux is set up.
  // delete this function after
  const signup = (email, password, firstName, lastName) => {
    console.log(JSON.stringify({ email, password, firstName, lastName }));
    isAuthenticated = true;
    // Refactor AFTER REDUX IS SET UP
    history.push("/dashboard");
  };

  //isAuthenticated will be provided by a redux action in the future
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    signup(email, password, firstName, lastName);
  };

  return (
    <div id="signup" className="container">
      <div className="form-wrap">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="firstName"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="lastName"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>

          <button type="submit" value="signup">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
