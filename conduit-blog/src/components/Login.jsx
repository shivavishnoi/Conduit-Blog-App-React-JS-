// Login is a class based component because I wanted to brush up concepts of class based components

import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      errors: {
        emailId: '',
        password: '',
      },
    };
  }
  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  validatePassword = (password) => {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    switch (name) {
      case 'emailId':
        errors.emailId = this.validateEmail(value) ? '' : 'Email is not Valid';
        break;
      case 'password':
        errors.password = this.validatePassword(value)
          ? ''
          : 'Password must contain a letter, number and length greater than 6 characters';
        break;

      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.emailId + ' ' + this.state.password);
  };
  render() {
    const { emailId, password } = this.state.errors;
    return (
      <section className="login padding-1 text-center">
        <div>
          <h2>Sign In</h2>
          <span>
            <Link to="/register">Need an account?</Link>
          </span>
        </div>
        <form
          className="container flex align-center column"
          onSubmit={this.handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            name="emailId"
            value={this.state.emailId}
            onChange={this.handleInput}
            className={emailId && 'error'}
          />
          <span className="error">{this.state.errors.emailId}</span>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            className={password && 'error'}
          />
          <span className="error">{this.state.errors.password}</span>

          <input type="submit" value="Sign In" />
        </form>
      </section>
    );
  }
}

export default Login;
