import {useState, useEffect }  from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import './index.css';
import Cookies from "universal-cookie";
import { TiArrowBack } from 'react-icons/ti';
import {Link} from 'react-router-dom'
import { getUserById, editPassword } from "../../redux/actions/userActions";
import {Modal, Button} from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const formSchema = Yup.object().shape({
    userPassword: Yup.string()
        .required("Este campo es requerido")
        .max(80, "Máximo 16 carácteres")
        .min(6, "Mínimo 6 carácteres")
        .matches(
            RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
            "Incluir número, mayúscula y minúscula"
        ),
});

const formOptions = { resolver: yupResolver(formSchema) };

function EditPassword() {

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [modal, setModal] = useState("")
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value)
        handleShow()
    }

    const handlemodal=()=>{
        navigate("/usuario/perfil")
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {register, formState: { errors }, handleSubmit, reset} = useForm(formOptions);
    
    useEffect(() => {
        dispatch(getUserById({token:tokenUser }))
    },[dispatch, tokenUser])

    function messageConfirm(data) {
        dispatch(editPassword({...data, token: tokenUser}))
        setTimeout(() => {
            modalDelete("Contraseña modificada")
        }, 1100)
    }

    const onSubmit = (data) => {
        messageConfirm(data);
        reset();
    };

            
    return (
        <div className="container-register-form">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="container-pass-edit">
                    <div className="form-container-pass">
                        <div>
                            <Link to='/user/profile' style={{ color: 'white', fontSize: '20px' }}>
                            <TiArrowBack/>
                            </Link>
                        </div>
                        <div className="title">Modificar mi Contraseña</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Password: </label>
                                <label>*Contraseña</label>
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="userPassword" 
                                    {...register("userPassword")} 
                                />
                                {showPassword ? (
                                    <RiEyeOffFill onClick={togglePasswordVisibility} />
                                ) : (
                                    <RiEyeFill onClick={togglePasswordVisibility} />
                                )}
                                {<div>{errors.userPassword?.message}</div>}
                            </div>
                        </div>
                        <div className="form-submit">
                            <Button
                                variant="outline" 
                                className="custom-button"
                                type="submit"
                                value="EDITAR"
                            >
                                Editar
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
                    <Modal.Title>Modificacion exitosa!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="outline" 
                        className="custom-button" 
                        onClick={handlemodal} 
                    >
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditPassword;