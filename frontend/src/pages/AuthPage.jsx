import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sparkles,
  Mail,
  Lock,
  UserPlus,
  Network,
  ShieldCheck,
  Brain,
  ArrowRight,
  Workflow,
  Database,
  CheckCircle2,
} from "lucide-react";

import { loginUser, registerUser } from "../services/api";
import "../styles/dashboard.css";

function AuthPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginUser(email, password);

      localStorage.setItem(
        "archagent_user",
        JSON.stringify(response.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error?.response?.data?.detail ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      await registerUser(email, password);

      alert(
        "Account created successfully. You can now log in."
      );
    } catch (error) {
      alert(
        error?.response?.data?.detail ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cinematic-auth-page">
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>
      <div className="auth-orb auth-orb-three"></div>

      <div className="auth-grid-bg"></div>

      <section className="cinematic-auth-shell">
        <div className="auth-left-panel">
          <div className="auth-badge premium-auth-badge">
            <Sparkles size={18} />
            Multi-Agent Architecture Intelligence
          </div>

          <h1>
            ArchAgent-R
            <span>Design software architecture with AI agents.</span>
          </h1>

          <p>
            Generate architecture plans, design reasoning,
            decomposition, validation reports,
            technology stacks and interactive diagrams.
          </p>

          <div className="auth-system-preview">
            <div className="preview-node user-node">
              <Brain size={20} />
              Project Idea
            </div>

            <div className="preview-line"></div>

            <div className="preview-node gateway-node">
              <Workflow size={20} />
              AI Agents
            </div>

            <div className="preview-service-row">
              <div>
                <Network size={18} />
                Design
              </div>

              <div>
                <Database size={18} />
                Data
              </div>

              <div>
                <ShieldCheck size={18} />
                Review
              </div>
            </div>
          </div>

          <div className="auth-feature-grid premium-auth-features">
            <div>
              <Brain size={24} />
              <strong>Reasoning Agents</strong>
              <span>
                Requirements, design, decomposition and validation
              </span>
            </div>

            <div>
              <Network size={24} />
              <strong>Visual Canvas</strong>
              <span>
                Interactive React Flow architecture diagrams
              </span>
            </div>

            <div>
              <ShieldCheck size={24} />
              <strong>Architecture Review</strong>
              <span>
                Scalability, reliability, security and scores
              </span>
            </div>
          </div>
        </div>

        <div className="auth-right-panel">
          <section className="auth-card cinematic-auth-card">
            <div className="login-logo cinematic-login-logo">
              <Sparkles size={34} />
            </div>

            <h2>Welcome Back</h2>
            <p>Login to your architecture workspace.</p>

            <div className="login-field cinematic-login-field">
              <Mail size={18} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>

            <div className="login-field cinematic-login-field">
              <Lock size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button
              className="auth-main-btn cinematic-enter-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              <span>
                {loading ? "Please wait..." : "Login"}
              </span>

              <ArrowRight size={20} />
            </button>

            <button
              className="auth-register-btn cinematic-register-btn"
              onClick={handleRegister}
              disabled={loading}
            >
              <UserPlus size={18} />
              Create New Account
            </button>

            <div className="auth-status-list">
              <div>
                <CheckCircle2 size={16} />
                Local Llama Ready
              </div>

              <div>
                <CheckCircle2 size={16} />
                FastAPI Connected
              </div>

              <div>
                <CheckCircle2 size={16} />
                SQLite User Accounts
              </div>
            </div>

            <small>
              Create an account once, then log in normally.
            </small>
          </section>
        </div>
      </section>
    </div>
  );
}

export default AuthPage;