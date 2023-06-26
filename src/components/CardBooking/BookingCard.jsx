import { BsPencilSquare } from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import { Link } from "react-router-dom"
import { getBookingUser, deleteBooking} from "../../redux/actions/bookingActions";
import { useDispatch } from 'react-redux';
import {useState} from "react";
import Cookies from "universal-cookie";
import { Modal, Button } from 'react-bootstrap';
import "./BookingCard.css";

function BookingCard({id, date, time, partySize, name, address, email, phone, booking}){

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;

    const [state, setState] = useState("");
    
    const [bookingSend, setBookingSend] = useState(null);
    
    const receiveBookingData = (booking) => {
        setBookingSend(booking)
        setState("booking")
    }

    const handleEdit = () => {
        receiveBookingData(booking)
    }

    const [modal, setModal] = useState("")
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value)
        handleShow()
    }

    const handleDelete = (event) => {
        event.preventDefault();
        modalDelete();
        setModalTitle("Confirmar eliminación");
        handleShow();
    }

    const handleConfirmDelete = () => {
        handleClose();
        dispatch(deleteBooking({token: tokenUser, idBooking: id}));
        setTimeout(() => {
            dispatch(getBookingUser({token: tokenUser}));
        }, 1000);
    }

    const bookingDate = new Date(date);
    const utcOffset = bookingDate.getTimezoneOffset() * 60000; 
    const localDate = new Date(bookingDate.getTime() + utcOffset);

    const day = localDate.getDate();
    const month = localDate.getMonth() + 1;
    const year = localDate.getFullYear();

    const formattedDate = ("0" + day).slice(-2) + "-" + ("0" + month).slice(-2) + "-" + year;

    const formattedTime = time.slice(0, 5);
    return (
        
        <div className="admin-booking-container">
            <div className="admin-book-container-slim-2">
                <div className="admin-book-information">
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">Fecha</p>
                        <p className="admin-book-slim-info">{formattedDate}</p>
                    </div>
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">Hora</p>
                        <p className="admin-book-slim-info">{formattedTime}</p>
                    </div>
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">Personas</p>
                        <p className="admin-book-slim-info">{partySize}</p>
                    </div>
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">Restaurante</p>
                        <p className="admin-book-slim-info">{name}</p>
                    </div>
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">Dirección</p>
                        <p className="admin-book-slim-info">{address}</p>
                    </div>
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">e-mail</p>
                        <p className="admin-book-slim-info">{email}</p>
                    </div>
                    <div className="admin-book-info-class">
                        <p className="admin-book-slim-name">Teléfono</p>
                        <p className="admin-book-slim-info">{phone}</p>
                    </div>
                </div>
            
                <div className="admin-book-container-slim-3">
                    <div className="admin-book-buttons-container-slim">
                        <Link to={`/reservas/${id}`}>
                                <div onClick={(e) => {handleEdit(e)}}>
                                    <Button 
                                        variant="outline" 
                                        className="custom-button btn-sm"
                                        >
                                        <BsPencilSquare/>
                                    </Button>
                                </div>
                        </Link>
                    </div>
                    <div className="admin-buttons-container-slim">
                        <Button 
                            variant="outline" 
                            className="custom-button btn-sm"
                            onClick={(e) => {handleDelete(e)}}
                            >
                            <AiFillDelete/>
                        </Button>
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
            <Modal.Body> La reserva se eliminará permantentemente</Modal.Body>
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
    )
}

export default BookingCard;
