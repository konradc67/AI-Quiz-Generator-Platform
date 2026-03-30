import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setIsLoading(true);

        const payload = {
            email: email,
            password: password
        };

        try {
            const url = 'https://ai-quiz-generator-platform-b-git-7063a5-kitolsky-9193s-projects.vercel.app/user/login';
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Zalogowano pomyślnie! Przekierowywanie...' });
                
                localStorage.setItem('accessToken', data.access || data.token);

                setTimeout(() => {
                    window.location.href = '/'; 
                }, 1000);

            } else {
                const errorText = data.detail || data.non_field_errors || 'Nieprawidłowy e-mail lub hasło.';
                setMessage({ type: 'error', text: errorText });
            }

        } catch (error) {
            console.error('Błąd połączenia:', error);
            setMessage({ type: 'error', text: 'Błąd połączenia z serwerem.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="logo-icon-center">🧠</div>
                <h2 style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>WELCOME BACK</h2>

                {message.text && (
                    <div style={{
                        color: message.type === 'error' ? '#ff4d4d' : 'var(--neon-green)',
                        textAlign: 'center',
                        fontSize: '14px',
                        marginBottom: '10px'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Don't have an account? <a href="/register" style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>Sign Up</a>
                </div>
            </div>
        </div>
    );
}