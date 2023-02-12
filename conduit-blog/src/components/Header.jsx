import { Link, NavLink } from 'react-router-dom';

export function Header(props) {
  return (
    <header>
      <nav className="flex justify-between wrap align-center">
        <NavLink to="/">
          <h3>Conduit</h3>
        </NavLink>
        {props.isLoggedIn ? <AuthorizedHeader /> : <NonAuthorizedHeader />}
      </nav>
    </header>
  );
  function AuthorizedHeader() {
    return (
      <ul className="flex">
        <li>
          <NavLink activeClassName="active" to="/" exact>
            Home
          </NavLink>{' '}
        </li>
        <li>
          <NavLink activeClassName="active" to="/new-post">
            New Post
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/settings">
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/profile">
            &#128578;{props.user.user.username}
          </NavLink>
        </li>
      </ul>
    );
  }

  function NonAuthorizedHeader() {
    return (
      <ul className="flex">
        <li>
          <NavLink activeClassName="active" to="/" exact>
            Home
          </NavLink>{' '}
        </li>
        <li>
          <NavLink activeClassName="active" to="/login">
            Sign In
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/register">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }
}
