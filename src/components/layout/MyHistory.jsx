import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function MyHistory() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        // Jeśli nie ma tokena, to nawet nie próbujemy pobierać z bazy
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchHistory = async () => {
            try {
                // Analogicznie do generate, uderzamy w historię. Metoda to GET (domyślna)
                const response = await fetch("/api/history/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setHistory(data.history);
                } else {
                    toast.error(data.error || 'Failed to fetch history.');
                }
            } catch (error) {
                console.error('Server connection error: ', error);
                toast.error('Server connection error.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [token]);

    // UI dla niezalogowanego gościa
    if (!token) {
        return (
            <div className="results-panel">
                <h2>My History</h2>
                <p className="status-text">You must be logged in to view your history.</p>
            </div>
        );
    }

    return (
        <div className="results-panel">
            <h2>My History</h2>
            
            {isLoading ? (
                <div className="loading-container">
                    <div className="neon-spinner"></div>
                    <p className="status-text">Loading your quizzes...</p>
                </div>
            ) : history.length === 0 ? (
                <p className="status-text">You haven't generated any quizzes yet.</p>
            ) : (
                <div className="quiz-preview-list">
                    {history.map((quiz) => (
                        <div key={quiz.id} className="quiz-question-card" style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{quiz.topic}</h3>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                    {quiz.created_at}
                                </span>
                            </div>
                            <p style={{ marginTop: '10px' }}>
                                Questions: <strong style={{ color: 'var(--neon-blue, #00f3ff)' }}>{quiz.questions_count}</strong>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}