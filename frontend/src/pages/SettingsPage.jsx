import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function SettingsPage() {
  return (
    <div className="studio-layout">
      <Sidebar />

      <main className="studio-main">
        <header className="studio-topbar">
          <div>
            <h1>
              <span>Settings</span>
            </h1>
            <p>System configuration for ArchAgent-R local workspace.</p>
          </div>
        </header>

        <div className="settings-grid">
          <div className="settings-card">
            <h3>AI Model</h3>
            <p>Llama 3.2 via Ollama</p>
          </div>

          <div className="settings-card">
            <h3>Backend</h3>
            <p>FastAPI running on http://127.0.0.1:8000</p>
          </div>

          <div className="settings-card">
            <h3>Storage</h3>
            <p>SQLite project history enabled</p>
          </div>

          <div className="settings-card">
            <h3>Frontend</h3>
            <p>React + Vite + React Flow</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;