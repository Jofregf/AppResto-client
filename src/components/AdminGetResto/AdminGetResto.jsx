import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../redux/actions/restaurantActions";
import AdminRestoCard from "../AdminRestoCard/AdminRestoCard";

function AdminGetResto({activeDrawer, receiveRestaurant}){

    const dispatch = useDispatch();

    const restaurantes =  useSelector((state) => state.restaurants.restaurants.contents);

    const status = useSelector((state) => state.status);

    const [search, setSearch] = useState("");

    const filterName = restaurantes?.map(( resto) => resto.restaurantName);

    const [selectName, setSelectName] = useState("");

    const restoEnabled = restaurantes?.filter(resto => resto.enabled === true);
        console.log(restoEnabled, "RESTOENABLED")
    
    const restoViews = selectName === "" 
        ? restoEnabled 
        : restoEnabled.filter(resto => resto.restaurantName === selectName);
    
    const searchRestoViews = restoViews?.filter(p=> p.restaurantName.toLowerCase().includes(search.toLowerCase()));
    
    const names = new Set(filterName)
    
    const arrayNames = [...names]

    useEffect(()=>{
        dispatch(getRestaurants())
    },[dispatch, status]);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSelect = (e) => {
        e.preventDefault();
        setSelectName(e.target.value)
        setSearch("")
    }
    
    return (
        <div className="container-get-products"> 

            <div className="title-search">
                <h1>Restaurantes</h1>
                <select className="select-get-product" onChange={(e)=> handleSelect(e)}>
                    <option value="">Todos</option>
                {arrayNames?.map( (name, i) => 
                        {
                            return <option key={i} value={name}>{name}</option>
                        }    
                        )
                    }
                </select>
                <form>
                    <input
                        id="form"
                        type="text"
                        placeholder="Buscar Restaurante"
                        className="input-get-product"
                        value={search}
                        onChange ={(e) => {handleInputChange(e)}}
                    />
                </form>
            </div>
            <div className="container-articulos">
                <div>
                    {restaurantes?.length 
                        ?   <div>
                                {searchRestoViews?.length 
                                    ?   <div>
                                            {searchRestoViews.reverse()?.map( (resto, i) => 
                                                <AdminRestoCard 
                                                    key = {i}
                                                    name= {resto.restaurantName}
                                                    address= {resto.restaurantAddress}
                                                    email = {resto.restaurantEmail}
                                                    phone = {resto.restaurantPhone}
                                                    enabled= {resto.enabled} 
                                                    id= {resto.restaurantId}
                                                    activeDrawer= {activeDrawer}
                                                    restaurante= {resto}
                                                    receiveRestaurant= {receiveRestaurant}
                                                />
                                            )}
                                        </div>
                                    :   <p className="text-no-products">No se encontraron restaurantes con ese nombre</p>
                                }
                            </div>
                            
                        : <p className="text-no-products">Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminGetResto;
