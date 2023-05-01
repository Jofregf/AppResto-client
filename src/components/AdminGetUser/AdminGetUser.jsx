import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUsers, getUserByUsernameOrEmail} from "../../redux/actions/userActions";
import Cookies from "universal-cookie";
import { useNavigate} from 'react-router-dom';
/* eslint-disable */

function GetUserByUserNameOrEmail () {

    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    const userState = useSelector((state) => {
        return {
            user: Array.isArray(state.users.user)
                ? state.users.user
                : [state.users.user]
        }
    });
    
    const user = userState.user;

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
              }});        }
    }
    
    useEffect(() => {
        dispatch(getUsers({token: tokenUser}));
    },[dispatch, tokenUser, statusState])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleUserDetails(searchTerm);
        }
    };

    const handleButtonClick = () => {
        handleUserDetails(searchTerm);
    };

    return (
        <div>
             <input type="text" value={searchTerm} onChange={handleSearch} onKeyPress={handleKeyPress} />
            <button onClick={handleButtonClick}>Buscar</button>
            <h2>Lista de usuarios</h2>
            {users && users.length > 0 && (
                <ul>
                    {users[0].map((user, indice) => {
                        return (
                        <li key={indice}>
                            <p>{user.userName}</p>
                            <p>{user.userEmail}</p>
                            <button onClick={() => handleUserDetails(user.userName)}>
                            Detalles
                            </button>
                        </li>
                        );
                    })}
                </ul>
            )}
        </div>
    )
}

export default GetUserByUserNameOrEmail;