import { BsPencilSquare } from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import { Link } from "react-router-dom"
import { deleteRestaurant } from "../../redux/actions/restaurantActions";
import { useDispatch } from 'react-redux';
import {useState} from "react";
import Cookies from "universal-cookie";
import { Modal } from 'react-bootstrap';


function RestoCardRestaurants({name, address, phone, email, description, capacity, open, close, image, id,  activeDrawer,restaurante, receiveRestaurant}){

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;

    const handleEdit = (event) => {
        event.preventDefault();
        receiveRestaurant(restaurante)
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
      setModalTitle("Confirmar eliminación");
      handleShow();
      
  }

  const handleConfirmDelete = () => {
        handleClose();
        dispatch(deleteRestaurant({token: tokenUser, id:restaurante.restaurantId}));
  }

    return (
        <div className="card-admin-container-slim">
          <div className="card-admin-container-slim-1">
            <Link to={`/restaurantes/${id}`} style={{ text_decoration: 'none' }}>
              <img className="card-admin-product-img" 
              src={ image } 
              alt="imagen rota"
              width={300}
              height={300}
              ></img>
            </Link>
          </div>
          <div className="card-admin-container-slim-2">
            <div className="card-admin-information">
                <p className="card-admin-slim-name">{ name }</p>
                <p className="price-slim-card-price">{ address }</p>
                <p className="price-slim-card-price">{ email }</p>
                <p className="price-slim-card-price">{ phone }</p>
                <p className="price-slim-card-price">{ description }</p>
                <p className="price-slim-card-price">{ capacity }</p>
                <p className="price-slim-card-price">{ open }</p>
                <p className="price-slim-card-price">{ close }</p>

            </div>
            <div className="card-admin-container-slim-3">
              <div className="buttons-admin-container-slim">
                <button className="button-card-admin-slim" onClick={(e) => {handleEdit(e)}}>
                  <BsPencilSquare size={25}/>
                </button>
              </div>
              <div className="buttons-admin-container-slim">
                <button className="button-card-admin-slim" onClick={(e) => {handleDelete(e)}}>
                  <AiFillDelete size={25}/>
                </button>
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
            <Modal.Body> {modal} </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} >Cancelar</button>
                <button onClick={handleConfirmDelete} >Eliminar</button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RestoCardRestaurants;