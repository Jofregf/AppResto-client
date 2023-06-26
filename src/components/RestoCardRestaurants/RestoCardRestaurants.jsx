import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteRestaurant } from "../../redux/actions/restaurantActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Modal, Button } from "react-bootstrap";
import "./RestoCardRestaurants.css";

function RestoCardRestaurants({name, address, phone, email, description, capacity, open, close, image, id, restaurante, receiveRestaurant}) {
    
    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;
    const [deleted, setDeleted] = useState(false);

    const handleEdit = (event) => {
        event.preventDefault();
        receiveRestaurant(restaurante);
    };

    const [modal, setModal] = useState("");
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value);
        handleShow();
    };

    const handleDelete = (event) => {
        event.preventDefault();
        setModalTitle("Confirmar eliminación");
        handleShow();
    };

    const handleConfirmDelete = () => {
        handleClose();
        dispatch(
            deleteRestaurant({ token: tokenUser, id: restaurante.restaurantId })
        ).then(() => {
            setDeleted(true);
        });
    };

    if (deleted) {
        return null;
    }

    return (
        <div className="resto-admin-container">
            <div className="card-admin-container-slim-1">
                <Link
                    to={`/restaurantes/${id}`}
                    style={{ text_decoration: "none" }}
                    className="link-admin-resto"
                >
                    <img
                        className="card-admin-resto-img"
                        src={image}
                        alt="imagen rota"
                    ></img>
                </Link>
            </div>
            <div className="card-admin-container-slim-2">
                <div className="card-admin-information">
                    <p className="card-admin-slim-name">{name}</p>
                </div>
                <div className="card-admin-container-slim-3">
                    <div className="card-admin-container-slim-info">
                        <p className="card-admin-slim-info">Dirección: {address}</p>
                        <p className="card-admin-slim-info">e-mail: {email}</p>
                        <p className="card-admin-slim-info">Teléfono: {phone}</p>
                        <p className="card-admin-slim-info">Descripción: {description}</p>
                        <p className="card-admin-slim-info">Capacidad: {capacity}</p>
                        <p className="card-admin-slim-info">Apertura: {open}</p>
                        <p className="card-admin-slim-info">Cierre: {close}</p>
                    </div>
                    <div className="buttons-admin">
                        <div className="buttons-admin-container-slim">
                            <Button
                                variant="outline"
                                className="custom-button"
                                onClick={(e) => {
                                    handleEdit(e);
                                }}
                            >
                                <BsPencilSquare size={20} />
                            </Button>
                        </div>
                        <div className="buttons-admin-container-slim">
                            <Button
                                variant="outline"
                                className="custom-button"
                                onClick={(e) => {
                                    handleDelete(e);
                                }}
                            >
                                <AiFillDelete size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    El restaurante será eliminado permanentemente{" "}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline"
                        className="custom-button"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="outline"
                        className="custom-button"
                        onClick={handleConfirmDelete}
                    >
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RestoCardRestaurants;
