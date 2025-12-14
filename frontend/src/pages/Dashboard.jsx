import { useState, useEffect } from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const loadTrips = () => {
        const params = new URLSearchParams();
        if (origin) params.append('origin', origin);
        if (destination) params.append('destination', destination);
        if (date) params.append('date', date);

        const queryString = params.toString();
        const url = queryString ? `/api/trips?${queryString}` : '/api/trips';

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Backend not reachable");
                return res.json();
            })
            .then(data => {
                setTrips(data);
                setError(null);
            })
            .catch(err => {
                console.error("Failed to fetch trips:", err);
                setError("Could not connect to backend. Please ensure 'mvn spring-boot:run' is running.");
            });
    };

    const handleBook = (tripId) => {
        if (!user || !user.id) {
            alert('Please log in to book a ticket');
            return;
        }

        const seatNumber = Math.floor(Math.random() * 20) + 1; // Random seat 1-20

        fetch(`/api/bookings?tripId=${tripId}&userId=${user.id}&seatNumber=${seatNumber}`, {
            method: 'POST'
        })
            .then(res => {
                if (!res.ok) throw new Error("Booking failed");
                return res.json();
            })
            .then(data => {
                alert(`Booking Successful! Ticket #${data.id} for Seat ${data.seatNumber}`);
                // Optional: redirect to bookings
                // window.location.href = '/bookings';
            })
            .catch(err => {
                console.error("Booking failed:", err);
                alert("Failed to book ticket. Please try again.");
            });
    };

    useEffect(() => {
        loadTrips();
    }, []);

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, Traveler</h1>
                <p style={{ color: 'var(--text-muted)' }}>Where do you want to go today?</p>
                {error && <div style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>{error}</div>}
            </header>

            {/* Search Bar */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px' }}>
                    <MapPin size={18} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="From (Origin)"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }}
                    />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px' }}>
                    <MapPin size={18} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="To (Destination)"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }}
                    />
                </div>
                <div style={{ width: '150px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.75rem', borderRadius: '8px' }}>
                    <Calendar size={18} color="var(--text-muted)" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }}
                    />
                </div>
                <button className="btn-primary" onClick={() => loadTrips()}>
                    <Search size={18} style={{ marginRight: '0.5rem' }} />
                    Search Trips
                </button>
            </div>

            <div className="card-grid">
                {trips.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No trips found. Click Search or check backend connection.</p>
                ) : (
                    trips.map(trip => (
                        <div key={trip.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginTop: 0 }}>{trip.route.origin} to {trip.route.destination}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Bus: {trip.bus.operatorName}</p>
                            <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${trip.price.toFixed(2)}</p>
                            <p style={{ fontSize: '0.9rem' }}>{new Date(trip.departureTime).toLocaleString()}</p>
                            <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => handleBook(trip.id)}>Book Now</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
