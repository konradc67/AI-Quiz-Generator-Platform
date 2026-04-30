import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("accessToken");

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <aside className="sidebar">
            {/* Poprawka 1: Dashboard wskazuje na główny adres "/" */}
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <div className="nav-icon">🚀</div> Dashboard
            </NavLink>
            
            {/* Poprawka 2: Create Quiz wskazuje na "/create" */}
            <NavLink to="/create" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <div className="nav-icon">📝</div> Create Quiz
            </NavLink>
            
            {isLoggedIn && (
                <>
                    <NavLink to="/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-icon">📜</div> My History
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-icon">👤</div> Profile
                    </NavLink>
                    <button className="nav-item" onClick={handleLogout}>
                        <div className="nav-icon">🚪</div> Logout
                    </button>
                </>
            )}
        </aside>
    );
}