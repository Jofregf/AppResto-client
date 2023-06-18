import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { editUser, getUserById } from "../../redux/actions/userActions";
import "./EditUser.css";
import { TiArrowBack } from 'react-icons/ti';

function validate(input) {
    let errors = {};
    if (
        !/^[a-z A-Z]+$/.test(input.userName) ||
        input.userName?.length < 3 ||
        input.userName?.length > 50
    ) {
        errors.userName = "*Campo requerido";
    }
    if (
        !/^[a-z A-Z]+$/.test(input.firstName) ||
        input.firstName?.length < 3 ||
        input.firstName?.length > 50
    ) {
        errors.firstName = "*Campo requerido, no puede tener números";
    }
    if (
        !/^[a-z A-Z]+$/.test(input.lastName) ||
        input.lastName?.length < 3 ||
        input.lastName?.length > 50
    ) {
        errors.lastName = "*Campo requerido, no puede tener números";
    }
    if (
        !/^[0-9]+$/.test(input.userPhone) ||
        input.userPhone?.length < 10 ||
        input.userPhone?.length > 50
    ) {
        errors.userPhone = "*Debe tener como mínimo 10 dígitos";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(input.userEmail)) {
        errors.userEmail = "*Debe registrar un email válido";
    }
    return errors;
}

function EditUser() {

    let cookie = new Cookies();
    const userEdit = useSelector((state) => state.users.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        userName: userEdit.user?.userName || "",
        firstName: userEdit.user?.firstName || "",
        lastName: userEdit.user?.lastName || "",
        userEmail: userEdit.user?.userEmail || "",
        userPhone: userEdit.user?.userPhone || "",
    });
    const tokenUser = cookie.get("user")?.accessToken;

    useEffect(() => {
        dispatch(getUserById({ token: tokenUser }));
    }, [dispatch, tokenUser]);

    function handlerOnChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    const [modal, setModal] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modalTitle, setModalTitle] = useState("Modificación exitosa!!");
    const modalDelete = (value) => {
        setModal(value);
        handleShow();
    };

    const handlemodal = () => {
        navigate("/inicio");
    };

    function onSubmit(e) {
        e.preventDefault();
        if (
            !input.userName ||
            !input.firstName ||
            !input.lastName ||
            !input.userEmail ||
            !input.userPhone
        ) {
            modalDelete("No completó todo el formulario!");
        } else {
            const errors = validate(input);
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                setModalTitle("Hay errores en sus datos");
                modalDelete("Hay errores en el formulario");
            } else {
                dispatch(editUser({ ...input, token: tokenUser }));
                modalDelete("Datos actualizados");
                setInput({
                    userName: "",
                    firstName: "",
                    lastName: "",
                    userEmail: "",
                    userPhone: "",
                });
            }
        }
    }

    return (
        <div className="container-register-form">
            <form onSubmit={onSubmit}>
                <div className="container-user-edit">
                    <div className="form-container-edit">
                        <div>
                            <Link to='/usuario/perfil' style={{ color: "#D8F3FF", fontSize: '20px' }}>
                            <TiArrowBack/>
                            </Link>
                        </div>
                        <div>
                            <p className="register-subtitle">
                                (* Tiene los datos para ayudarlo a cambiarlos si desea, y si no desea debe sobreescribirlos)
                            </p>
                        </div>
                        <div className="title"> Mis datos</div>
                        <p className="register-subtitle">
                            (* campos requeridos)
                        </p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">
                                    *Nombre de usuario:{" "}
                                </label>
                                <input
                                    onChange={handlerOnChange}
                                    className="input-register"
                                    type="text"
                                    name="userName"
                                    value={input.userName}
                                    placeholder={userEdit?.userName}
                                />
                                {errors.userName && (
                                    <p className="form-register-errors">
                                        {errors.userName}
                                    </p>
                                )}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre: </label>
                                <input
                                    onChange={handlerOnChange}
                                    className="input-register"
                                    type="text"
                                    name="firstName"
                                    value={input.firstName}
                                    placeholder={userEdit?.firstName}
                                />
                                {errors.firstName && (
                                    <p className="form-register-errors">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">
                                    *Apellido:{" "}
                                </label>
                                <input
                                    onChange={handlerOnChange}
                                    className="input-register"
                                    type="text"
                                    name="lastName"
                                    value={input.lastName}
                                    placeholder={userEdit?.lastName}
                                />
                                {errors.lastName && (
                                    <p className="form-register-errors">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">*Email: </label>
                                <input
                                    onChange={handlerOnChange}
                                    className="input-register"
                                    type="text"
                                    name="userEmail"
                                    value={input.userEmail}
                                    placeholder={userEdit?.userEmail}
                                />
                                {errors.userEmail && (
                                    <p className="form-register-errors">
                                        {errors.userEmail}
                                    </p>
                                )}
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">
                                    *Celular:{" "}
                                </label>
                                <input
                                    onChange={handlerOnChange}
                                    className="input-register"
                                    type="text"
                                    name="userPhone"
                                    value={input.userPhone}
                                    placeholder={userEdit?.userPhone}
                                />
                                {errors.userPhone && (
                                    <p className="form-register-errors">
                                        {errors.userPhone}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="form-submit">
                            <Button 
                                type="submit" 
                                variant="outline" 
                                className="custom-button"
                            >
                                Actualizar
                            </Button>
                            <Link to="/inicio">
                                <Button 
                                    variant="outline" 
                                    className="custom-button"
                                >
                                    Inicio
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
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modal}</Modal.Body>
                <Modal.Footer>
                    <button onClick={handlemodal}>Continuar</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditUser;