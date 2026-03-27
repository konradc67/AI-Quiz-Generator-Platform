export default function Register() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="logo-icon-center">🚀</div>
                <h2 style={{ color: "white", textAlign: "center" }}>CREATE ACCOUNT</h2>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button className="auth-button">Sign Up</button>
                <div className="auth-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
}