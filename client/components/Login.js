import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  // this is for re-routing
  let history = useHistory();

  // delete this line after backend is made. Just for test purposes.

  // use a hook to setup state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // when the user types, the appropriate property in state is changed
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // dummy login function

  // final login function will be one of the actions once redux is set up.
  // delete this function after
  // const login = (email, password) => {
  //   console.log(JSON.stringify({ email, password }));
  //   isAuthenticated = true;
  //   // REFACTOR AFTER REDUX IS SET UP
  //   history.push("/dashboard");
  // };

  //isAuthenticated will be provided by a redux action in the future
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div id="login" className="center">
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
