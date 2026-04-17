import { useState } from "react";
import { toast } from 'react-toastify';

export default function CreateQuiz(){
    const [prompt, setPrompt] = useState('');
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState('medium');

    const [isLoading, setIsLoading] = useState(false);
    const [quizResults, setQuizResults] = useState(null);

    const handleGenerateQuiz = async () => {
        if (!prompt.trim()) {
            toast.warning('Please enter a quiz topic.');
            return;
        }
        setIsLoading(true);
        setQuizResults(null);
        try{
          const response = await fetch("https://ai-quiz-generator-platform-backend.vercel.app/createquiz",{
            method: 'POST',
            headers: {
          'Content-Type': 'application/json'
         }     
          ,
          body: JSON.stringify({
            prompt: prompt,
            questionCount: questionCount,
            difficulty: difficulty
          })
        })
        
        const data = await response.json();
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
                            min="10" 
                            max="50" 
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
                                <input 
                                    type="radio" name="diff" value="easy" 
                                    checked={difficulty === 'easy'}
                                    onChange={(e) => setDifficulty(e.target.value)} 
                                    disabled={isLoading}
                                /> Easy
                            </div>
                            <div className="radio-item">
                                <input 
                                    type="radio" name="diff" value="medium" 
                                    checked={difficulty === 'medium'}
                                    onChange={(e) => setDifficulty(e.target.value)} 
                                    disabled={isLoading}
                                /> Medium
                            </div>
                            <div className="radio-item">
                                <input 
                                    type="radio" name="diff" value="high" 
                                    checked={difficulty === 'high'}
                                    onChange={(e) => setDifficulty(e.target.value)} 
                                    disabled={isLoading}
                                /> High
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    className="generate-btn" 
                    onClick={handleGenerateQuiz}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                    {isLoading ? 'GENERATING...' : 'GENERATE WITH AI'}
                </button>
                
                <div className="neon-arrow">⭆</div>
            </div>

            {(isLoading || quizResults) && (
                <div className="results-panel" style={{ marginTop: '50px' }}>
                    {isLoading ? (
                        <div className="loading-container">
                            <div className="neon-spinner"></div>
                            <p className="status-text">AI is thinking... (this may take a few seconds)</p>
                        </div>
                    ) : (
                        <>
                            <p className="status-text" style={{ color: 'var(--neon-green)' }}>Quiz Generated Successfully!</p>
                            <ul className="question-list">
                                {quizResults && quizResults.map((question, index) => (
                                    <li key={index}>{index + 1}. {question.text || question}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </>
    );
}