import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { editEnabledResto } from "../../redux/actions/restaurantActions"
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

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
        <div className="card-admin-container-slim">
            
            <div className="card-admin-container-slim-2">
                <div className="card-admin-information">
                    <p className="card-admin-slim-name">{ name }</p>
                    <p className="card-admin-slim-name">{ address }</p>
                    <p className="card-admin-slim-name">{ phone }</p>
                    <p className="card-admin-slim-name">{ email }</p>
                </div>
                <div className="card-admin-container-slim-3">
                    <div className="buttons-admin-container-slim">
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