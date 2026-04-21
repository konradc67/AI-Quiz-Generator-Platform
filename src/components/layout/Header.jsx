import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const navigate = useNavigate();

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
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                                <Link to="/register" onClick={() => setDropdownOpen(false)}>Sign Up</Link>
                            </>
                        ) : (
                            <>
                                    <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                                    <button onClick={() => {localStorage.removeItem("accessToken");
                                        setDropdownOpen(false); navigate("/login");
}}>Logout</button>
                                </>
                        ) }
                        
                    </div>
                )}
      </div>
        </header>
    );

}