import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./BookingResults.css";

function BookingResults() {
    const bookingResults = useSelector((state) => state.bookings.bookings);
    const error = useSelector((state) => state.bookings.error);
    
    return (
        <div>
        <h3 style= {{color: "#F15422"}}>Reservas</h3>
        {!error && bookingResults && bookingResults.length > 0 ? (
            bookingResults.map((booking) => (
            <div key={booking.bookingId} className="resto-booking-container">
                <div className="resto-book-container-slim-2">
                    <div className="resto-book-information">
                        <p>Nombre del restaurante: {booking.restaurant.restaurantName}</p>
                        <p>Fecha: {new Date(booking.bookingDate).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
                        <p>Hora: {booking.bookingTime}</p>
                        <p>Personas: {booking.bookingPartySize}</p>
                    </div>
                </div>
            </div>
            ))
        ) : (
            <div className= "alert-resto">
                <p>No se encontraron reservas</p>
            </div>
        )}
            <div>
                <Link to={`/resto`} style={{ textDecoration: 'none' }}>
                    <Button variant="outline" className="custom-button">
                        Resto Panel
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default BookingResults;