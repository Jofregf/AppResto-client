import {getRestoByUser, editRestaurant} from "../../redux/actions/restaurantActions";
import { useEffect, useState, useCallback} from "react"
import { useDispatch } from "react-redux"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Cookies from "universal-cookie";
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
        .max(250, "Máximo 250 carácteres")
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

function EditRestaurant({ activeDrawer, handleHome, restaurante }) {
    console.log("ME LLAMO");
    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;

    const [preloadedValues, setPreloadedValues] = useState({
        restaurantName: restaurante?.restaurantName,
        restaurantAddress: restaurante?.restaurantAddress,
        restaurantPhone: restaurante?.restaurantPhone,
        restaurantEmail: restaurante?.restaurantEmail,
        restaurantDescription: restaurante?.restaurantDescription,
        restaurantImages: restaurante?.restaurantImages,
        restaurantCapacity: restaurante?.restaurantCapacity,
        openingHoursRestaurant: restaurante?.openingHoursRestaurant,
        closingHoursRestaurant: restaurante?.closingHoursRestaurant,
    });

    const [imageUrls, setImageUrls] = useState(
        preloadedValues.restaurantImages
    );
    const [numImageFields, setNumImageFields] = useState(
        preloadedValues.restaurantImages.length
    );

    const formOptions = {
        resolver: yupResolver(formSchema),
        defaultValues: preloadedValues,
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(formOptions);

    useEffect(() => {
        console.log("dispatch useefect")
        dispatch(getRestoByUser({ token: tokenUser }));
    }, [dispatch, tokenUser]);

    const handleSubmitCallback = useCallback(
        (data) => {
            dispatch(
                editRestaurant({
                    token: tokenUser,
                    id: restaurante.restaurantId,
                    data,
                })
            );
        },
        [dispatch, restaurante, tokenUser]
    );
    // ver el useeffect
    useEffect(() => {
        console.log("preloadvalues useefect")
        setPreloadedValues({
            restaurantName: restaurante?.restaurantName,
            restaurantAddress: restaurante?.restaurantAddress,
            restaurantPhone: restaurante?.restaurantPhone,
            restaurantEmail: restaurante?.restaurantEmail,
            restaurantDescription: restaurante?.restaurantDescription,
            restaurantImages: imageUrls,
            restaurantCapacity: restaurante?.restaurantCapacity,
            openingHoursRestaurant: restaurante?.openingHoursRestaurant,
            closingHoursRestaurant: restaurante?.closingHoursRestaurant,
        });
    }, [restaurante, imageUrls]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        console.log("if useefect")
        if (isSubmitting) {
            handleSubmitCallback && handleSubmitCallback(preloadedValues);
            setIsSubmitting(false);
        }
    }, [preloadedValues, handleSubmitCallback, isSubmitting]);

    const onSubmit = (data) => {
        handleSubmit((data) => {
            dispatch(
                editRestaurant({
                    token: tokenUser,
                    id: restaurante.restaurantId,
                    data,
                })
            );
            setIsSubmitting(true);
            setTimeout(() => {
                handleHome();
                activeDrawer();
                dispatch(getRestoByUser({ token: tokenUser }));
            }, 500);
        })(data);
    };
    const handleAddField = () => {
        setNumImageFields((prevNumFields) => prevNumFields + 1);
        setImageUrls((prevImageUrls) => [...prevImageUrls, ""]);
    };

    return (
        <div className="container-register-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container-index">
                    <div className="form-container">
                        <div className="title">Editar restaurante</div>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Nombre: </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="restaurantName"
                                    defaultValue={
                                        preloadedValues.restaurantName
                                    }
                                    {...register("restaurantName")}
                                />
                                {
                                    <div className="form-register-errors">
                                        {errors.restaurantName?.message}
                                    </div>
                                }
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">
                                    *Dirección:{" "}
                                </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="restaurantAddress"
                                    defaultValue={
                                        preloadedValues.restaurantAddress
                                    }
                                    {...register("restaurantAddress")}
                                />
                                {
                                    <div className="form-register-errors">
                                        {errors.restaurantAddress?.message}
                                    </div>
                                }
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">
                                    *Teléfono:{" "}
                                </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="restaurantPhone"
                                    defaultValue={
                                        preloadedValues.restaurantPhone
                                    }
                                    {...register("restaurantPhone")}
                                />
                                {
                                    <div className="form-register-errors">
                                        {errors.restaurantPhone?.message}
                                    </div>
                                }
                            </div>
                            <div className="input-small">
                                <div className="labelAndInput-small">
                                    <label className="input-label">
                                        *Email:{" "}
                                    </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="restaurantEmail"
                                        defaultValue={
                                            preloadedValues.restaurantEmail
                                        }
                                        {...register("restaurantEmail")}
                                    />
                                    {
                                        <div className="form-register-errors">
                                            {errors.restaurantEmail?.message}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="labelAndInput">
                                <label className="input-label">
                                    *Descripción:{" "}
                                </label>
                                <input
                                    className="input-register"
                                    type="text"
                                    name="restaurantDescription"
                                    defaultValue={
                                        preloadedValues.restaurantDescription
                                    }
                                    {...register("restaurantDescription")}
                                />
                                {
                                    <div className="form-register-errors">
                                        {errors.restaurantDescription?.message}
                                    </div>
                                }
                            </div>
                            <div>
                                <div>
                                    <label>*Imágenes: </label>
                                    {imageUrls &&
                                        imageUrls.map((image, index) => (
                                            <div
                                                key={`restaurantImages[${index}]`}
                                            >
                                                <input
                                                    type="text"
                                                    name={`restaurantImages[${index}]`}
                                                    defaultValue={image}
                                                    {...register(
                                                        `restaurantImages[${index}]`
                                                    )}
                                                    onChange={(e) => {
                                                        const newImageUrls = [
                                                            ...imageUrls,
                                                        ];
                                                        newImageUrls[index] =
                                                            e.target.value;
                                                        setImageUrls(
                                                            newImageUrls
                                                        );
                                                    }}
                                                />
                                                {index !== 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setImageUrls(
                                                                (prevUrls) =>
                                                                    prevUrls.filter(
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i !==
                                                                            index
                                                                    )
                                                            )
                                                        }
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                )}
                                                {errors.restaurantImages?.[
                                                    index
                                                ] && (
                                                    <span>
                                                        {
                                                            errors
                                                                .restaurantImages[
                                                                index
                                                            ].message
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    <button
                                        type="button"
                                        onClick={handleAddField}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <div className="input-small">
                                <div className="labelAndInput-small">
                                    <label className="input-label">
                                        *Capacidad:{" "}
                                    </label>
                                    <input
                                        className="input-register"
                                        type="number"
                                        name="restaurantCapacity"
                                        defaultValue={
                                            preloadedValues.restaurantCapacity
                                        }
                                        {...register("restaurantCapacity")}
                                    />
                                    {
                                        <div className="form-register-errors">
                                            {errors.restaurantCapacity?.message}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="input-small">
                                <div className="labelAndInput-small">
                                    <label className="input-label">
                                        *Horario apertura:{" "}
                                    </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="openingHoursRestaurant"
                                        defaultValue={
                                            preloadedValues.openingHoursRestaurant
                                        }
                                        {...register("openingHoursRestaurant")}
                                    />
                                    {
                                        <div className="form-register-errors">
                                            {
                                                errors.openingHoursRestaurant
                                                    ?.message
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="input-small">
                                <div className="labelAndInput-small">
                                    <label className="input-label">
                                        *Horario cierre:{" "}
                                    </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="closingHoursRestaurant"
                                        defaultValue={
                                            preloadedValues.closingHoursRestaurant
                                        }
                                        {...register("closingHoursRestaurant")}
                                    />
                                    {
                                        <div className="form-register-errors">
                                            {
                                                errors.closingHoursRestaurant
                                                    ?.message
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-submit">
                            <button type="submit" value="EDITAR RESTAURANTE">
                                Editar Restaurante
                            </button>
                        </div>
                        <div>
                            <button onClick={handleHome}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditRestaurant;