import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
                                <button onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    setDropdownOpen(false); 
                                    navigate("/");
                                    toast.info("Logged out successfully!");
                                }}>Logout</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}