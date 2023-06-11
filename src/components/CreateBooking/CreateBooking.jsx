import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link} from "react-router-dom";
import { useState } from "react"
import { useDispatch } from "react-redux"
import Cookies from "universal-cookie";
import { createBooking } from "../../redux/actions/bookingActions";
import { Modal, Button } from "react-bootstrap";


const formSchema = Yup.object().shape({
    bookingDate: Yup.date().required('Ingresa una fecha válida'),
    bookingTime: Yup.string()
        .required("Este campo es requerido")
        .matches(RegExp(/^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/), "Ingresar una hora válida en formato HH:mm:ss"),
    bookingPartySize: Yup.number()
        .required("Este campo es requerido")
        .max(30, "Máximo 30 personas")
        .min(2, "Mínimo 2 personas"),
});


function CreateBooking(){

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
        navigate(`/restaurantes/${id}`)
    }

    const modalDelete = (data) => {
        setModal(data);
        handleShow();
    }

    let cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken;

    const onSubmit = (data) => {
        dispatch(createBooking({ ...data, token: tokenUser, id: id}));
        setTimeout(() => {
            modalDelete("Reserva realizada")
        }, 1100)
    }

    return (
        
            <div className="container-register-form-admin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-index">
                        <div className="form-container">
                            <div className="title">Reserva</div>
                            <p className="register-subtitle">(* campos requeridos)</p>
                            <div className="form-group-one">
                                <div className="labelAndInput">
                                    <label className="input-label">*Fecha: </label>
                                    <input
                                        className="input-register"
                                        type="date"
                                        name="bookingDate"
                                        {...register("bookingDate")}
                                    />
                                    {<div className="form-register-errors">{errors.bookingDate?.message}</div>}
                                </div>
                                <div className="labelAndInput">
                                    <label className="input-label">*Hora: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="bookingTime"
                                        {...register("bookingTime")}
                                        />
                                    {<div className="form-register-errors">{errors.bookingTime?.message}</div>}
                                </div>
                                <div className="labelAndInput">
                                    <label className="input-label">*Número de personas: </label>
                                    <input
                                        className="input-register"
                                        type="number"
                                        name="bookingPartySize"
                                        {...register('bookingPartySize')}
                                    />
                                    {<div className="form-register-errors">{errors.bookingPartySize?.message}</div>}
                                </div>
                            </div>
                            <div className="form-submit">
                                <Button
                                    type="submit"
                                    value="RESERVAR"
                                    variant="outline" 
                                    className="custom-button"  
                                >
                                    RESERVAR
                                </Button>
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
                        <Modal.Title>Reserva Realizada!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modal}
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleModal}>Continuar</button>
                    </Modal.Footer>
                </Modal>
            </div>
    )
}

export default CreateBooking;