import { useLocation, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./CardUser.css"


function UserCard() {
    
    const location = useLocation();
    const { state } = location;
    const { userName, firstName, lastName, phone, email, enabled, role } = state || {};
  
    if (!state) {
      return <div>Loading...</div>;
    }
    
    return (
        <div className="containerUsers">
            <div className="container-users">
                <Card className="card-users">
                <Card.Body>
                    <Card.Title className="title-users">
                    {userName}
                    </Card.Title>
                    <div className="info-users">
                        <Card.Text>{firstName}</Card.Text>
                        <Card.Text>{lastName}</Card.Text>
                        <Card.Text>{phone}</Card.Text>
                        <Card.Text>{email}</Card.Text>
                        <Card.Text>{enabled === true ? 'Habilitado' : 'Baneado'}</Card.Text>
                        <Card.Text>{lastName}</Card.Text>
                        <Card.Text>{phone}</Card.Text>
                        {role && role.roleName ? 
                        (
                        role.roleName === "ROLE_ADMIN"? " Administrador"
                        : role.roleName === "ROLE_RESTO"? " Restaurante"
                        : role.roleName === "ROLE_USER"? " Usuario"
                        : "Desconocido"
                        ):null
                    }
                        </div>
                </Card.Body>
                    <Link to="/admin">
                        <Button 
                            variant="outline" 
                            className="custom-button"
                        >
                            Panel Admin
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    )
}

export default UserCard;
