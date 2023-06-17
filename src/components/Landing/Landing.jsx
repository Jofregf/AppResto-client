import {Link} from "react-router-dom";
import {Carousel} from 'react-bootstrap';
import "./Landing.css";

function Landing() {

    return (

        <div className="container-carousel">
            <Carousel>
                <Carousel.Item>
                    <Link to={"/inicio"}>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/13vQ3Cxt/frances.jpg"
                            alt="First slide"
                        />
                    </Link>
                    <Carousel.Caption>
                        <h3 className="carousel-h3">Resto Reservas</h3>
                        <p className="carousel-p"> Reserve en sus restaurantes </p>
                        <p className="carousel-p">favoritos</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={"/inicio"}>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/x8RVWtnL/mediterra.jpg"
                            alt="Second slide"
                        />
                    </Link>
                    <Carousel.Caption>
                        <h3 className="carousel-h3">Resto Reservas</h3>
                        <p className="carousel-p">Los menús que usted busca</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={"/inicio"}>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/0QFmR05X/fast.jpg"
                            alt="Third slide"
                        />
                    </Link>
                    <Carousel.Caption>
                        <h3 className="carousel-h3">Resto Reservas</h3>
                        <p className="carousel-p">Busqueda de restaurantes</p>
                        <p className="carousel-p">por menú</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={"/inicio"}>
                        <img
                            className="d-block w-100"
                            src="https://i.postimg.cc/x8RVWtnL/mediterra.jpg"
                            alt="Fourth slide"
                        />
                    </Link>
                    <Carousel.Caption>
                        <h3 className="carousel-h3">Resto Reservas</h3>
                        <p className="carousel-p">Elija la fecha y </p>
                        <p className="carousel-p">hora de su reserva</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Landing;
