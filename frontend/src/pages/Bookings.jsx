import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.id) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = () => {
        fetch(`/api/bookings/user/${user.id}`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error("Failed to fetch bookings:", err));
    };

    const handleCancel = (bookingId) => {
        if (!confirm("Are you sure you want to cancel this ticket?")) return;

        fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' })
            .then(() => {
                // Refresh list or remove item locally
                setBookings(prev => prev.filter(b => b.id !== bookingId));
            })
            .catch(err => console.error("Failed to cancel booking:", err));
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Tickets</h1>

            <div className="card-grid">
                {bookings.length === 0 ? (
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <p>You have no upcoming trips.</p>
                        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => window.location.href = '/'}>Find a Trip</button>
                    </div>
                ) : (
                    bookings.map(booking => (
                        <div key={booking.id} className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ marginTop: 0 }}>Ticket #{booking.id}</h3>
                                {booking.status !== 'CANCELLED' && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        style={{
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        Cancel Ticket
                                    </button>
                                )}
                            </div>
                            <p style={{ color: 'var(--text-muted)' }}>Route: {booking.tripSchedule.route.origin} → {booking.tripSchedule.route.destination}</p>
                            <p>Departs: {new Date(booking.tripSchedule.departureTime).toLocaleString()}</p>
                            <p>Seat: <span style={{ fontWeight: 'bold' }}>{booking.seatNumber}</span></p>
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    background: booking.status === 'CANCELLED' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                    color: booking.status === 'CANCELLED' ? '#ef4444' : '#10b981',
                                    fontSize: '0.8rem'
                                }}>
                                    {booking.status}
                                </span>
                                <span style={{ fontWeight: 'bold' }}>${booking.tripSchedule.price}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Bookings;
