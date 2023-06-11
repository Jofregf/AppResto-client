import { useState, useCallback} from "react"
import { useDispatch, useSelector } from "react-redux"
import {useParams, useNavigate} from "react-router-dom"
import { useForm } from 'react-hook-form';
import {updateBookingUser} from "../../redux/actions/bookingActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

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

function EditBooking(){

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;
    const bookingsData = useSelector((state) => state.bookings.bookings);
    const navigate = useNavigate();
    const {id} = useParams();
    const booking = bookingsData.filter( book => book.bookingId === id)

    const [preloadedValues, setPreloadedValues] = useState({
        bookingDate: booking[0]?.bookingDate || "",
        bookingTime: booking[0]?.bookingTime || "",
        bookingPartySize: booking[0]?.bookingPartySize || "",
    });

    const formOptions = { resolver: yupResolver(formSchema), defaultValues: preloadedValues };
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions);
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitCallback = useCallback(
        (data) => {
            dispatch(updateBookingUser({token: tokenUser, idBooking:id, data}));
            setTimeout(() => {
                navigate(`/reservas`);
            }, 1000);
        },[dispatch, id, tokenUser, navigate]
    );
    
    const onSubmit = (data) => {
        handleSubmitCallback && handleSubmitCallback(data);
        setIsSubmitting(true);
    };

    const handleCancel = () => {
        navigate("/reservas");
    }

    return (
        <div>
            <div className="container-register-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-index">
                        <div className="form-container">
                            <div className="title">Editar reserva</div>
                            <div className="form-group-one">
                                <div className="labelAndInput">
                                    <label className="input-label">*Fecha: </label>
                                    <input
                                        className="input-register"
                                        type="date"
                                        name="bookingDate"
                                        defaultValue={preloadedValues.bookingDate}
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
                                        defaultValue={preloadedValues.bookingTime}
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
                                        defaultValue={preloadedValues.bookingPartySize}
                                        {...register('bookingPartySize')}
                                    />
                                    {<div className="form-register-errors">{errors.bookingPartySize?.message}</div>}
                                </div>
                            </div>
                            <div className="form-submit">
                                <Button 
                                    variant="outline" 
                                    className="custom-button"
                                    type="submit" 
                                    value="EDITAR RESERVA"
                                >
                                    Editar Reserva
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            <div>
                    <Button 
                        onClick={handleCancel}
                        variant="outline" 
                        className="custom-button"
                    >
                        Cancelar
                    </Button>
            </div>
            </div>
        </div>
    );
}

export default EditBooking;
