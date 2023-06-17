import './Footer.css';
import { Link } from "react-router-dom";
import face from "../../assets/face.jpg"
import inst from "../../assets/inst.png";
import termino from "../../assets/termino.png";
import sobre from "../../assets/sobre.png";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div>
                    <Link
                        to={"/terminos"}
                        className="link-footer"
                        style={{ maxHeight: "100px", color: "white" }}
                    >
                        <p className="text-link">Terminos y condiciones</p>
                        <img
                            src={termino}
                            color="black"
                            alt=" "
                            width={30}
                            height={29}
                            className="otro"
                        />
                    </Link>
                </div>

                <div className="footer-container">
                    <a
                        className="link-footer"
                        target="_blank"
                        rel="noreferrer"
                        style={{ maxHeight: "100px", color: "white" }}
                        href="https://www.google.com"
                    >
                        <p className="text-link">Facebook</p>
                        <img
                            src={face}
                            alt=" "
                            width={30}
                            height={28}
                            className="email"
                        />
                    </a>
                </div>

                <div className="footer-container">
                    <a
                        className="link-footer"
                        target="_blank"
                        rel="noreferrer"
                        style={{ maxHeight: "100px", color: "white" }}
                        href="http://www.google.com"
                    >
                        <p className="text-link">Instagram</p>
                        <img
                            src={inst}
                            alt=" "
                            width={30}
                            height={28}
                            className="otro"
                        />
                    </a>
                </div>

                <div className="footer-container">
                    <a
                        className="link-footer"
                        style={{ maxHeight: "100px", color: "white" }}
                        href="mailto:restosreservas@gmail.com"
                    >
                        <p className="text-link">Reclamos o sugerencias</p>
                        <img
                            src={sobre}
                            alt=" "
                            className="otro"
                            width={30}
                            height={28}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
