import { useEffect, useState, useCallback} from "react"
import { useDispatch, useSelector } from "react-redux"
import {useParams, useNavigate} from "react-router-dom"
import { useForm } from 'react-hook-form';
import {editMenu} from "../../redux/actions/menuActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

const formSchema = Yup.object().shape({
    menuName: Yup.string()
        .required("Este campo es requerido")
        .max(50, "Máximo 50 carácteres")
        .min(3, "Mínimo 3 carácteres"),
    menuDescription: Yup.string()
        .required("Este campo es requerido")
        .max(255, "Máximo 255 carácteres")
        .min(10, "Mínimo 10 carácteres"),
    menuImage: Yup.string()
        .required("Este campo es requerido")
        .max(255, "Máximo 255 carácteres")
        .matches(RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/), "Ingresar formato URL"),
});

function EditMenu() {

    const dispatch = useDispatch();
    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;
    const menuData = useSelector((state) => state.menus.menus);
    const navigate = useNavigate();
    const {idMenu, id} = useParams();

    const menu = menuData.filter( men => men.menuId === idMenu)
    
    const [preloadedValues, setPreloadedValues] = useState({
        menuName: menu[0]?.menuName || "",
        menuDescription: menu[0]?.menuDescription || "",
        menuImage: menu[0]?.menuImage || "",
    });

    const [formData, setFormData] = useState({});
    const formOptions = { resolver: yupResolver(formSchema), defaultValues: preloadedValues };
    const { register, formState: { errors }, handleSubmit } = useForm(formOptions);
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitCallback = useCallback(
        (data) => {
            dispatch(editMenu({token: tokenUser, idMenu:idMenu, idResto:id, data}));
            setTimeout(() => {
                navigate(`/menus/restaurantes/${id}`);
            }, 1000);
        },[dispatch, idMenu, id, tokenUser, navigate]
    );
    
    const onSubmit = (data) => {
        handleSubmitCallback && handleSubmitCallback(data);
        setIsSubmitting(true);
    };

    const handleCancel = () => {
        navigate("/resto");
    }

    return (
        <div>
            <div className="container-register-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-index">
                        <div className="form-container">
                            <div className="title">Editar menú</div>
                            <div className="form-group-one">
                                <div className="labelAndInput">
                                    <label className="input-label">*Nombre: </label>
                                    <input
                                        className="input-register"
                                        type="text"
                                        name="menuName"
                                        defaultValue={preloadedValues.menuName}
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
                                        defaultValue={preloadedValues.menuDescription}
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
                                        defaultValue={preloadedValues.menuImage}
                                        {...register('menuImage')}
                                    />
                                    {<div className="form-register-errors">{errors.menuImage?.message}</div>}
                                </div>
                            </div>
                            <div className="form-submit">
                                <Button 
                                    type="submit" 
                                    value="EDITAR MENU"
                                    variant="outline" 
                                    className="custom-button"
                                >
                                    Editar Menú
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            <div>
                    <Button 
                        variant="outline" 
                        className="custom-button"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
            </div>
            </div>
        </div>
    );
}

export default EditMenu;