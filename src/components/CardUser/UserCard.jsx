import { useLocation, Link } from 'react-router-dom';


function UserCard() {
    
    const location = useLocation();
    const { state } = location;
    const { userName, firstName, lastName, phone, email, enabled, role } = state || {};
  
    if (!state) {
      return <div>Loading...</div>;
    }
   
    console.log(state)
    return (
            <div>

                    <h3>Usuario: {userName} </h3>
                    <p>Nombre: {firstName}</p>
                    <p>Apellido: {lastName}</p>
                    <p>Teléfono: {phone}</p>
                    <p>Email: {email}</p>
                    <p>Permiso: {enabled === true ? 'Habilitado' : 'Baneado'}</p>
                    <p>Rol:
                    {role && role.roleName ? 
                        (
                        role.roleName === "ROLE_ADMIN"? " Administrador"
                        : role.roleName === "ROLE_RESTO"? " Restaurante"
                        : role.roleName === "ROLE_USER"? " Usuario"
                        : "Desconocido"
                        ):null
                    }
                    </p>
                    <Link to="/admin/users">
                        <button>Lista Usuarios</button>
                    </Link>
                    <Link to="/admin">
                        <button>Panel Admin</button>
                    </Link>
            </div>
    )
}

export default UserCard;