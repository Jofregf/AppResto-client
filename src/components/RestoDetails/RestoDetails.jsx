import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getRestaurantDetails } from "../../redux/actions/restaurantActions";
import Review from "../Reviews/Reviews";
import Cookie from "universal-cookie";
import { Button } from "react-bootstrap";
import { TiArrowBack } from "react-icons/ti";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { GiRuleBook } from "react-icons/gi";
import "./RestoDetails.css";

function RestoDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [details] = useState(id);

    useEffect(() => {
        dispatch(getRestaurantDetails(details));
    }, [dispatch, details]);

    const detailsState = useSelector((state) => {
        return Array.isArray(state.restaurants.restaurantDetails)
            ? state.restaurants.restaurantDetails
            : [state.restaurants.restaurantDetails];
    });

    if (!detailsState) {
        return <div>Loading...</div>;
    }

    const cookie = new Cookie();
    const cookieRole = cookie.get("user")?.role;

    return (
        <>
            <div className="principal-container">
                {cookieRole === "ROLE_RESTO" ? (
                    <div>
                        <Link to="/resto">
                            <Button variant="outline" className="custom-button">
                                RESTO PANEL
                            </Button>
                        </Link>
                    </div>
                ) : null}
                {detailsState && detailsState.length > 0 ? (
                    detailsState.map((detail) => (
                        <>
                            <div className="main-container">
                                <div className="detailProduct-container">
                                    <div className="title-category">
                                        <Link
                                            to="/inicio"
                                            style={{
                                                color: "#D8F3FF",
                                                fontSize: "30px",
                                            }}
                                        >
                                            <TiArrowBack />
                                        </Link>
                                    </div>
                                    <div className="detail-one">
                                            <div key={detail.restaurantId} className="detail-one-right">
                                                <h2 className="detail-one-name">
                                                    {detail.restaurantName}
                                                </h2>
                                                <div className="detail-two">
                                                    <div>
                                                        <strong>
                                                            Dirección
                                                        </strong>
                                                    </div>
                                                    <div className="description-right">
                                                        <p className="description-top">
                                                            {" "}
                                                            {
                                                                detail.restaurantAddress
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong>
                                                            Teléfono
                                                        </strong>
                                                    </div>
                                                    <div className="description-right">
                                                        <p className="description-top">
                                                            {" "}
                                                            {
                                                                detail.restaurantPhone
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong>e-mail</strong>
                                                    </div>
                                                    <div className="description-right">
                                                        <p className="description-top">
                                                            {" "}
                                                            {
                                                                detail.restaurantEmail
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong>
                                                            Descripción
                                                        </strong>
                                                    </div>
                                                    <div className="description-right">
                                                        <p className="description-top">
                                                            {" "}
                                                            {
                                                                detail.restaurantDescription
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong>
                                                            Apertura
                                                        </strong>
                                                    </div>
                                                    <div className="description-right">
                                                        <p className="description-top">
                                                            {" "}
                                                            {
                                                                detail.openingHoursRestaurant
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <strong>Cierre</strong>
                                                    </div>
                                                    <div className="description-right">
                                                        <p className="description-top">
                                                            {" "}
                                                            {
                                                                detail.closingHoursRestaurant
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="detail-one-buttons">
                                                        <Link
                                                            style={{
                                                                color: "#F15422",
                                                                fontSize: "20px",
                                                                textDecoration:"none",
                                                                width: "100px",
                                                            }}
                                                            to={`/menus/restaurantes/${id}`}
                                                        >
                                                            <MdOutlineRestaurantMenu/>
                                                            <p className="p-link">Menú</p>
                                                        </Link>
                                                        <Link
                                                            style={{
                                                                color: "#F15422",
                                                                fontSize: "20px",
                                                                textDecoration:"none",
                                                                width: "100px",
                                                            }}
                                                            to={`/restaurantes/${id}/reserva`}
                                                        >
                                                            <GiRuleBook/>
                                                            <p className="p-link">Reservar</p>
                                                            
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                                {detail.restaurantImages &&
                                                detail.restaurantImages.length >
                                                    0 ? (
                                                    detail.restaurantImages.map(
                                                        (img, i) => (
                                                            <div className="detail-one-left" key={i}>
                                                                <img
                                                                    className="detail-img"
                                                                    src={img}
                                                                    alt={`Imagen ${
                                                                        i + 1
                                                                    }`}
                                                                />
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div>
                                                        No hay imagenes
                                                        disponibles
                                                    </div>
                                                )}
                                            
                                        
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    <div>
                        <p>No hay restaurantes disponibles</p>
                    </div>
                )}

                <Review idResto={id} />
            </div>
        </>
    );
}
export default RestoDetails;
