import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const COUNTRIES_LIST = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", 
    "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", 
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", 
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", 
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", 
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
    "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", 
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", 
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", 
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", 
    "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", 
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", 
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", 
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function Register() {
    const [username, setUsername] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // Stan do pokazywania/ukrywania listy państw
    
    const navigate = useNavigate();

    // Filtrowanie państw na podstawie tego, co wpisuje użytkownik
    const filteredCountries = COUNTRIES_LIST.filter(c => 
        c.toLowerCase().includes(country.toLowerCase())
    );

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;        
        }
        
        setIsLoading(true);
        const payload = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            country: country,
            role: role,
            password: password,
        }
        
        try {
            const url = '/api/user/register/';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            
            if (response.ok) {
                toast.success('Account created successfully! You can now log in.');
                setUsername('');
                setFirstname('');
                setLastname('');
                setEmail('');
                setCountry('');
                setRole('STUDENT');
                setPassword('');
                setConfirmPassword('');
                navigate('/login');
            } else {
                const errorText = data.detail || (typeof data === 'object' ? Object.values(data)[0] : 'Błąd rejestracji.');
                toast.error(errorText);
            }
        } catch (error) {
            console.error('Błąd połączenia z serwerem:', error);
            toast.error('Server connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <button className="auth-return-button" onClick={() => navigate('/')}></button>
                <div className="logo-icon-center">🚀</div>
                <h2 style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>CREATE ACCOUNT</h2>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="First name" 
                        value={first_name}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Last name" 
                        value={last_name}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input 
                            type="text" 
                            placeholder="Type to search Country..." 
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => {
                                // Opóźnienie zamknięcia, żeby zdążyć kliknąć w opcję z listy
                                setTimeout(() => setShowDropdown(false), 200);
                            }}
                            required
                            autoComplete="off"
                        />
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                maxHeight: '150px',
                                overflowY: 'auto',
                                backgroundColor: '#0f172a', // Ciemne tło
                                border: '1px solid var(--neon-cyan, #00f3ff)',
                                borderRadius: '4px',
                                zIndex: 10,
                                marginTop: '2px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                            }}>
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((c, i) => (
                                        <div 
                                            key={i}
                                            onClick={() => {
                                                setCountry(c);
                                                setShowDropdown(false);
                                            }}
                                            style={{
                                                padding: '10px',
                                                color: 'white',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid rgba(0, 243, 255, 0.1)',
                                                fontSize: '0.9rem'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0, 243, 255, 0.2)'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            {c}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '10px', color: 'gray', fontSize: '0.9rem' }}>No countries found</div>
                                )}
                            </div>
                        )}
                    </div>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ cursor: 'pointer' }}
                    >
                        <option value="STUDENT">Student</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="COLLEGIAN">College Student</option>
                        <option value="OTHER">Other</option>
                    </select>
                    
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6} 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'CREATING...' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-link" style={{ marginTop: '10px' }}>
                    Already have an account? <Link to="/login" style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>Login</Link>
                </div>
            </div>
        </div>
    );
}