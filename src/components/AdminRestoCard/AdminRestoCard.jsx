import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { editEnabledResto } from "../../redux/actions/restaurantActions"
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
import "./AdminRestoCard.css"

function AdminCardResto ({name, enabled, address, phone, email, id}){

    const dispatch = useDispatch();
    let cookie = new Cookies;
    const tokenUser = cookie.get("user").accessToken;
    
    const [disabledCard, setDisabledCard] = useState(enabled);
    
    const handleDisabled = (e) => {
        e.preventDefault();
        dispatch(editEnabledResto({id, "enabled": !enabled, token: tokenUser}));
        setDisabledCard(!disabledCard);
    }
    
    return (
        <div className="admin-resto-container">
            
            <div className="admin-card-container-slim-2">
                <div className="admin-card-information">
                    <div className="admin-card-info-class">
                        <p className="admin-card-slim-name">Nombre</p>
                        <p className="admin-card-slim-info">{ name }</p>
                    </div>
                    <div className="admin-card-info-class">
                        <p className="admin-card-slim-name">Dirección:</p>
                        <p className="admin-card-slim-info">{ address }</p>
                    </div>
                    <div className="admin-card-info-class">
                        <p className="admin-card-slim-name">Teléfono</p>
                        <p className="admin-card-slim-info">{ phone }</p>
                    </div>
                    <div className="admin-card-info-class">
                        <p className="admin-card-slim-name">e-mail</p>
                        <p className="admin-card-slim-info">{ email }</p>
                    </div>
                </div>
                <div className="admin-card-container-slim-3">
                    <div className="admin-buttons-container-slim">
                        <Button 
                            variant="outline" 
                            className="custom-button" 
                            onClick={(e) => {handleDisabled(e)}}
                        >
                            {
                            disabledCard ? <VscEyeClosed size={25}/> :  <VscEye size={25}/>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCardResto;