import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="site-header">
      <Link className="logo" to="/">Orbit Cart</Link>
      <nav className="nav">
        <NavLink to="/#new">New</NavLink>
        <NavLink to="/#collections">Collections</NavLink>
        <NavLink to="/#featured">Featured</NavLink>
        <NavLink to="/#reviews">Reviews</NavLink>
      </nav>
      <div className="header-actions">
        {user ? (
          <button className="ghost" onClick={logout} type="button">
            Logout
          </button>
        ) : (
          <Link className="ghost" to="/login">
            Login
          </Link>
        )}
        <Link className="primary" to="/cart">
          Cart <span className="cart-count">{count}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
