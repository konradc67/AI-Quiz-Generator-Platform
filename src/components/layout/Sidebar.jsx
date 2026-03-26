import { NavLink } from "react-router-dom";
export default function Sidebar() {
    return (
        <aside className="sidebar">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                <div className="nav-icon">📊</div> Dashboard
            </NavLink>
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="nav-icon">📝</div> Create Quiz
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"
} >
        <div className="nav-icon">📜</div> My History
      </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="nav-icon">👤</div> Profile
      </NavLink>
          <NavLink to="/logout" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <div className="nav-icon">🚪</div> Logout
      </NavLink>
    </aside>
  );
}