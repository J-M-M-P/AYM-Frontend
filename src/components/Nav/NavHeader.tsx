import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBasket, FaShoppingBag } from "react-icons/fa";
import "./NavStyling.css";

// React-Bootstrap
import { Navbar, Nav, Form, Container, Offcanvas } from "react-bootstrap";

export default function NavHeader() {
    return (
        <>
            <Container>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                        <Navbar.Offcanvas
                            id="offcanvasNavbar-expand-lg"
                            aria-labelledby="offcanvasNavbar-expand-lg"
                            className="bg-dark"
                            placement="start"
                        >
                            <Offcanvas.Header closeButton></Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
                                    <NavLink to="/shop" className="text-light me-2 text-decoration-none">
                                        <FaShoppingBag />
                                    </NavLink>
                                    <NavLink to="/shop" className="text-light text-decoration-none">
                                        Shop
                                    </NavLink>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                    <NavLink
                        className="navbar-brand"
                        to="/"
                        style={{ fontWeight: "bold", fontSize: "24px", color: "#fff" }}
                    >
                        AYM
                    </NavLink>
                    <Form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">
                            <FaSearch />
                        </button>
                    </Form>
                    <NavLink to="/login" className="text-light me-2">
                        <FaUser />
                    </NavLink>

                    <NavLink to="/basket" className="text-light">
                        <FaShoppingBasket />
                    </NavLink>
                </Navbar>
            </Container>
        </>
    );
}
