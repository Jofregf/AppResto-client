import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers, getUserByUsernameOrEmail} from "../../redux/actions/userActions";
import Cookies from "universal-cookie";
import { useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";

function GetUserByUserNameOrEmail () {

    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
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
    const navigate = useNavigate();

    const handleUserDetails = (usernameOrEmail) =>{
        const findUser = users[0].find(user => user.userName === usernameOrEmail || user.userEmail === usernameOrEmail);
        if(findUser){
            dispatch(getUserByUsernameOrEmail({usernameOrEmail: usernameOrEmail, token: tokenUser}));
            setSelectedUser(findUser)
            navigate(`/admin/user/${findUser.userName}`, { state: { 
                userName: findUser.userName,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                phone: findUser.userPhone,
                email: findUser.userEmail,
                enabled: findUser.enabled,
                role: findUser.role
            }});        
        }
    }
    
    useEffect(() => {
        dispatch(getUsers({token: tokenUser}));
    },[dispatch, tokenUser, statusState])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleButtonClick = () => {
        handleUserDetails(searchTerm);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearch} className="input-state"/>
            <Button 
                variant="outline" 
                className="custom-button"
                onClick={handleButtonClick}
            >
                Buscar
            </Button>
            <h3 style= {{color: "#F15422"}}>Lista de usuarios</h3>
            {users && users.length > 0 && (
                <ul>
                    {users[0].map((user, indice) => {
                        return (
                        <div className="admin-ban-container" key={indice}>
                            <div className="admin-card-container-slim-2">
                            <div className="admin-card-info-class">
                            <p className="admin-card-slim-name">Nombre de usuario</p>
                            <p className="admin-card-slim-info">{user.userName}</p>
                            </div>
                            <div className="admin-card-info-class">
                            <p className="admin-card-slim-name">e-mail</p>
                            <p className="admin-card-slim-info">{user.userEmail}</p>
                            </div>
                            <Button 
                                variant="outline" 
                                className="custom-button"
                                onClick={() => handleUserDetails(user.userName)}
                            >
                                Detalles
                            </Button>
                            </div>
                        </div>
                        );
                    })}
                </ul>
            )}
        </div>
    )
}

export default GetUserByUserNameOrEmail;