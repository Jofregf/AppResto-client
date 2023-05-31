import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import RestoCardRestaurants from "../RestoCardRestaurants/RestoCardRestaurants";
import {getRestoByUser} from "../../redux/actions/restaurantActions";
import SearchBookings from "../RestoSearchBookings/SearchBookings";

function RestoGetRestaurants({activeDrawer, receiveRestaurant, tokenUser}){

    const restaurants = useSelector((state) => state.restaurants.restaurant);
    const status = useSelector((state) => state.restaurants.status);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    useEffect(()=>{
        dispatch(getRestoByUser({token: tokenUser}))
    },[dispatch, status, tokenUser]);

    const searchRestoview = restaurants.filter(resto=> resto.restaurantName
        .toLowerCase().includes(search.toLowerCase()));
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <div>
            <div>
                <form>
                        <input
                            id="form"
                            type="text"
                            placeholder="Busca tu restaurant"
                            className="input-get-product"
                            value={search}
                            onChange ={(e) => {handleInputChange(e)}}
                        />
                </form>
            </div>
            <div>
            {restaurants.length 
                    ?   <div>
                            {searchRestoview.length 
                                ?   <div>
                                        {searchRestoview.reverse()?.map( (resto, i) =>
                                            <React.Fragment key={i}>
                                                <SearchBookings name = {resto.restaurantName} tokenUser={tokenUser}/>
                                                <RestoCardRestaurants 
                                                    key = {i}
                                                    name= {resto.restaurantName}
                                                    address= {resto.restaurantAddress}
                                                    phone= {resto.restaurantPhone}
                                                    email= {resto.restaurantEmail}
                                                    description= {resto.restaurantDescription}
                                                    capacity= {resto.restaurantCapacity}
                                                    open = {resto.openingHoursRestaurant}
                                                    close= {resto.closingHoursRestaurant}
                                                    image= {resto.restaurantImages}
                                                    activeDrawer= {activeDrawer}
                                                    id= {resto.restaurantId}
                                                    restaurante= {resto}
                                                    receiveRestaurant= {receiveRestaurant}
                                                />
                                            </React.Fragment>
                                            
                                        )}
                                    </div>
                                :   <p className="text-no-products">No se encontraron Restaurantes con ese nombre</p>
                            }
                            </div>
                        
                        : <p className="text-no-products">Loading...</p>
                    }
            </div>
        </div>
    )
}

export default RestoGetRestaurants;