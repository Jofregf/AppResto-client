import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiUser, BiCalendar } from "react-icons/bi";
import {userLogout} from "../../redux/actions/userActions";
import Cookies from "universal-cookie";

function NavBar() {

    const { pathname } = window.location;
    const cookies = new Cookies();
    const userReducer = useSelector((state) => state.users.user);
    const token = cookies.get("user")?.accessToken;
    const restaurantes = useSelector((state) => state.restaurants.restaurants);
    const dispatch = useDispatch();
    const nav = useNavigate();
    
    const logout = () => {
        dispatch(userLogout(token));
        cookies.remove("user", { path: "/" });
        nav("/");
    };

    return (
        !pathname.includes("admin") && (
            <Navbar bg="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand
                        className="titleNavBar"
                        style={{ maxHeight: "100px", color: "#F15422" }}
                    >
                        RESTO RESERVAS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            <Nav.Link href="/restaurantes">Inicio</Nav.Link>
                                {cookies.get("user") ? (
                                    <>
                                        <NavDropdown
                                            title={
                                                <span style={{ color: "white" }}>
                                                    {cookies.get("user")?.user?.name}
                                                </span>
                                            }
                                            id="basic-nav-dropdown"
                                        >
                                            <NavDropdown.Item>
                                                <BiUser />
                                                <Link
                                                    to="/usuario/perfil"
                                                    className="input-profile"
                                                    style={{ color: "#F15422" }}
                                                >
                                                    Mi perfil
                                                </Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item>
                                                <BiCalendar />
                                                    <Link
                                                        to="/reservas"
                                                        className="input-profile"
                                                        style={{ color: "#F15422" }}
                                                    >
                                                        Mis reservas
                                                    </Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </NavDropdown>
                                        <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
                                    </>
                                ) : (
                                    <Nav.Link
                                        href="/auth/login"
                                        style={{ maxHeight: "100px", color: "#F15422" }}
                                    >
                                        Iniciar sesión
                                    </Nav.Link>
                                )}
                                {cookies.get("user")?.role === "ROLE_ADMIN" && cookies.get("user") && (
                                    <Button
                                        variant="outline"
                                        className="custom-button"
                                        onClick={() => nav("/admin")}
                                    >
                                        Panel Admin
                                    </Button>
                                )}
                                {cookies.get("user")?.role === "ROLE_RESTO" && cookies.get("user") && (
                                    <Button
                                        variant="outline"
                                        className="custom-button"
                                        href="/resto"
                                    >
                                        Restaurante Panel
                                    </Button>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    );
}

export default NavBar;
