import {Link} from "react-router-dom"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function RestaurantCard({id, name, image, address, phone, email, rating}) {

    return (
            <div >
                <Link to={`/restaurantes/${id}`}>
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
                    {
                    rating === 0 ? <><span>Sin reseñas</span> </>:
                    rating === 1 ? <span className="starShow"> <AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </span>:
                    rating === 2 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </span>:
                    rating === 3 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/> </span>:
                    rating === 4 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/> </span>:
                    rating === 5 ? <span className="starShow"> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/> </span>:
                    null
                    }
                </Link>
            </div>
    )
}

export default RestaurantCard;