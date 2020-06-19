import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated, user }) => {
  // this is for re-routing
  const history = useHistory();

  // use a hook to setup state

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // when the user types, the appropriate property in state is changed
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  // dummy login function

  // isAuthenticated will be provided by a redux action in the future
  if (isAuthenticated && user) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div id="login" className="container">
      <div className="form-wrap">
        <form className="form" onSubmit={(e) => onSubmit(e)}>
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
          <button type="submit" value="Login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login);
