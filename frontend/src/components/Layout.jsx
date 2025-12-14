import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Ticket, LogOut, Bus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <div className="layout">
            <aside className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <Bus color="var(--primary)" size={32} />
                    <span>BusTicket</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        <Home size={20} />
                        Dashboard
                    </Link>
                    <Link to="/bookings" className={`nav-item ${location.pathname === '/bookings' ? 'active' : ''}`}>
                        <Ticket size={20} />
                        My Tickets
                    </Link>
                </nav>

                <div className="nav-item" style={{ marginTop: 'auto', cursor: 'pointer' }} onClick={() => { logout(); navigate('/login'); }}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </div>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
