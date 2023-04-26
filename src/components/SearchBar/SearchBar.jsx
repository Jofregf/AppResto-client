import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {getRestaurantByMenuName} from '../../redux/actions/restaurantActions'

function SearchBar(){

    const [menuName, setMenuName] = useState('');
    const dispatch = useDispatch();

    function handleInputChange(event) {
        event.preventDefault();
        setMenuName(event.target.value.toLowerCase());
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getRestaurantByMenuName(menuName));
        setMenuName('');
    }

    return (
        <div>
            {<form onSubmit={(event) => handleSubmit(event)}>
                    <input
                        id='form'
                        placeholder='Ingrese una comida'
                        value={menuName}
                        onChange={(event) => handleInputChange(event)}
                    />
                    <button type='submit'>Buscar</button>
                </form>
            }
        
        </div>
    )
}

export default SearchBar;