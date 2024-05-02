import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBasket, FaShoppingBag } from "react-icons/fa";

export default function NavHeader() {
  return (
    <>
      <nav className="navbar bg-dark border-bottom navbar-expand-lg border-body" data-bs-theme="dark">
        <div className="container-fluid" style={{ margin: "0", padding: "0" }}>
          <div className="container d-flex justify-content-between align-items-center" style={{ margin: "0 10px" }}>
            <div className="d-flex align-items-center">
              <NavLink to="/shop" className="text-light me-2 text-decoration-none">
                <FaShoppingBag />
              </NavLink>
              <NavLink to="/shop" className="text-light text-decoration-none">
                Butik
              </NavLink>
            </div>

            <NavLink className="navbar-brand mx-auto" to="/" style={{ fontWeight: "bold", fontSize: "24px", color: "#fff" }}>
              AYM
            </NavLink>

            <div className="d-flex align-items-center" style={{ marginLeft: "-200px", marginRight: "0px" }}>
              <form className="d-flex me-2">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-light" type="submit">
                  <FaSearch />
                </button>
              </form>

              <NavLink to="/login" className="text-light me-2">
                <FaUser />
              </NavLink>

              <NavLink to="/basket" className="text-light">
                <FaShoppingBasket />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
