import { useState } from "react";
export default function CreateQuiz(){
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState('medium');
    return (
<>

      <div className="form-panel">
        <div className="form-group">
          <label>User Prompt:</label>
          <textarea placeholder="Generate a quiz"></textarea>
        </div>

        <div className="form-group">
          <label>Question Count: <span>{questionCount}</span></label>
          <div className="range-container">
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={questionCount} 
              onChange={(e) => setQuestionCount(e.target.value)} 
            />
          </div>
        </div>

        <div className="inline-groups">
          <div className="form-group">
            <label>Difficulty</label>
            <div className="radio-group">
              <div className="radio-item">
                <input 
                  type="radio" 
                  name="diff" 
                  value="easy" 
                  checked={difficulty === 'easy'}
                  onChange={(e) => setDifficulty(e.target.value)} 
                /> Easy
              </div>
              <div className="radio-item">
                <input 
                  type="radio" 
                  name="diff" 
                  value="medium" 
                  checked={difficulty === 'medium'}
                  onChange={(e) => setDifficulty(e.target.value)} 
                /> Medium
              </div>
              <div className="radio-item">
                <input 
                  type="radio" 
                  name="diff" 
                  value="high" 
                  checked={difficulty === 'high'}
                  onChange={(e) => setDifficulty(e.target.value)} 
                /> High
              </div>
            </div>
          </div>

          
        </div>

        <button className="generate-btn">GENERATE WITH AI</button>
        
        <div className="neon-arrow">⭆</div>
      </div>

      <div className="results-panel" style={{ marginTop: '50px' }}>
        <p className="status-text">AI generating questions...</p>
        <ul className="question-list">
          <li>1. What is the capital of France?</li>
          <li>2. ...</li>
        </ul>
      </div>
    </>
    );

}