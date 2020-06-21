import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';

const Signup = ({ register, isAuthenticated, user }) => {
  // delete this line after backend is made. Just for test purposes.

  // use a hook to setup state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const { email, password, firstName, lastName } = formData; //grabbind info from
//signup form data

  // when the user types, the appropriate property in state is changed
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // isAuthenticated will be provided by a redux action in the future
  if (isAuthenticated && user) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    register(email, password, firstName, lastName);
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { register })(Signup);
