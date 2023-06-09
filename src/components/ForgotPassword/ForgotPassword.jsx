import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/userActions";

const formSchema = Yup.object().shape({
    usernameOrEmail: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácter")
        .test(
            "username-or-email",
            "El valor ingresado no es válido",
            (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                /^[a-zA-Z0-9_.-]+$/.test(value)
        ),
});

const formOptions = { resolver: yupResolver(formSchema) };

function ForgotPassword() {
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm(formOptions);
    let dispatch = useDispatch();
    const [msg, setMsg] = useState("");

    const onSubmit = async (usernameOrEmail) => {
        console.log(usernameOrEmail);
        dispatch(forgotPassword({ usernameOrEmail }));
        setMsg(
            "Te recomendamos que al usar la contraseña, la cambies para mayor seguridad!"
        );
        reset();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setMsg("");
            navigate("/auth/login");
        }, 5000);
        return () => clearTimeout(timer);
    }, [msg, navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-login-container">
                <div className="login-container">
                    <div className="title-login">
                        Ingresá tu email o usuario
                    </div>
                    <div className="form-group-login">
                        <div className="login-labelAndInput">
                            <input
                                className="input-login"
                                type="text"
                                name="usernameOrEmail"
                                {...register("usernameOrEmail")}
                            />
                            {msg && (
                                <p
                                    className={
                                        msg
                                            ? "newsletter_agregado_landing"
                                            : "producto_sinagregar"
                                    }
                                >
                                    {msg}
                                </p>
                            )}
                            {errors.usernameOrEmail && (
                                <div className="form-register-errors">
                                    {errors.usernameOrEmail.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="register-btn">
                        <button
                            className="input-Login"
                            type="submit"
                            value="Enviar nueva contraseña"
                        >
                            Enviar contraseña
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ForgotPassword;
