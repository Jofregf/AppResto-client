import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
// import './UserDetail.css';
import Cookies from "universal-cookie";
import { getUserById } from "../../redux/actions/userActions";
import {Button} from "react-bootstrap"


export default function UserDetail() {

    const dispatch = useDispatch();
    let cookie = new Cookies();
    const user = cookie.get("user")
    console.log(user)
    const detailUser = useSelector(state => state.users)
    const tokenUser = cookie.get("user")?.accessToken;
    console.log(detailUser)

    useEffect(() => {
        dispatch(getUserById({ token: tokenUser}))
    },[dispatch, tokenUser])

    return (
        <div className="container-user-detail">

            {user
                ? <div>
                    <div className="profile-container">
                        { detailUser.user?.userName && <div>Usuario: {detailUser.user?.userName} </div>}
                        { detailUser.user?.userName && <div>Nombre {detailUser.user?.firstName} </div>}
                        { detailUser.user?.userName && <div>Apellido {detailUser.user?.lastName} </div>}
                        { detailUser.user?.userEmail && <div>Email: {detailUser.user?.userEmail} </div>}
                        { detailUser.user?.userPhone && <div>Telefono: {detailUser.user?.userPhone} </div>}

                        <Link to="/usuario/editar">
                            <Button 
                                variant="outline" 
                                className="custom-button" 
                            >
                                Editar mis Datos
                            </Button>
                        </Link>
                        <Link to="/usuario/editarpassword">
                            <Button 
                                variant="outline" 
                                className="custom-button" 
                            >
                                Cambiar mi Contraseña
                            </Button>
                        </Link>
                    </div>
                </div>
                : <div>No existe el usuario</div>
            }
        </div>);
}
