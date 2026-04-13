import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            username: username,
            password: password
        };

        try {
            const url = 'https://ai-quiz-generator-platform-backend.vercel.app/user/login/';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Logged in successfully! Redirecting...');
                
                localStorage.setItem('accessToken', data.access || data.token);

                setTimeout(() => {
                    window.location.href = '/'; 
                }, 1000);

            } else {
                const errorText = data.detail || data.non_field_errors || 'Invalid e-mail or password.';
                toast.error(errorText);
            }

        } catch (error) {
            console.error('Błąd połączenia:', error);
            toast.error('Server connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <button className="auth-return-button"
                    onClick={() => navigate('/')}>
                </button>
                <div className="logo-icon-center">🧠</div>
                <h2 style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>WELCOME BACK</h2>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'LOGGING IN...' : 'Login'}
                    </button>
                </form>

                <div className="auth-link" style={{ marginTop: '10px' }}>
                    Don't have an account? <Link to="/register" style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}