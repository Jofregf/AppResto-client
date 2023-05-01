import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers, unbanBanUser} from "../../redux/actions/userActions";
import Cookies from "universal-cookie";
import {Modal} from "react-bootstrap";

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
        console.log(users)
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
            console.log(enabled)
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
                <div>Banear/Desbanear usuario</div>
                <label>Username o email del usuario: </label>
                <input type="text" onChange={event => setUsernameOrUserEmail(event.target.value)}/>
                <label>Nuevo estado:</label>
                <select onChange={event => setEnabled(event.target.value)}>
                    <option value="">--Seleccione--</option>
                    <option value="true">Desbanear</option>
                    <option value="false">Banear</option>
                </select>
                <button type="submit">Cambiar Estado</button>
                <div>
                    {users && users.length > 0 && (
                        users[0].map((user, indice) => {
                            return (
                                <div key={indice}>
                                    <p>Nombre de usuario: {user.userName}</p>
                                    <p>Correo electrónico: {user.userEmail}</p>
                                    <p>Permiso: {user.enabled? 'Habilitado' : 'Baneado'}</p>
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
                    <button onClick={handleClose}>Continuar</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AdminBan;