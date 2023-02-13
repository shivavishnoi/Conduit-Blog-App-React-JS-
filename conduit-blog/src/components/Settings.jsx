import { useEffect, useState } from 'react';
import { userVerifyURL } from '../utils/links';
export default function Settings(props) {
  const token = props.userData.user.token;
  let modifiedUserDetails = { ...props.userData.user };
  delete modifiedUserDetails['token'];
  for (let property in modifiedUserDetails) {
    if (modifiedUserDetails[property] === null) {
      modifiedUserDetails[property] = '';
    }
  }
  const [userDetails, setUserDetails] = useState(modifiedUserDetails);

  const handleInput = ({ target }) => {
    let { name, value } = target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(userVerifyURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${token}`,
        body: JSON.stringify({ user: { userDetails } }),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(console.log)
      .catch(console.log);
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
        <input type="submit" value="Update Settings" />
      </form>
    </section>
  );
}
