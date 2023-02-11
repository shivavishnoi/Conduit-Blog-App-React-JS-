import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Register() {
  const [username, setUsername] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    emailId: '',
    password: '',
  });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validatePassword = (password) => {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };
  const validateUsername = (username) => {
    var usernameRegex = /^.{4,}$/;
    return usernameRegex.test(username);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://conduit.productionready.io/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email: emailId,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };
  const handleInput = ({ target }) => {
    let { name, value } = target;
    let errorDetails = { ...errors };
    switch (name) {
      case 'username':
        errorDetails.username = validateUsername(value)
          ? ''
          : 'Username is not valid';
        setUsername(value);
        break;
      case 'emailId':
        errorDetails.emailId = validateEmail(value) ? '' : 'Email is not valid';
        setEmailId(value);
        break;
      case 'password':
        errorDetails.password = validatePassword(value)
          ? ''
          : 'password is not valid';
        setPassword(value);
        break;

      default:
        break;
    }
    setErrors(errorDetails);
  };
  return (
    <section className="register padding-1 text-center">
      <div>
        <h2>Sign Up</h2>
        <span>
          <Link to="/login">Have an account?</Link>
        </span>
      </div>
      <form
        className="container flex align-center column"
        onSubmit={handleSubmit}
      >
        <input
          type="username"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleInput}
          className={username && 'error'}
        />
        <span className="error">{errors.username}</span>
        <input
          type="email"
          placeholder="Email"
          name="emailId"
          value={emailId}
          onChange={handleInput}
          className={emailId && 'error'}
        />
        <span className="error">{errors.emailId}</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInput}
          className={password && 'error'}
        />
        <span className="error">{errors.password}</span>

        <input type="submit" value="Sign Up" />
      </form>
    </section>
  );
}
