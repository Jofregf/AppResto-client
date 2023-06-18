import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { createUser, userLogin } from "../../redux/actions/userActions";
import { Modal, Button } from "react-bootstrap";
import "./Register.css";

const formSchema = Yup.object().shape({
    userName: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres"),
    firstName: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres")
        .matches(RegExp(/^[a-z A-Z]+$/), "El nombre debe tener solo letras"),
    lastName: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres")
        .matches(RegExp(/^[a-z A-Z]+$/), "El apellido debe tener solo letras"),
    userPhone: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(10, "Mínimo 10 carácteres"),
    userEmail: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(8, "Mínimo 8 carácteres")
        .matches(
            RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
            "El email no es válido"
        ),
    confirmEmail: Yup.string()
        .required("Este campo es requerido")
        .oneOf([Yup.ref("userEmail")], "El email ingresado no coincide "),
    userPassword: Yup.string()
        .required("Este campo es requerido")
        .max(80, "Máximo 16 carácteres")
        .min(6, "Mínimo 6 carácteres")
        .matches(
            RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
            "Incluir número, mayúscula y minúscula"
        ),
    confirmPassword: Yup.string()
        .required("Este campo es requerido")
        .oneOf([Yup.ref("userPassword")], "La contraseña ingresada no coincide"),
});

const formOptions = { resolver: yupResolver(formSchema) };

function Register() {
    
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

    const {register, formState: { errors }, handleSubmit, reset} = useForm(formOptions);

    function messageConfirm(data) {
        dispatch(createUser({ ...data }));
        setTimeout(() => {
            dispatch(userLogin({usernameOrEmail: data.usernameOrEmail, password: data.password}))
        }, 1000);
        setTimeout(() => {
            modalDelete("Gracias!!")
        }, 1100)
    }

    const onSubmit = (data) => {
        messageConfirm(data);
        reset();
    };

    return (
        <div className="container-register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container-index">
                    <div className="form-container">
                        <div className="title"> Registrarme</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre de usuario</label>
                                <input 
                                    className="input-register"
                                    type="text" 
                                    name="userName" 
                                    {...register("userName")} 
                                />
                                {<div className="form-register-errors">{errors.userName?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre</label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="firstName"
                                    {...register("firstName")}
                                />
                                {<div className="form-register-errors">{errors.firstName?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Apellido</label>
                                <input
                                    className="input-register"
                                    type="text" 
                                    name="lastName" 
                                    {...register("lastName")} 
                                />
                                {<div className="form-register-errors">{errors.lastName?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Teléfono</label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="userPhone"
                                    {...register("userPhone")}
                                />
                                {<div className="form-register-errors">{errors.userPhone?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*email</label>
                                <input 
                                    className="input-register"
                                    type="text" 
                                    name="userEmail" 
                                    {...register("userEmail")} 
                                />
                                {<div className="form-register-errors">{errors.userEmail?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Confirmar email</label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="confirmEmail"
                                    {...register("confirmEmail")}
                                />
                                {<div className="form-register-errors">{errors.confirmEmail?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Contraseña</label>
                                <input 
                                    className="input-register"
                                    type="password" 
                                    name="userPassword" 
                                    {...register("userPassword")} 
                                />
                                {<div className="form-register-errors">{errors.userPassword?.message}</div>}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Confirmar contraseña</label>
                                <input
                                    className="input-register"
                                    type="password"
                                    name="confirmPassword"
                                    {...register("confirmPassword")}
                                />
                                {<div className="form-register-errors">{errors.confirmPassword?.message}</div>}
                            </div>
                        </div>                      
                        <div className="TyC">
                            Al crear su cuenta acepta los Términos y Condiciones
                        </div>
                        <div className="form-submit">
                            <Button
                                type="submit"
                                value="Crear mi cuenta"    
                                variant="outline" 
                                className="custom-button"
                            >
                                Crear mi cuenta
                            </Button>    
                        </div>
                    </div>
                </div>
            </form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registro exitoso!</Modal.Title>
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
    );
}

export default Register;