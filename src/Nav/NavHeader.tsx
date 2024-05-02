import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBasket } from "react-icons/fa";

export default function NavHeader() {
  return (
    <>
      <nav className="navbar bg-dark border-bottom navbar-expand-lg border-body" data-bs-theme="dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            AYM
          </NavLink>

          <form className="d-flex mx-auto">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">
              <FaSearch />
            </button>
          </form>

          <div>
            <NavLink to="/login" className="text-light me-2">
              <FaUser />
            </NavLink>

            <NavLink to="/basket" className="text-light">
              <FaShoppingBasket />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
