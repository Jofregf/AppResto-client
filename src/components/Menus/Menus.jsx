import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {getMenusByRestaurantId, deleteMenu} from "../../redux/actions/menuActions";
import Cookie from "universal-cookie";
import { Button, Card, Modal } from "react-bootstrap";
import "./Menu.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

function Menus() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const cookie = new Cookie();
    const cookieRole = cookie.get("user")?.role;
    const [search, setSearch] = useState("");
    const [state, setState] = useState("");
    const [menuSend, setMenuSend] = useState(null);
    const [modal, setModal] = useState("");
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    let tokenUser = cookie.get("user")?.accessToken;
    const [deletingMenuId, setDeletingMenuId] = useState(null);

    const resto = useSelector((state) => state.restaurants?.restaurant);

    useEffect(() => {
        dispatch(getMenusByRestaurantId(id));
    }, [dispatch, id]);

    const menusState = useSelector((state) => {
        return Array.isArray(state.menus.menus)
            ? state.menus.menus
            : [state.menus.menus];
    });

    const menuName = menusState.filter((menu) =>
        menu.menuName.toLowerCase().includes(search.toLowerCase())
    );

    if (!menusState) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const receiveMenuData = (menu) => {
        setMenuSend(menu);
        setState("menu");
    };

    const handleEdit = () => {
        receiveMenuData();
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (event, idMenu) => {
        event.preventDefault();
        setModalTitle("Confirmar eliminación");
        handleShow();
        setDeletingMenuId(idMenu);
    };

    const handleConfirmDelete = () => {
        handleClose();
        dispatch(
            deleteMenu({
                token: tokenUser,
                idMenu: deletingMenuId,
                idResto: id,
            })
        );
        setTimeout(() => {
            dispatch(getMenusByRestaurantId(id));
        }, 1000);
    };

    return (
        <>
            {resto?.length > 0 && cookieRole === "ROLE_RESTO" ? (
                <div>
                    <div className="search-container">
                        <Link
                            to={`/crear-menu/${id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <Button variant="outline" className="custom-button">
                                Crear menú
                            </Button>
                        </Link>
                        <form>
                            <input
                                id="form"
                                type="text"
                                placeholder="Busca menú"
                                className="input-login"
                                value={search}
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                            />
                        </form>
                    </div>
                    <div className="containerMenuCards">
                        {menusState.length ? (
                            <div className="containerMenuRestoCards">
                                {menuName.length ? (
                                    <>
                                        {menuName.reverse()?.map((menu) => (
                                            <div key={menu.menuId}>
                                                <Card className="card-menu-resto">
                                                    <Card.Body>
                                                        <Card.Img
                                                            className="img-menu"
                                                            variant="top"
                                                            src={menu.menuImage}
                                                        />
                                                        <Card.Title className="title-menu">
                                                            {menu.menuName}
                                                        </Card.Title>
                                                            <Card.Text>
                                                                <p className="info-menu">{menu.menuDescription}</p>
                                                            </Card.Text> 
                                                        <div className="button-menu-resto">
                                                            <Link
                                                                to={`/menu/${menu.menuId}/restaurant/${id}`}
                                                                >
                                                                <div
                                                                    onClick={(e) => {
                                                                        handleEdit(e);
                                                                    }}
                                                                    >
                                                                    <Button
                                                                        variant="outline"
                                                                        className="custom-button "
                                                                        >
                                                                        <BsPencilSquare />
                                                                    </Button>
                                                                </div>
                                                            </Link>
                                                            <Button
                                                                variant="outline"
                                                                className="custom-button"
                                                                onClick={(e) => {handleDelete(e, menu.menuId)}}
                                                            >
                                                                <AiFillDelete />
                                                            </Button>
                                                        </div>
                                                    </Card.Body>
                                                </Card>

                                                <Modal
                                                    show={show}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>
                                                            {modalTitle}
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        {" "}
                                                        {modal}{" "}
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button
                                                            variant="outline"
                                                            className="custom-button"
                                                            onClick={
                                                                handleClose
                                                            }
                                                        >
                                                            Cancelar
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="custom-button"
                                                            onClick={
                                                                handleConfirmDelete
                                                            }
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p className="alert-menu">
                                        No se encontraron menús con ese nombre
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="alert-menu">
                                No se encontraron menús con ese nombre
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="containerMenuCards">
                        {menusState.length ? (
                            <div className="containerMenuRestoCards">
                                {menuName.length ? (
                                    <>
                                        {menuName.reverse()?.map((menu) => (
                                            <div key={menu.menuId}>
                                                <Card className="card-menu">
                                                    <Card.Body>
                                                        <Card.Img
                                                            className="img-menu"
                                                            variant="top"
                                                            src={menu.menuImage}
                                                        />
                                                        <Card.Title className="title-menu">
                                                            {menu.menuName}
                                                        </Card.Title>
                                                        <div className="info-menu">
                                                            <Card.Text>
                                                                {
                                                                    menu.menuDescription
                                                                }
                                                            </Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <p className="alert-menu">
                                        No se encontraron menús con ese nombre
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p className="alert-menu">Loading...</p>
                        )}
                    </div>
                    <div className="buton-booking">
                        <Link to={`/restaurantes/${id}/reserva`}>
                            <Button variant="outline" className="custom-button">
                                Reservar
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default Menus;
