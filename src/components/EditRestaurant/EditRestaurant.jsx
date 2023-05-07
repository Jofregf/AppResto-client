import {getRestoByUser, editRestaurant} from "../../redux/actions/restaurantActions";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Cookies from "universal-cookie";


const formSchema = Yup.object().shape({
    restaurantName: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres"),
    restaurantAddress: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres"),
    restaurantPhone: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(10, "Mínimo 10 carácteres"),
    restaurantEmail: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(8, "Mínimo 8 carácteres")
        .matches(
            RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
            "El email no es válido"
        ),
    restaurantDescription: Yup.string()
        .required("Este campo es requerido")
        .max(480, "Máximo 480 carácteres")
        .min(10, "Completar campo"),
    restaurantImages: Yup.array()
        .required("Este campo es requerido")
        .of(Yup.string()
            .matches(
                RegExp(
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
                ),
                "Ingresar formato URL"
            )
        ),
    restaurantCapacity: Yup.number()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 carácteres")
        .min(8, "Mínimo 8 carácteres"),
    openingHoursRestaurant: Yup.string()
        .required("Este campo es requerido")
        .matches(RegExp(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/), "Ingresar una hora válida en formato HH:mm:ss"),
    closingHoursRestaurant: Yup.string()
        .required("Este campo es requerido")
        .matches(RegExp(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/), "Ingresar una hora válida en formato HH:mm:ss"),
});

function EditRestaurant({activeDrawer, handleHome, restaurante }){

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;

    const preloadedValues = {
        restaurantName: restaurante?.restaurantName,
        restaurantAddress: restaurante?.restaurantAddress,
        restaurantPhone: restaurante?.restaurantPhone,
        restaurantEmail: restaurante?.restaurantEmail,
        restaurantDescription: restaurante?.restaurantDescription,
        restaurantImages: restaurante?.restaurantImages,
        restaurantCapacity: restaurante?.restaurantCapacity,
        openingHoursRestaurant: restaurante?.openingHoursRestaurant,
        closingHoursRestaurant: restaurante?.closingHoursRestaurant
    }

    const formOptions = { resolver: yupResolver(formSchema), defaultValues: preloadedValues };
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions);
    
    useEffect(()=>{
        dispatch(getRestoByUser({token: tokenUser}))
    },[dispatch, tokenUser])
    
    const onSubmit = (data) => {
        dispatch(editRestaurant({data, token: tokenUser, id:restaurante.restaurantId}));        
        handleHome();
        activeDrawer();
    };

    return (
        <div className="container-register-form">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-index">
                <div className="form-container">
                    <div className="title">Editar restaurante</div>
                    <div className="form-group-one">
                        <div className="labelAndInput">
                            <label className="input-label">*Nombre: </label>
                            <input
                                className="input-register"
                                type="text"
                                name="restaurantName"
                                value={restaurante?.restaurantName}
                                {...register("restaurantName")}
                            />
                            {<div className="form-register-errors">{errors.restaurantName?.message}</div>}
                        </div>
                        <div className="labelAndInput">
                            <label className="input-label">*Dirección: </label>
                            <input
                                className="input-register"
                                type="text"
                                name="restaurantAddress"
                                {...register("restaurantAddress")}
                                />
                            {<div className="form-register-errors">{errors.restaurantAddress?.message}</div>}
                        </div>
                        <div className="labelAndInput">
                            <label className="input-label">*Teléfono: </label>
                            <input
                                className="input-register"
                                type="text"
                                name="restaurantPhone"
                                {...register("restaurantPhone")}
                            />
                            {<div className="form-register-errors">{errors.restaurantPhone?.message}</div>}
                        </div>
                        <div className="input-small">
                            <div className="labelAndInput-small">
                                <label className="input-label">*Email: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="restaurantEmail"
                                    {...register("restaurantEmail")}
                                    />
                                {<div className="form-register-errors">{errors.restaurantEmail?.message}</div>}
                            </div>
                        </div>
                        <div className="labelAndInput">
                            <label className="input-label">*Descripción: </label>
                            <input
                                className="input-register"
                                type="text"
                                name="restaurantDescription"
                                {...register("restaurantDescription")}
                            />
                            {<div className="form-register-errors">{errors.restaurantDescription?.message}</div>}
                        </div>
                        <div className="input-small">
                            <div className="labelAndInput-small">
                                <label className="input-label">*Imágenes: </label>
                                {preloadedValues.restaurantImages.map((image, index) => (
                                <div  key={`restaurantImages[${index}]`}>
                                <input
                                    className="input-register"
                                    type="text"
                                    name={`restaurantImages[${index}]`}
                                    defaultValue={image}
                                    {...register(`restaurantImages[${index}]`)}
                                />
                                </div>
                                ))}
                                {<div className="form-register-errors">{errors.restaurantImages?.message}</div>}
                            </div>
                        </div>
                        <div className="input-small">
                            <div className="labelAndInput-small">
                                <label className="input-label">*Capacidad: </label>
                                <input
                                    className="input-register"
                                    type="number"
                                    name="restaurantCapacity"
                                    {...register("restaurantCapacity")}
                                    />
                                {<div className="form-register-errors">{errors.restaurantCapacity?.message}</div>}
                            </div>
                            
                        </div>
                        <div className="input-small">
                            <div className="labelAndInput-small">
                                <label className="input-label">*Horario apertura: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="openingHoursRestaurant"
                                    {...register("openingHoursRestaurant")}
                                    />
                                {<div className="form-register-errors">{errors.openingHoursRestaurant?.message}</div>}
                            </div>
                            
                        </div>
                        <div className="input-small">
                            <div className="labelAndInput-small">
                                <label className="input-label">*Horario cierre: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="closingHoursRestaurant"
                                    {...register("closingHoursRestaurant")}
                                    />
                                {<div className="form-register-errors">{errors.closingHoursRestaurant?.message}</div>}
                            </div>
                            
                        </div>
                    </div>
                                        
                    <div className="form-submit">
                        <input
                            type="submit"
                            value="EDITAR RESTAURANTE"
                            
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default EditRestaurant;