import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers, unbanBanUser} from "../../redux/actions/userActions";
import Cookies from "universal-cookie";
import {Modal, Button} from "react-bootstrap";
import "./AdminBan.css";

function AdminBan() {

    const dispatch = useDispatch();
    const [usernameOrUserEmail, setUsernameOrUserEmail] = useState("");
    const [enabled, setEnabled] = useState("");
    const [refresh, setRefresh] = useState(true);
    const usersState = useSelector((state) => {
        return {
            users: Array.isArray(state.users.users)
                ? state.users.users.contents
                : [state.users.users.contents]
        }
    });
    const users = usersState.users;
    const statusState = useSelector((state) => state.users.status);

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;
    
    const findUser = users && users.length > 0 && (
        users[0].find((user) => user.userName === usernameOrUserEmail || user.userEmail === usernameOrUserEmail));

    const [modal, setModal] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value)
        handleShow()
    }
    
    useEffect(() => {
        dispatch(getUsers({token: tokenUser}));
    },[dispatch, tokenUser, statusState])

    const handleSubmit= (event) => {
        event.preventDefault();
        if(enabled !== "") {
            
            if (findUser) {
                dispatch(unbanBanUser({usernameOrUserEmail: usernameOrUserEmail, enabled: enabled, token: tokenUser}));
                modalDelete("El cambio de permiso se ha producido con éxito")
                setRefresh(!refresh)
                setEnabled("");
            } else if(findUser === undefined) {
                modalDelete("El usuario ingresado no existe")
            } 
        } else {
            modalDelete("Debe seleccionar un permiso")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3 style= {{color: "#F15422"}}>Banear/Desbanear usuario</h3>
                <div className="search-ban-container">
                    <label className="label-ban">Username o email del usuario: </label>
                    <input type="text" onChange={event => setUsernameOrUserEmail(event.target.value)} className="input-state"/>
                    <label className="label-ban">Nuevo estado:</label>
                    <select onChange={event => setEnabled(event.target.value)} className="admin-input-search">
                        <option value="">--Seleccione--</option>
                        <option value="true">Desbanear</option>
                        <option value="false">Banear</option>
                    </select>
                    <Button 
                        variant="outline" 
                        className="custom-button" 
                        type="submit"
                    >
                        Cambiar Estado
                    </Button>
                </div>
                <div>
                    {users && users.length > 0 && (
                        users[0].map((user, indice) => {
                            return (
                                <div  className="admin-ban-container" key={indice}>
                                    <div className="admin-card-container-slim-2">
                                        <p className="admin-card-slim-name">Nombre de usuario</p>
                                        <p className="admin-card-slim-info">{user.userName}</p>
                                        <p className="admin-card-slim-name">Correo electrónico</p>
                                        <p className="admin-card-slim-info">{user.userEmail}</p>
                                        <p className="admin-card-slim-name">Permiso</p>
                                        <p className="admin-card-slim-info" style={{ color: user.enabled ? "#8CD881" : "#FC526D" }}>
                                            {user.enabled ? 'Habilitado' : 'Baneado'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Advertencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="outline" 
                        className="custom-button"
                        onClick={handleClose}
                    >
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AdminBan;