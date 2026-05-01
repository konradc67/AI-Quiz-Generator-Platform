import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/user/profile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error("Error:", data);
                }
            } catch (err) {
                console.error("Connection error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="results-panel">
                <div className="loading-container">
                    <div className="neon-spinner"></div>
                    <p className="status-text">Loading profile data...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="results-panel">
                <h2>Profile</h2>
                <p className="status-text" style={{ color: '#ff0033' }}>Error loading profile. Please log in again.</p>
            </div>
        );
    }

    return (
        <div className="results-panel">
            <div style={{ textAlign: 'center', paddingBottom: '30px', borderBottom: '1px solid rgba(0, 243, 255, 0.2)', marginBottom: '30px' }}>
                <div 
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--neon-purple, #b500ff), var(--neon-blue, #00f3ff))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: 'white',
                        margin: '0 auto 15px auto',
                        boxShadow: '0 0 20px rgba(181, 0, 255, 0.4)',
                        textTransform: 'uppercase'
                    }}
                >
                    {user.username ? user.username.charAt(0) : '👤'}
                </div>
                
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{user.username}</h2>
                
                <div style={{ 
                    display: 'inline-block', 
                    padding: '8px 20px', 
                    borderRadius: '20px', 
                    backgroundColor: 'rgba(0, 243, 255, 0.1)', 
                    border: '1px solid var(--neon-blue, #00f3ff)',
                    color: 'var(--neon-blue, #00f3ff)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.9rem'
                }}>
                    ★ {user.role || 'User'} ★
                </div>
            </div>

            <h3 style={{ marginBottom: '20px', opacity: 0.8 }}>Account Details</h3>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px' 
            }}>
                
                <div className="quiz-question-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
                    <div style={{ fontSize: '2rem' }}>📝</div>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>First Name</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.first_name || '-'}</div>
                    </div>
                </div>

                <div className="quiz-question-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
                    <div style={{ fontSize: '2rem' }}>📋</div>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Last Name</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.last_name || '-'}</div>
                    </div>
                </div>

                <div className="quiz-question-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
                    <div style={{ fontSize: '2rem' }}>✉️</div>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Email Address</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', wordBreak: 'break-all' }}>{user.email || '-'}</div>
                    </div>
                </div>

                <div className="quiz-question-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '20px' }}>
                    <div style={{ fontSize: '2rem' }}>🌍</div>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>Country</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.country || '-'}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}