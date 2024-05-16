import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBasket, FaShoppingBag } from "react-icons/fa";
import "./NavStyling.css";

// React-Bootstrap
import { Navbar, Nav, Form, Container, Offcanvas, Row, Col } from "react-bootstrap";

export default function NavHeader() {
    return (
        <Container>
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Toggle aria-controls="offcanvasNavbar-expandmd" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-md"
                    aria-labelledby="offcanvasNavbar-expand-"
                    className="bg-dark"
                    placement="start"
                >
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className=" my-2 my-lg-0 gap-3" style={{ maxHeight: "100px" }}>
                            <div>
                                <NavLink to="/shop" className="text-light me-2 text-decoration-none">
                                    <FaShoppingBag />
                                </NavLink>
                                <NavLink to="/shop" className="text-light text-decoration-none py-auto">
                                    Shop
                                </NavLink>
                            </div>
                            <div>
                                <Form className="d-flex">
                                    <button className="btn btn-outline-light border-0" type="submit">
                                        <FaSearch />
                                    </button>
                                    <input
                                        className="form-control me-2 bg-dark text-light border-0 border-bottom rounded-0"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                </Form>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <NavLink
                    className="navbar-brand"
                    to="/"
                    style={{ fontWeight: "bold", fontSize: "24px", color: "#fff" }}
                >
                    AYM
                </NavLink>

                <NavLink to="/login" className="text-light me-2">
                    <FaUser />
                </NavLink>

                <NavLink to="/basket" className="text-light">
                    <FaShoppingBasket />
                </NavLink>
            </Navbar>
        </Container>
    );
}
