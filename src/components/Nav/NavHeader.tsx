import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBasket, FaShoppingBag } from "react-icons/fa";
import "./NavStyling.css";

// React-Bootstrap
import { Navbar, Nav, Form, Container, Offcanvas, Row, Col, Button } from "react-bootstrap";

export default function NavHeader() {
    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ height: "100px", maxHeight: "100px" }}>
                <Container fluid>
                    <Row className="w-100 align-items-center">
                        <Col className="d-flex align-items-center">
                            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" className="ms-3" />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar-expand-lg"
                                aria-labelledby="offcanvasNavbar-expand-lg"
                                className="bg-dark"
                                placement="start"
                                style={{ maxWidth: "70%" }}
                            >
                                <Offcanvas.Header closeButton />
                                <Offcanvas.Body>
                                    <Nav className="my-2 my-lg-0 gap-3">
                                        <NavLink
                                            to="/shop"
                                            className="text-light me-2 text-decoration-none d-flex align-items-center"
                                        >
                                            <FaShoppingBag className="me-1" />
                                            Shop
                                        </NavLink>
                                        <Form className="d-flex">
                                            <Button
                                                variant=""
                                                className="btn btn-outline-light border-0 me-1"
                                                type="submit"
                                            >
                                                <FaSearch />
                                            </Button>
                                            <input
                                                className="form-control me-2 bg-dark text-light border-0 border-bottom rounded-0"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                        </Form>
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Col>
                        <Col className="text-center">
                            <NavLink
                                className="navbar-brand mx-auto"
                                to="/"
                                style={{ fontWeight: "bold", fontSize: "24px", color: "#fff" }}
                            >
                                AYM
                            </NavLink>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <NavLink to="/login" className="text-light me-3">
                                <FaUser />
                            </NavLink>
                            <NavLink to="/basket" className="text-light">
                                <FaShoppingBasket />
                            </NavLink>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </Container>
    );
}
