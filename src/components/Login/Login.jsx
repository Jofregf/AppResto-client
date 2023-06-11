import {useEffect, useState} from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {userLogin} from "../../redux/actions/userActions"
import {Button} from "react-bootstrap"


const formSchema = Yup.object().shape({
    
    usernameOrEmail: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácter")
        .test(
            "username-or-email",
            "El valor ingresado no es válido",
            (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || /^[a-zA-Z0-9_.-]+$/.test(value)
        ),
    password: Yup.string()
        .required("Este campo es requerido")
})

const formOptions = { resolver: yupResolver(formSchema) };

function Login() {
    
    const navigate = useNavigate();

    const {register, formState: {errors}, handleSubmit } = useForm(formOptions);

    const statusState = useSelector((state) => state.users.status);
    const dispatch = useDispatch();

    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async(data) => {
        dispatch(userLogin(data));
        setErrorMsg("");
    };

    useEffect(() => {        
        if (statusState?.msg === "successful login") {
            navigate("/restaurantes");
        } else if (statusState === "Bad credentials"){
            setErrorMsg("Usuario o contraseña incorrectos");
        }
    }, [statusState, navigate]);

    const handleRegister = () => {
        navigate("/auth/registro")
    }

    const handleRecovery = () => {
        navigate('/usuario/olvidarpassword');
    }

    useEffect(() => {
        if (errorMsg !== "") {
            setTimeout(() => {
                setErrorMsg("");
            }, 5000);
        }
    }, [errorMsg]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email o usuario</label>
                    <input
                        type="text"
                        name="usernameOrEmail"
                        {...register("usernameOrEmail")}
                    />
                    {<div className="form-register-errors">{errors.usernameOrEmail?.message}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        {...register("password")}
                    />
                    {<div className="form-register-errors">{errors.password?.message}</div>}
                </div>
                <p className="error-message">{errorMsg}</p>
                <Button 
                    type="submit"
                    value="Ingresar"
                    variant="outline" 
                    className="custom-button"
                >
                    Ingresar    
                </Button>
                <Button variant="outline" className="custom-button" onClick={handleRegister}>
                    Registrarse
                </Button>
                <div className="recover-pwd">
                    <Button variant="outline" className="custom-button" onClick={handleRecovery}>
                        ¿Olvidaste tu contraseña?
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login