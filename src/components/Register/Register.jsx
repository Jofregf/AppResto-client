import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { createUser, userLogin } from "../../redux/actions/userActions";
import { Modal, Button } from "react-bootstrap";

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
        navigate("/restaurants")
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div> Registrarme</div>
                <p>(* campos requeridos)</p>
                <label>*Nombre de usuario</label>
                <input 
                    type="text" 
                    name="userName" 
                    {...register("userName")} 
                />
                {<div>{errors.userName?.message}</div>}
                <label>*Nombre</label>
                <input
                    type="text"
                    name="firstName"
                    {...register("firstName")}
                />
                {<div>{errors.firstName?.message}</div>}
                <label>*Apellido</label>
                <input 
                    type="text" 
                    name="lastName" 
                    {...register("lastName")} 
                />
                {<div>{errors.lastName?.message}</div>}
                <label>*Teléfono</label>
                <input
                    type="text"
                    name="userPhone"
                    {...register("userPhone")}
                />
                {<div>{errors.userPhone?.message}</div>}
                <label>*email</label>
                <input 
                    type="text" 
                    name="userEmail" 
                    {...register("userEmail")} 
                />
                {<div>{errors.userEmail?.message}</div>}
                <label>*Confirmar email</label>
                <input
                    type="text"
                    name="confirmEmail"
                    {...register("confirmEmail")}
                />
                {<div>{errors.confirmEmail?.message}</div>}
                <label>*Contraseña</label>
                <input 
                    type="password" 
                    name="userPassword" 
                    {...register("userPassword")} 
                />
                {<div>{errors.userPassword?.message}</div>}
                <label>*Confirmar contraseña</label>
                <input
                    type="password"
                    name="confirmPassword"
                    {...register("confirmPassword")}
                />
                {<div>{errors.confirmPassword?.message}</div>}
                <div>
                    Al crear su cuenta acepta los Términos y Condiciones
                </div>
                <div>
                    <input
                        type="submit"
                        value="Crear mi cuenta"    
                    />    
                </div>
            </form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard="false"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Registro exitoso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModal}>Continuar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Register;