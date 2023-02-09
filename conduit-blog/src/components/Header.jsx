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
            <Link to="/">Home</Link>{' '}
          </li>
          <li>
            <NavLink to="/login">Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/register">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
