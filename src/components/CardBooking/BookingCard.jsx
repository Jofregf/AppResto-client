import { BsPencilSquare } from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import { Link } from "react-router-dom"
import { getBookingUser, deleteBooking} from "../../redux/actions/bookingActions";
import { useDispatch } from 'react-redux';
import {useState} from "react";
import Cookies from "universal-cookie";
import { Modal } from 'react-bootstrap';

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
        
        <div className="card-admin-container-slim">
            <div className="card-admin-container-slim-2">
                <div className="card-admin-information">
                    <p className="card-admin-slim-name">{formattedDate}</p>
                    <p className="price-slim-card-price">{formattedTime}</p>
                    <p className="price-slim-card-price">{partySize}</p>
                    <p className="price-slim-card-price">{name}</p>
                    <p className="price-slim-card-price">{address}</p>
                    <p className="price-slim-card-price">{email}</p>
                    <p className="price-slim-card-price">{phone}</p>
                </div>
            </div>
            
                <div className="card-admin-container-slim-3">
                    <div className="buttons-admin-container-slim">
                        <Link to={`/reservas/${id}`}>
                                <div onClick={(e) => {handleEdit(e)}}>
                                    <button className="button-card-admin-slim" >
                                    <BsPencilSquare size={25}/>
                                    </button>
                                </div>
                        </Link>
                    </div>
                    <div className="buttons-admin-container-slim">
                        <button className="button-card-admin-slim" onClick={(e) => {handleDelete(e)}}>
                        <AiFillDelete size={25}/>
                        </button>
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
            <Modal.Body> {modal} </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} >Cancelar</button>
                <button onClick={handleConfirmDelete} >Eliminar</button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default BookingCard;
