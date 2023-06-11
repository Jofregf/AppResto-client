import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers, updateRole} from "../../redux/actions/userActions";
import Cookies from "universal-cookie";
import {Modal, Button} from "react-bootstrap";

function AdminRole(){

    const dispatch = useDispatch();
    const [usernameOrUserEmail, setUsernameOrUserEmail] = useState("");
    const [role, setRole] = useState("");
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
        if(role !== "") {
            if (findUser) {
                dispatch(updateRole({usernameOrUserEmail: usernameOrUserEmail, role: role, token: tokenUser}));
                modalDelete("El cambio de rol se ha producido con éxito")
                setRefresh(!refresh)
                setRole("");
            } else if(findUser === undefined) {
                modalDelete("El usuario ingresado no existe")
            } 
        } else {
            modalDelete("Debe seleccionar un rol")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>Cambio de roles de los usuarios</div>
                <label>Username o email del usuario: </label>
                <input type="text" onChange={event => setUsernameOrUserEmail(event.target.value)}/>
                <label>Nuevo rol:</label>
                <select onChange={event => setRole(event.target.value)}>
                    <option value="">--Seleccione--</option>
                    <option value="user">Usuario</option>
                    <option value="resto">Restaurante</option>
                    <option value="admin">Administrador</option>
                </select>
                <Button 
                    variant="outline" 
                    className="custom-button"
                    type="submit"
                >
                    Cambiar rol
                </Button>
                <div>
                    {users && users.length > 0 && (
                        users[0].map((user, indice) => {
                            return (
                                <div key={indice}>
                                <p>Nombre de usuario: {user.userName}</p>
                                <p>Correo electrónico: {user.userEmail}</p>
                                <p>Rol:
                                    {
                                        user.role.roleName === "ROLE_ADMIN"? " Administrador"
                                        : user.role.roleName === "ROLE_RESTO"? " Restaurante"
                                        : user.role.roleName === "ROLE_USER"? " Usuario"
                                        : "Desconocido"
                                    }
                                </p>
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

export default AdminRole;