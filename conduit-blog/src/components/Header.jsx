import { Link, NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav className="flex justify-between wrap align-center">
        <NavLink to="/">
          <h3>Conduit</h3>
        </NavLink>

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
      </nav>
    </header>
  );
}
