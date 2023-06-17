import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useDispatch } from "react-redux"
import Cookies from "universal-cookie";
import { createRestaurant } from "../../redux/actions/restaurantActions";
import { Modal, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from 'react-icons/fa';


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


function CreateRestaurant(){

    const formOptions = { resolver: yupResolver(formSchema) };

    const { register, formState: { errors }, handleSubmit, reset } = useForm(formOptions);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const [modal, setModal] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (data) => {
        setModal(data);
        handleShow();
    }

    const handleModal = () => {
        navigate("/inicio")
    }

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;
    const cookieRole = cookie.get("user")?.role

    const [numImageFields, setNumImageFields] = useState(1);
    const [imageUrls, setImageUrls] = useState([""]);

    const handleAddField = () => {
        setNumImageFields(numImageFields + 1);
        setImageUrls([...imageUrls, ""]);
    };

    const handleRemoveField = (index) => {
        setNumImageFields(numImageFields - 1);
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        setImageUrls(newImageUrls);
    };
    
    function messageConfirm(data) {
        dispatch(createRestaurant({ ...data, token: tokenUser }));
        setTimeout(() => {
            modalDelete("Restaurant Creado")
        }, 1100)
    }

    const onSubmit = (data) => {
        messageConfirm({ ...data, restaurantImages: imageUrls });
        reset();
    };

    return(
        (cookieRole === "ROLE_RESTO")?
            <div className="container-register-form-admin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-index">
                        <div className="form-container">
                            <div className="title">Crear Restaurant</div>
                            <p className="register-subtitle">(* campos requeridos)</p>
                            <div className="form-group-one">
                                <div className="labelAndInput">
                                    <label className="input-label">*Nombre: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="restaurantName"
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
                                <div className="labelAndInput">
                                    <label className="input-label">*Email: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="restaurantEmail"
                                        {...register("restaurantEmail")}
                                        />
                                    {<div className="form-register-errors">{errors.restaurantEmail?.message}</div>}
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
                                {Array.from({ length: numImageFields }).map((_, index) => (
                                <div key={index}>
                                    <label className="input-label">*Imagen: </label>
                                    <input
                                    type="text"
                                    {...register(`restaurantImages[${index}]`)}
                                    value={imageUrls[index]}
                                    onChange={(e) => {
                                        const newImageUrls = [...imageUrls];
                                        newImageUrls[index] = e.target.value;
                                        setImageUrls(newImageUrls);
                                    }}
                                    />
                                    {index === numImageFields - 1 && (
                                        <Button 
                                            type="button" 
                                            onClick={handleAddField}
                                            variant="outline" 
                                            className="custom-button btn-sm"
                                        >
                                            <FaPlus />
                                        </Button>
                                    )}
                                    {index !== 0 && (
                                        <Button 
                                            type="button" 
                                            onClick={() => handleRemoveField(index)}
                                            variant="outline" 
                                            className="custom-button btn-sm"
                                        >
                                            <FaMinus />
                                        </Button>
                                    )}
                                    {errors.restaurantImages?.[index] && (
                                    <span>{errors.restaurantImages[index].message}</span>
                                    )}
                                </div>
                                ))}
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
                                <div className="labelAndInput">
                                    <label className="input-label">*Horario de apertura: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="openingHoursRestaurant"
                                        {...register("openingHoursRestaurant")}
                                    />
                                    {<div className="form-register-errors">{errors.openingHoursRestaurant?.message}</div>}
                                </div>
                                <div className="labelAndInput">
                                    <label className="input-label">*Horario de cierre: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="closingHoursRestaurant"
                                        {...register("closingHoursRestaurant")}
                                    />
                                    {<div className="form-register-errors">{errors.closingHoursRestaurant?.message}</div>}
                                </div>
                            </div>
                            <div className="form-submit">
                                <Button
                                    type="submit"
                                    value="CREAR RESTAURANT"
                                    variant="outline" 
                                    className="custom-button"
                                >
                                    Crear
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard="false"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Restaurant Creado!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modal}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="outline" 
                            className="custom-button btn-sm"
                            onClick={handleModal}
                        >
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        : "usuario sin permiso"
            
    )
}

export default CreateRestaurant;