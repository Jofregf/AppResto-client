import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom"
import { deleteRestaurant } from "../../redux/actions/restaurantActions";
import { useDispatch } from 'react-redux';
import Cookies from "universal-cookie";

function RestoCardRestaurants({name, address, phone, email, description, capacity, open, close, image, id,  activeDrawer,restaurante, receiveRestaurant}){

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;
    const handleEdit = (event) => {
        event.preventDefault();
        receiveRestaurant(restaurante)
    }

    const handleDelete = (event) => {
      event.preventDefault();
      dispatch(deleteRestaurant({token: tokenUser, id:restaurante.restaurantId}))
    }
      return (
        <div className="card-admin-container-slim">
          <div className="card-admin-container-slim-1">
            <Link to={`/restaurants/${id}`} style={{ text_decoration: 'none' }}>
              <img className="card-admin-product-img" 
              src={ image } 
              alt="imagen rota"
              width={300}
              height={300}
              ></img>
            </Link>
          </div>
          <div className="card-admin-container-slim-2">
            <div className="card-admin-information">
                <p className="card-admin-slim-name">{ name }</p>
                <p className="price-slim-card-price">{ address }</p>
                <p className="price-slim-card-price">{ email }</p>
                <p className="price-slim-card-price">{ phone }</p>
                <p className="price-slim-card-price">{ description }</p>
                <p className="price-slim-card-price">{ capacity }</p>
                <p className="price-slim-card-price">{ open }</p>
                <p className="price-slim-card-price">{ close }</p>

            </div>
            <div className="card-admin-container-slim-3">
              <div className="buttons-admin-container-slim">
                <button className="button-card-admin-slim" onClick={(e) => {handleEdit(e)}}>
                  <BsPencilSquare size={25}/>
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default RestoCardRestaurants;