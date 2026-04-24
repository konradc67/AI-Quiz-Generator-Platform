import { useState } from "react";

export default function Pricing() {
    const [selectedPlan, setSelectedPlan] = useState("pro");

    const handleSubscribe = (plan) => {
        console.log("Stripe mock checkout for:", plan);
    };

    return (
        <div className="pricing-container">
            <h2 className="path-title">Subscription Plans</h2>
            <p className="status-text" style={{ marginBottom: "30px" }}>
                Select a plan to unlock advanced features.
            </p>
            
            <div className="pricing-grid">
                <div 
                    className={`pricing-card ${selectedPlan === "free" ? "active" : ""}`} 
                    onClick={() => setSelectedPlan("free")}
                >
                    <h3>Basic</h3>
                    <div className="price">$0<span>/mo</span></div>
                    <ul className="question-list">
                        <li>✓ 5 Quizzes per day</li>
                        <li>✓ Standard AI Models</li>
                        <li>✗ No Export to PDF</li>
                    </ul>
                    <button className="generate-btn" onClick={() => handleSubscribe("free")}>
                        Current Plan
                    </button>
                </div>

                <div 
                    className={`pricing-card pro ${selectedPlan === "pro" ? "active" : ""}`} 
                    onClick={() => setSelectedPlan("pro")}
                >
                    <div className="popular-badge">MOST POPULAR</div>
                    <h3>Pro</h3>
                    <div className="price">$9.99<span>/mo</span></div>
                    <ul className="question-list">
                        <li>✓ 50 Quizzes per day</li>
                        <li>✓ GPT-4 Models</li>
                        <li>✓ Export to PDF & Word</li>
                    </ul>
                    <button className="create-btn" style={{ width: "100%" }} onClick={() => handleSubscribe("pro")}>
                        Upgrade to Pro
                    </button>
                </div>

                <div 
                    className={`pricing-card ${selectedPlan === "ultra" ? "active" : ""}`} 
                    onClick={() => setSelectedPlan("ultra")}
                >
                    <h3>Ultra</h3>
                    <div className="price">$29.99<span>/mo</span></div>
                    <ul className="question-list">
                        <li>✓ Unlimited Quizzes</li>
                        <li>✓ Priority Processing</li>
                        <li>✓ API Access</li>
                    </ul>
                    <button className="generate-btn" onClick={() => handleSubscribe("ultra")}>
                        Upgrade to Ultra
                    </button>
                </div>
            </div>
        </div>
    );
}