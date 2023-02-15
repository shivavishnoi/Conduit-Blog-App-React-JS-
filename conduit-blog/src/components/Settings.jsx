import { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { userVerifyURL } from '../utils/links';
function Settings(props) {
  const token = props.userData.user.token;
  let modifiedUserDetails = { ...props.userData.user };
  delete modifiedUserDetails['token'];
  for (let property in modifiedUserDetails) {
    if (modifiedUserDetails[property] === null) {
      modifiedUserDetails[property] = '';
    }
  }
  const [userDetails, setUserDetails] = useState(modifiedUserDetails);
  const [error, setError] = useState('');
  let history = useHistory();
  const handleInput = ({ target }) => {
    let { name, value } = target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://conduit.productionready.io/api/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhamVzaDEyM0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6InJhamVzaDEyMyIsImlhdCI6MTY3NjM0MjE3MiwiZXhwIjoxNjgxNTI2MTcyfQ._W0AjlvuCGg_jIPoq5BpzoDTyoaTHncWM5TuVOhZjA8`,
        body: JSON.stringify({ user: userDetails }),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        history.push('/');
      })
      .catch((err) => {
        setError('User Profile is not updated');
      });
  };
  return (
    <section className="settings container padding-1">
      <div className="text-center">
        <h2>Your Settings</h2>
      </div>
      <form className="flex column align-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={userDetails.image}
          placeholder="URL of profile picture"
          name="image"
          onChange={handleInput}
        />
        <input
          type="text"
          value={userDetails.username}
          placeholder="Username"
          name="username"
          onChange={handleInput}
        />
        <input
          type="text"
          value={userDetails.bio}
          placeholder="Bio.."
          name="bio"
          onChange={handleInput}
        />
        <input
          type="email"
          value={userDetails.email}
          placeholder="Email"
          name="email"
          onChange={handleInput}
        />
        <input
          type="password"
          value={userDetails.password}
          placeholder="Password"
          name="password"
          onChange={handleInput}
        />
        <span className="error">{error}</span>
        <input type="submit" value="Update Settings" />
      </form>
      <div className="logout">
        <button
          onClick={() => {
            localStorage.removeItem('app_user');
            history.push('/');
            window.location.reload();
          }}
        >
          or click here to Logout..
        </button>
      </div>
    </section>
  );
}
export default withRouter(Settings);
