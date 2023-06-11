import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function BookingResults() {
    const bookingResults = useSelector((state) => state.bookings.bookings);
    const error = useSelector((state) => state.bookings.error);
    
    return (
        <div>
        <h1>Resultados de búsqueda</h1>
        {!error && bookingResults && bookingResults.length > 0 ? (
            bookingResults.map((booking) => (
            <div key={booking.bookingId}>
                <p>Nombre del restaurante: {booking.restaurant.restaurantName}</p>

                <p>Fecha: {new Date(booking.bookingDate).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</p>
                <p>Hora: {booking.bookingTime}</p>
                <p>Personas: {booking.bookingPartySize}</p>
            </div>
            ))
        ) : (
            <p>No se encontraron reservas</p>
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

// user update pass y forgot pass