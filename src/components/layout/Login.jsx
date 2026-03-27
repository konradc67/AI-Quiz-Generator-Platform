export default function Login() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="logo-icon-center">🧠</div>
                <h2 style={{ color: "white", textAlign: "center" }}>WELCOME BACK</h2>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="auth-button">Login</button>
                <div className="auth-link">
                    Don't have an account? <a href="/register">Sign Up</a>
                </div>
            </div>
        </div>
    );
}