import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    
    const [stats, setStats] = useState({
        total_quizzes: 0,
        total_questions: 0,
        last_activity: "-"
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await fetch("/api/stats/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                
                if (response.ok) {
                    setStats({
                        total_quizzes: data.total_quizzes,
                        total_questions: data.total_questions,
                        last_activity: data.last_activity
                    });
                } else {
                    toast.error(data.error || "Failed to load stats.");
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (!token) {
        return (
            <div className="results-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <h1 style={{ marginBottom: '20px', color: 'var(--neon-blue, #00f3ff)' }}>Welcome to AI Quiz Generator</h1>
                <p className="status-text" style={{ marginBottom: '30px' }}>
                    Sign in to unlock your personal dashboard, track your stats, and explore premium features.
                </p>
                <button 
                    className="generate-btn" 
                    onClick={() => navigate('/login')}
                    style={{ width: 'auto', padding: '10px 30px' }}
                >
                    LOGIN / REGISTER
                </button>
            </div>
        );
    }

    return (
        <div className="results-panel">
            <h2 style={{ borderBottom: '1px solid rgba(0, 243, 255, 0.2)', paddingBottom: '10px', marginBottom: '20px' }}>
                Overview Dashboard
            </h2>
            
            {isLoading ? (
                 <div className="loading-container">
                    <div className="neon-spinner"></div>
                    <p className="status-text">Loading your stats...</p>
                 </div>
            ) : (
                <>
                    {/* STATYSTYKI - 3 Kafelki */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '20px',
                        marginBottom: '40px'
                    }}>
                        
                        <div className="quiz-question-card" style={{ textAlign: 'center', padding: '20px' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--neon-blue, #00f3ff)', marginBottom: '10px' }}>
                                {stats.total_quizzes}
                            </div>
                            <h3 style={{ fontSize: '1rem', opacity: 0.8 }}>Total Quizzes</h3>
                        </div>

                        <div className="quiz-question-card" style={{ textAlign: 'center', padding: '20px' }}>
                            <div style={{ fontSize: '2.5rem', color: 'var(--neon-green, #00ff66)', marginBottom: '10px' }}>
                                {stats.total_questions}
                            </div>
                            <h3 style={{ fontSize: '1rem', opacity: 0.8 }}>Questions Generated</h3>
                        </div>

                        <div className="quiz-question-card" style={{ textAlign: 'center', padding: '20px' }}>
                            <div style={{ fontSize: '1.5rem', color: '#ffb300', marginBottom: '10px', marginTop: '15px' }}>
                                {stats.last_activity}
                            </div>
                            <h3 style={{ fontSize: '1rem', opacity: 0.8 }}>Last Activity</h3>
                        </div>

                    </div>

                    {/* BANER PRICING/UPGRADE */}
                    <div 
                        className="quiz-question-card"
                        style={{ 
                            cursor: 'pointer', 
                            transition: '0.3s', 
                            textAlign: 'center', 
                            padding: '30px 20px',
                            borderColor: 'var(--neon-purple, #b500ff)',
                            background: 'linear-gradient(145deg, rgba(181,0,255,0.05) 0%, rgba(0,0,0,0) 100%)',
                            boxShadow: '0 0 15px rgba(181, 0, 255, 0.15)'
                        }}
                        onClick={() => navigate('/pricing')}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = '#ff00ff';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 0, 255, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--neon-purple, #b500ff)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(181, 0, 255, 0.15)';
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚀</div>
                        <h3 style={{ color: '#ff00ff', fontSize: '1.5rem', marginBottom: '10px' }}>Unlock Limitless Generation</h3>
                        <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto' }}>
                            Need more questions or higher difficulty levels? Upgrade your plan to get access to advanced AI models and unlimited quiz saves.
                        </p>
                        <button 
                            className="generate-btn"
                            style={{ 
                                width: 'auto', 
                                padding: '10px 30px', 
                                marginTop: '20px', 
                                background: 'transparent',
                                border: '1px solid #ff00ff',
                                color: '#ff00ff',
                                boxShadow: '0 0 10px rgba(255,0,255,0.2)'
                            }}
                        >
                            VIEW PRICING PLANS
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}