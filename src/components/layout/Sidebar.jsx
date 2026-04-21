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
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <div className="nav-icon">🚀</div> Dashboard
            </NavLink>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="nav-icon">📝</div> Create Quiz
      </NavLink>
            {isLoggedIn && (
                <>
                    <NavLink to="/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"
                    } >
                        <div className="nav-icon">📜</div> My History
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                        <div className="nav-icon">👤</div> Profile
                    </NavLink>
                    <button className="nav-item" onClick={handleLogout}>
                        <div className="nav-icon">🚪</div> Logout
                    </button>
                </>)}
    </aside>
  );
}