import { BsPencilSquare } from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import { Link, useParams} from "react-router-dom"
import { deleteMenu, getMenusByRestaurantId} from "../../redux/actions/menuActions";
import { useDispatch } from 'react-redux';
import {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import { Modal } from 'react-bootstrap';

function MenuCard({idMenu, name, image, description, menu}){

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;
    const { id } = useParams();
    const [forceUpdate, setForceUpdate] = useState(false);
    const [menuData, setMenuData] = useState([]);

    const [state, setState] = useState("");
    
    const [menuSend, setMenuSend] = useState(null);
    
    const receiveMenuData = (menu) => {
        setMenuSend(menu)
        setState("menu")
    }

    const handleEdit = (event) => {
        // event.preventDefault();
        // console.log(menu)
        receiveMenuData(menu)
        
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
        dispatch(deleteMenu({token: tokenUser, idMenu: idMenu, idResto: id}));
        setTimeout(() => {
            dispatch(getMenusByRestaurantId(id));
        }, 1000);
    }

    return (
        <div className="card-admin-container-slim">
            <div className="card-admin-container-slim-1">
                <img className="card-admin-product-img" 
                    src={ image } 
                    alt="imagen rota"
                    width={300}
                    height={300}
                    >
                </img>
            </div>
            <div className="card-admin-container-slim-2">
                <div className="card-admin-information">
                    <p className="card-admin-slim-name">{ name }</p>
                    <p className="price-slim-card-price">{ description }</p>
                </div>
                <div className="card-admin-container-slim-3">
                    <div className="buttons-admin-container-slim">
                        <Link to={`/menu/${idMenu}/restaurant/${id}`}>
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

export default MenuCard;