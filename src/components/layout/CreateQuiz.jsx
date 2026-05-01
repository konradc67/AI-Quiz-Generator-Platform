import { useState } from "react";
import { toast } from 'react-toastify';

export default function CreateQuiz(){
    const [prompt, setPrompt] = useState('');
    const [questionCount, setQuestionCount] = useState(5);
    const [difficulty, setDifficulty] = useState('easy');

    const [isLoading, setIsLoading] = useState(false);
    const [quizResults, setQuizResults] = useState(null);

    const [userAnswers, setUserAnswers] = useState({}); 
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false); 
    const [score, setScore] = useState(0); 

    const handleGenerateQuiz = async () => {
        const token = localStorage.getItem("accessToken");

        if (!prompt.trim()) {
            toast.warning('Please enter a quiz topic.');
            return;
        }
        
        setIsLoading(true);
        setQuizResults(null);
        setUserAnswers({});
        setIsQuizSubmitted(false);
        setScore(0);

        try {
            const response = await fetch("/api/generate/",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                    questionCount: questionCount,
                    difficulty: difficulty
                })
            });
        
            const data = await response.json();
            console.log("Dane otrzymane od AI:", data.questions);
        
            if (response.ok) {
                setQuizResults(data.questions); 
                toast.success('Quiz generated successfully!');
            } else {
                toast.error(data.error || 'Error generating quiz.');
            }
        } catch (error) {
            console.error('Server connection error: ', error);
            toast.error('Server connection error.');
        } finally {
            setIsLoading(false);
        }
    }

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

    const getCorrectAnswer = (question) => {
        let correctVal = question.correct || question.correct_answer || question.correctAnswer || "";
        
        const match = String(correctVal).trim().toLowerCase().match(/^odp(\d+)$/);
        
        if (match) {
            const index = parseInt(match[1], 10) - 1; 
            
            if (question.a && question.a[index]) {
                return question.a[index]; 
            }
        }
        
        return correctVal; 
    };

    const handleSubmitQuiz = () => {
        let currentScore = 0;
        quizResults.forEach((q, index) => {
            const actualCorrect = normalizeText(getCorrectAnswer(q));
            const userAnswer = normalizeText(userAnswers[index]);
            
            console.log(`Pytanie ${index + 1}:`);
            console.log(`- Twój wybór: "${userAnswer}"`);
            console.log(`- Poprawna od AI: "${actualCorrect}"`);
            
            if (userAnswer === actualCorrect) {
                currentScore += 1;
            }
        });
        setScore(currentScore);
        setIsQuizSubmitted(true);
        
        if (currentScore === quizResults.length) {
            toast.success("Perfect score! 🎉");
        } else {
            toast.info(`Quiz completed! You scored ${currentScore}/${quizResults.length}`);
        }
    };

    return (
        <>
            <div className="form-panel">
                <div className="form-group">
                    <label>User Prompt:</label>
                    <textarea 
                        placeholder="Generate a quiz about..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Question Count: <span>{questionCount}</span></label>
                    <div className="range-container">
                        <input 
                            type="range" 
                            min="5" 
                            max="30" 
                            value={questionCount} 
                            onChange={(e) => setQuestionCount(e.target.value)} 
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="inline-groups">
                    <div className="form-group">
                        <label>Difficulty</label>
                        <div className="radio-group">
                            <div className="radio-item">
                                <input type="radio" name="diff" value="easy" checked={difficulty === 'easy'} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading} /> Easy
                            </div>
                            <div className="radio-item">
                                <input type="radio" name="diff" value="medium" checked={difficulty === 'medium'} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading} /> Medium
                            </div>
                            <div className="radio-item">
                                <input type="radio" name="diff" value="high" checked={difficulty === 'high'} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading} /> High
                            </div>
                        </div>
                    </div>
                </div>

                <button className="generate-btn" onClick={handleGenerateQuiz} disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                    {isLoading ? 'GENERATING...' : 'GENERATE WITH AI'}
                </button>
                <div className="neon-arrow">⭆</div>
            </div>

            {(isLoading || quizResults) && (
                <div className="results-panel">
                    {isLoading ? (
                        <div className="loading-container">
                            <div className="neon-spinner"></div>
                            <p className="status-text">AI is thinking... (this may take a few seconds)</p>
                        </div>
                    ) : (
                        <>
                            <div className="quiz-preview-list">
                                {quizResults && quizResults.map((question, index) => {
                                    const actualCorrect = normalizeText(getCorrectAnswer(question));
                                    
                                    return (
                                        <div key={index} className="quiz-question-card" style={{ marginBottom: '20px' }}>
                                            <h4>{index + 1}. {question.q}</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                                                {question.a && question.a.map((answer, idx) => {
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
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <span>{answer}</span>
                                                            {showAsCorrect && <span style={{ color: 'var(--neon-green, #00ff66)', fontWeight: 'bold' }}>✓</span>}
                                                            {showAsWrong && <span style={{ color: '#ff0033', fontWeight: 'bold' }}>✗</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {quizResults && quizResults.length > 0 && (
                                <div style={{ marginTop: '30px', textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(0, 243, 255, 0.2)' }}>
                                    {!isQuizSubmitted ? (
                                        <button 
                                            className="generate-btn" 
                                            style={{ width: 'auto', padding: '12px 40px', fontSize: '1.1rem' }}
                                            onClick={handleSubmitQuiz}
                                            disabled={Object.keys(userAnswers).length !== quizResults.length}
                                        >
                                            {Object.keys(userAnswers).length !== quizResults.length 
                                                ? `ANSWER ALL QUESTIONS (${Object.keys(userAnswers).length}/${quizResults.length})` 
                                                : 'SUBMIT QUIZ'}
                                        </button>
                                    ) : (
                                        <div className="quiz-question-card" style={{ display: 'inline-block', borderColor: score === quizResults.length ? 'var(--neon-green, #00ff66)' : 'var(--neon-blue, #00f3ff)' }}>
                                            <h2 style={{ margin: '0 0 10px 0' }}>
                                                Your Score: <span style={{ color: score === quizResults.length ? 'var(--neon-green, #00ff66)' : 'var(--neon-blue, #00f3ff)' }}>{score} / {quizResults.length}</span>
                                            </h2>
                                            <p style={{ opacity: 0.8, margin: 0 }}>
                                                {score === quizResults.length ? "Perfect! You nailed it! 🧠✨" : "Good job! Review your answers above."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}