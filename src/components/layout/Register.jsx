import { useState } from "react";
export default function Register() {
    // /user/register
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [message,setMessage] = useState({type : '',text :''});
    const handleRegister = async (e)=>{
        e.preventDefault();
        setMessage({type: "",text: ""});
        if (password != confirmPassword){
        setMessage({ type: 'error', text: 'Hasła nie są identyczne!' });
        return;        
        };
        setIsLoading(true);
        const payload = {
            username : username,
            email: email,
            password : password,

        }
        try{
            const url = 'https://ai-quiz-generator-platform-b-git-7063a5-kitolsky-9193s-projects.vercel.app/user/register/'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            if (response.ok){
                setMessage({ type: 'success', text: 'Konto utworzone pomyślnie! Możesz się zalogować.' });
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }else {
                const errorText = data.detail || (typeof data === 'object' ? Object.values(data)[0] : 'Błąd rejestracji.');
                setMessage({ type: 'error', text: errorText });
            }
        }
            catch(error){
                console.error('Błąd połączenia z serwerem:', error);
                setMessage({ type: 'error', text: 'Błąd połączenia z serwerem.' });
            }finally{
                setIsLoading(false);
            }
        
    };

    return (
      <div className="auth-page">
            <div className="auth-card">
                <div className="logo-icon-center">🚀</div>
                <h2 style={{ color: "white", textAlign: "center", marginBottom: "10px" }}>CREATE ACCOUNT</h2>

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

                
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    Already have an account? <a href="/login" style={{ color: "var(--neon-cyan)", textDecoration: "none" }}>Login</a>
                </div>
            </div>
        </div>
    );
}
