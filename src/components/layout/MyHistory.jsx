import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function MyHistory() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [selectedQuiz, setSelectedQuiz] = useState(null); 
    
    const [userAnswers, setUserAnswers] = useState({}); 
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); 
    const [score, setScore] = useState(0); 

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchHistory = async () => {
            try {
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
                console.error('Server error: ', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [token]);

    const handleViewQuiz = async (quizId) => {
        setIsLoading(true);
        setUserAnswers({});
        setIsQuizSubmitted(false);
        setScore(0);

        try {
            const response = await fetch(`/api/history/${quizId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                setSelectedQuiz(data);
            } else {
                toast.error(data.error || 'Failed to load quiz details.');
            }
        } catch (error) {
            toast.error('Server connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToList = () => {
        setSelectedQuiz(null);
        setUserAnswers({});
        setIsQuizSubmitted(false);
        setScore(0);
    };

    const handleAnswerSelect = (questionIndex, answer) => {
        if (!isQuizSubmitted) {
            setUserAnswers(prev => ({
                ...prev,
                [questionIndex]: answer
            }));
        }
    };

    const normalizeText = (text) => {
        if (!text) return "";
        return String(text)
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .replace(/[.,!?]/g, '')
            .trim();
    };

    const handleSubmitQuiz = () => {
        let currentScore = 0;
        selectedQuiz.questions.forEach((q, index) => {
            const actualCorrect = normalizeText(q.correct);
            const userAnswer = normalizeText(userAnswers[index]);
            
            if (userAnswer === actualCorrect && actualCorrect !== "") {
                currentScore += 1;
            }
        });
        setScore(currentScore);
        setIsQuizSubmitted(true);
        
        if (currentScore === selectedQuiz.questions.length) {
            toast.success("Perfect score! 🎉");
        } else {
            toast.info(`Quiz completed! You scored ${currentScore}/${selectedQuiz.questions.length}`);
        }
    };

    if (!token) {
        return (
            <div className="results-panel">
                <h2>My History</h2>
                <p className="status-text">You must be logged in to view your history.</p>
            </div>
        );
    }

    if (selectedQuiz) {
        return (
            <div className="results-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{selectedQuiz.topic}</h2>
                    <button 
                        className="generate-btn" 
                        style={{ padding: '8px 15px', width: 'auto', fontSize: '0.9rem' }}
                        onClick={handleBackToList}
                    >
                        ← BACK TO LIST
                    </button>
                </div>
                <p style={{ opacity: 0.7, marginBottom: '20px' }}>Generated on: {selectedQuiz.created_at}</p>
                
                <div className="quiz-preview-list">
                    {selectedQuiz.questions.map((question, index) => {
                        const actualCorrect = normalizeText(question.correct);

                        return (
                            <div key={index} className="quiz-question-card" style={{ marginBottom: '20px' }}>
                                <h4>{index + 1}. {question.q}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                                    {question.a.map((answer, idx) => {
                                        const isSelected = userAnswers[index] === answer;
                                        const isCorrect = normalizeText(answer) === actualCorrect;
                                        
                                        const showAsCorrect = isQuizSubmitted && isCorrect;
                                        const showAsWrong = isQuizSubmitted && isSelected && !isCorrect;

                                        let bgColor = 'rgba(0, 243, 255, 0.05)';
                                        let borderColor = 'rgba(0, 243, 255, 0.2)';

                                        if (showAsCorrect) {
                                            bgColor = 'rgba(0, 255, 102, 0.1)'; 
                                            borderColor = 'var(--neon-green, #00ff66)'; 
                                        } else if (showAsWrong) {
                                            bgColor = 'rgba(255, 0, 51, 0.1)'; 
                                            borderColor = '#ff0033'; 
                                        } else if (isSelected && !isQuizSubmitted) {
                                            bgColor = 'rgba(0, 243, 255, 0.2)'; 
                                            borderColor = 'var(--neon-blue, #00f3ff)';
                                        }

                                        return (
                                            <div 
                                                key={idx}
                                                onClick={() => handleAnswerSelect(index, answer)}
                                                style={{
                                                    padding: '12px 15px',
                                                    border: `1px solid ${borderColor}`,
                                                    borderRadius: '8px',
                                                    backgroundColor: bgColor,
                                                    cursor: isQuizSubmitted ? 'default' : 'pointer',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>{answer}</span>
                                                    {showAsCorrect && <span style={{ color: 'var(--neon-green, #00ff66)', fontWeight: 'bold' }}>✓</span>}
                                                    {showAsWrong && <span style={{ color: '#ff0033', fontWeight: 'bold' }}>✗</span>}
                                                </div>
                                                
                                                {showAsWrong && question.correct && (
                                                    <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#ff0033', opacity: 0.8 }}>
                                                        Correct answer is: "{question.correct}"
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(0, 243, 255, 0.2)' }}>
                    {!isQuizSubmitted ? (
                        <button 
                            className="generate-btn" 
                            style={{ width: 'auto', padding: '12px 40px', fontSize: '1.1rem' }}
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(userAnswers).length !== selectedQuiz.questions.length}
                        >
                            {Object.keys(userAnswers).length !== selectedQuiz.questions.length 
                                ? `ANSWER ALL QUESTIONS (${Object.keys(userAnswers).length}/${selectedQuiz.questions.length})` 
                                : 'SUBMIT QUIZ'}
                        </button>
                    ) : (
                        <div className="quiz-question-card" style={{ display: 'inline-block', borderColor: score === selectedQuiz.questions.length ? 'var(--neon-green, #00ff66)' : 'var(--neon-blue, #00f3ff)' }}>
                            <h2 style={{ margin: '0 0 10px 0' }}>
                                Your Score: <span style={{ color: score === selectedQuiz.questions.length ? 'var(--neon-green, #00ff66)' : 'var(--neon-blue, #00f3ff)' }}>{score} / {selectedQuiz.questions.length}</span>
                            </h2>
                            <p style={{ opacity: 0.8, margin: 0 }}>
                                {score === selectedQuiz.questions.length ? "Perfect! You nailed it! 🧠✨" : "Good job! Review your answers above."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="results-panel">
            <h2>My History</h2>
            
            {isLoading ? (
                <div className="loading-container">
                    <div className="neon-spinner"></div>
                    <p className="status-text">Loading...</p>
                </div>
            ) : history.length === 0 ? (
                <p className="status-text">You haven't generated any quizzes yet.</p>
            ) : (
                <div className="quiz-preview-list">
                    {history.map((quiz) => (
                        <div 
                            key={quiz.id} 
                            className="quiz-question-card" 
                            style={{ marginBottom: '15px', cursor: 'pointer', transition: '0.2s' }}
                            onClick={() => handleViewQuiz(quiz.id)}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--neon-blue, #00f3ff)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(0, 243, 255, 0.2)'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>{quiz.topic}</h3>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                    {quiz.created_at}
                                </span>
                            </div>
                            <p style={{ marginTop: '10px' }}>
                                Questions: <strong style={{ color: 'var(--neon-blue, #00f3ff)' }}>{quiz.questions_count}</strong>
                            </p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--neon-blue, #00f3ff)', marginTop: '5px', textAlign: 'right' }}>
                                Click to solve quiz ⭢
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}