import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
    const [username,setUsername] = useState('');
    const [first_name,setFirstname] = useState('');
    const [last_name,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [country,setCountry] = useState('');
    const [role,setRole] = useState('STUDENT');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (e)=>{
        e.preventDefault();
        if (password != confirmPassword) {
            toast.error('Passwords do not match!');
        return;        
        };
        setIsLoading(true);
        const payload = {
            username : username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            country: country,
            role: role,
            password: password,

        }
        try{
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
            }else {
                const errorText = data.detail || (typeof data === 'object' ? Object.values(data)[0] : 'Błąd rejestracji.');
                toast.error(errorText);
            }
        }
            catch(error){
            console.error('Błąd połączenia z serwerem:', error);
            toast.error('Server connection error.');
            }finally{
                setIsLoading(false);
            }
        
    };

    return (
      <div className="auth-page">
            <div className="auth-card">
                <button className="auth-return-button"
                    onClick={() => navigate('/')}>
                </button>
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
                    <input 
                        type="text" 
                        placeholder="Country" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
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
                        minLength={6} // Podstawowe zabezpieczenie html
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
