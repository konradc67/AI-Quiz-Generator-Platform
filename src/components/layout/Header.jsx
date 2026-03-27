import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return(
        <header>
        <div className="logo-group">
        <div className="logo-icon">🧠</div>
        <div className="logo-text">AI QUIZ GEN</div>
      </div>
      <div className="header-actions">
        <button className="create-btn">CREATE NEW</button>
                <div className="avatar" onClick={toggleDropdown}>👤</div>
                {dropdownOpen && (
                    <div className="avatar-dropdown">
                        <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                        <Link to="/register" onClick={() => setDropdownOpen(false)}>Sign Up</Link>
                    </div>
                )}
      </div>
        </header>
    );

}