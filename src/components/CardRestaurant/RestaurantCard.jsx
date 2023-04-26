import {Link} from 'react-router-dom'

function RestaurantCard({id, name, image, address, phone, email, rating}) {

    return (
            <div >
                <Link to={`/restaurants/${id}`}>
                    <h3> {name} </h3>
                    <img
                        src={`${image}`}
                        alt = {name}
                        height = "200px"
                        width = "200px"
                    />
                    <p>{address}</p>
                    <p>{phone}</p>
                    <p>{email}</p>
                    <p>{rating}</p>
                </Link>
            </div>
    )
}

export default RestaurantCard;