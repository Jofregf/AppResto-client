import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "universal-cookie";
import { createMenu } from "../../redux/actions/menuActions";
import { Modal, Button } from "react-bootstrap";

const formSchema = Yup.object().shape({
    menuName: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres"),
    menuDescription: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(10, "Mínimo 10 carácteres"),
    menuImage: Yup.string()
        .required("Este campo es requerido")
        .max(255, "Máximo 255 carácteres")
        .matches(RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/), "Ingresar formato URL"),
});


function CreateMenu(){
    const formOptions = { resolver: yupResolver(formSchema) };

    const { register, formState: { errors }, handleSubmit, reset } = useForm(formOptions);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();
    
    const [modal, setModal] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleModal = () => {
        navigate(`/menus/restaurantes/${id}`)
    }

    const modalDelete = (data) => {
        setModal(data);
        handleShow();
    }

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;
    const cookieRole = cookie.get("user")?.role

    const onSubmit = (data) => {
        dispatch(createMenu({ ...data, token: tokenUser, id: id}));
        setTimeout(() => {
            modalDelete("Menú Creado")
        }, 1100)
    }

    return (
        (cookieRole === "ROLE_RESTO")?
            <div className="container-register-form-admin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-index">
                        <div className="form-container">
                            <div className="title">Crear Menú</div>
                            <p className="register-subtitle">(* campos requeridos)</p>
                            <div className="form-group-one">
                                <div className="labelAndInput">
                                    <label className="input-label">*Nombre: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="menuName"
                                        {...register("menuName")}
                                    />
                                    {<div className="form-register-errors">{errors.menuName?.message}</div>}
                                </div>
                                <div className="labelAndInput">
                                    <label className="input-label">*Descripción: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="menuDescription"
                                        {...register("menuDescription")}
                                        />
                                    {<div className="form-register-errors">{errors.menuDescription?.message}</div>}
                                </div>
                                <div className="labelAndInput">
                                    <label className="input-label">*URL de imagen: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="menuImage"
                                        {...register('menuImage')}
                                    />
                                    {<div className="form-register-errors">{errors.menuImage?.message}</div>}
                                </div>
                            </div>
                            <div className="form-submit">
                                <Button
                                    type="submit"
                                    value="CREAR MENÚ"
                                    variant="outline" 
                                    className="custom-button"
                                >Crear</Button>
                            </div>
                            <div>
                                <Link to={`/resto`} style={{ textDecoration: 'none' }}>
                                    <Button 
                                        variant="outline" 
                                        className="custom-button"
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
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
                        <Modal.Title>Menú Creado!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modal}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="outline" 
                            className="custom-button"
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

export default CreateMenu;