import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Wand2,
  ShieldCheck,
  UploadCloud,
  Brain,
  FileText,
  Network,
  Boxes,
  Database,
  Download,
  Save,
  Share2,
  Clock,
  Bell,
  Search,
  ExternalLink,
} from "lucide-react";

import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import ProcessTabs from "../components/ProcessTabs";
import {
  generateArchitecture,
  getProjects,
  getProjectById,
} from "../services/api";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(() => {
    const saved = sessionStorage.getItem("latestArchitectureResult");
    return saved ? JSON.parse(saved) : null;
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const getProjectTitle = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes("bank")) return "Online Banking System";
    if (lower.includes("hospital")) return "Hospital Management System";
    if (lower.includes("ride") || lower.includes("uber")) return "Ride Sharing Platform";
    if (lower.includes("video") || lower.includes("stream")) return "Video Streaming Platform";
    if (lower.includes("security") || lower.includes("cyber")) return "Cybersecurity Platform";
    if (lower.includes("food") || lower.includes("restaurant")) return "Food Delivery Platform";
    if (lower.includes("social")) return "Social Media Platform";
    if (lower.includes("learning") || lower.includes("course")) return "AI Learning Platform";
    if (lower.includes("e-commerce") || lower.includes("commerce") || lower.includes("shop")) return "E-Commerce Platform";

    return "Custom Architecture Project";
  };

  useEffect(() => {
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    try {
      const projects = await getProjects();
      setRecentProjects(projects.slice(0, 5));
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  const handleSmartEnhance = () => {
    if (!prompt.trim()) {
      alert("Please enter a project idea first.");
      return;
    }

    const enhancedPrompt = `
${prompt}

Additional Architecture Requirements:
- High availability
- Horizontal scalability
- Role-based access control
- API Gateway
- Redis caching
- Monitoring and logging
- CI/CD deployment pipeline
- Secure authentication
- Disaster recovery strategy
`;

    setPrompt(enhancedPrompt.trim());
  };

  const handleAddConstraints = () => {
    const constraints = `

Constraints:
- Response time < 200ms
- Support 1 million users
- GDPR compliant
- 99.99% uptime
- Encrypted data at rest
- Encrypted communication
- Automated backups
- Audit logging enabled
`;

    setPrompt((prev) => `${prev}${constraints}`.trim());
  };

  const handleUploadDocs = () => {
    alert("Document upload is planned next. For now, paste requirements directly into the prompt box.");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please describe your software system first.");
      return;
    }

    try {
      setLoading(true);

      const detectedTitle = getProjectTitle(prompt);
      const data = await generateArchitecture(detectedTitle, prompt);

      setResult(data);
      sessionStorage.setItem("latestArchitectureResult", JSON.stringify(data));

      await loadRecentProjects();
    } catch (error) {
      console.error(error);
      alert("Backend error. Make sure FastAPI and Ollama are running.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProject = async (projectId) => {
    try {
      const project = await getProjectById(projectId);

      if (project?.error) {
        alert("Project not found.");
        return;
      }

      setResult(project);
      setPrompt(project.project_description || "");
      sessionStorage.setItem("latestArchitectureResult", JSON.stringify(project));
    } catch (error) {
      console.error(error);
      alert("Could not load saved project.");
    }
  };

  const handleExportArchitecture = () => {
    if (!result?.architecture_json) {
      alert("Generate an architecture first.");
      return;
    }

    const blob = new Blob(
      [JSON.stringify(result.architecture_json, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "archagent-r-architecture.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = () => {
    if (!result) {
      alert("Generate an architecture first.");
      return;
    }

    const report = `
ARCHAGENT-R ARCHITECTURE REPORT
================================

PROJECT:
${result.project_title || "Architecture Project"}

PROJECT DESCRIPTION:
${result.project_description || prompt}

ARCHITECTURE PLAN:
${result.requirements_output || ""}

ARCHITECTURE DESIGN:
${result.architecture_output || ""}

SYSTEM DECOMPOSITION:
${result.decomposition_output || ""}

ARCHITECTURE REVIEW:
${result.validation_output || ""}

TECHNOLOGY STACK:
${JSON.stringify(result.architecture_json?.technology_stack || {}, null, 2)}

EVALUATION SCORES:
${JSON.stringify(result.evaluation_scores || {}, null, 2)}
`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "archagent-r-architecture-report.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleShareArchitecture = async () => {
    if (!result) {
      alert("Generate architecture first.");
      return;
    }

    const shareText = `
${result.project_title}

${result.project_description}

Architecture Pattern:
${result.architecture_json?.pattern || "Not available"}

Summary:
${result.architecture_json?.summary || "Not available"}
`;

    await navigator.clipboard.writeText(shareText.trim());
    alert("Architecture copied to clipboard.");
  };

  const filteredProjects = recentProjects.filter((project) => {
    const text = `${project.project_title} ${project.project_description}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  const serviceCount =
    result?.architecture_json?.nodes?.filter((node) => node.type === "service")
      .length || 0;

  const componentCount = result?.architecture_json?.nodes?.length || 0;

  const databaseCount =
    result?.architecture_json?.nodes?.filter((node) => node.type === "database")
      .length || 0;

  const architectureScore = result?.evaluation_scores?.consistency_score || 0;

  return (
    <div className="studio-layout">
      <Sidebar />

      <main className="studio-main">
        <header className="studio-topbar">
          <div>
            <h1>
              👋 Welcome back, <span>Architect</span> ✨
            </h1>
            <p>
              Describe your system and let real Llama agents design the
              architecture.
            </p>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && searchTerm.trim()) {
                    window.location.href = `/projects?search=${encodeURIComponent(
                      searchTerm
                    )}`;
                  }
                }}
                placeholder="Search all projects..."
              />
            </div>

            <button
              className="icon-btn"
              onClick={() =>
                alert(`${recentProjects.length} saved projects in recent history.`)
              }
            >
              <Bell size={19} />
              <small>{recentProjects.length}</small>
            </button>

            <div className="user-bubble">A</div>
          </div>
        </header>

        <div className="studio-grid">
          <section className="studio-center">
            <div className="prompt-card">
              <div className="card-title-row">
                <Sparkles size={22} />
                <h2>Describe your software system</h2>
              </div>

              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Example: Build a secure online banking platform with account management, money transfers, fraud detection, loans, transaction history, and real-time notifications."
                maxLength={2500}
              />

              <div className="prompt-actions">
                <button className="soft-action" onClick={handleSmartEnhance}>
                  <Wand2 size={17} />
                  Smart Enhance
                </button>

                <button className="soft-action" onClick={handleAddConstraints}>
                  <ShieldCheck size={17} />
                  Add Constraints
                </button>

                <button className="soft-action" onClick={handleUploadDocs}>
                  <UploadCloud size={17} />
                  Upload Docs
                </button>

                <span className="char-count">{prompt.length} / 2500</span>

                <button
                  className="rich-generate-btn"
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <Sparkles size={18} />
                  {loading ? "Generating with Llama..." : "Generate Architecture"}
                </button>
              </div>
            </div>

            <div className="studio-card">
              <div className="section-heading">
                <Brain size={22} />
                <h2>AI Agent Thinking Process</h2>
              </div>

              <div className="agent-grid">
                <div className="agent-tile purple">
                  <div className="agent-top">
                    <span>1</span>
                    <FileText size={28} />
                  </div>
                  <div className="agent-line"></div>
                  <h3>Requirements Agent</h3>
                  <p>Extracts functional and non-functional requirements.</p>
                  <small>{loading ? "● Running" : result ? "● Completed" : "● Ready"}</small>
                </div>

                <div className="agent-tile blue">
                  <div className="agent-top">
                    <span>2</span>
                    <Network size={28} />
                  </div>
                  <div className="agent-line"></div>
                  <h3>Architecture Agent</h3>
                  <p>Selects architecture pattern and design decisions.</p>
                  <small>{loading ? "● Running" : result ? "● Completed" : "● Ready"}</small>
                </div>

                <div className="agent-tile green">
                  <div className="agent-top">
                    <span>3</span>
                    <Boxes size={28} />
                  </div>
                  <div className="agent-line"></div>
                  <h3>Decomposition Agent</h3>
                  <p>Breaks the system into services and components.</p>
                  <small>{loading ? "● Running" : result ? "● Completed" : "● Ready"}</small>
                </div>

                <div className="agent-tile orange">
                  <div className="agent-top">
                    <span>4</span>
                    <ShieldCheck size={28} />
                  </div>
                  <div className="agent-line"></div>
                  <h3>Validation Agent</h3>
                  <p>Reviews scalability, reliability, security and risk.</p>
                  <small>{loading ? "● Running" : result ? "● Completed" : "● Ready"}</small>
                </div>
              </div>
            </div>

            <div className="studio-card">
              <div className="section-heading">
                <Boxes size={22} />
                <h2>Architecture Overview</h2>
              </div>

              <div className="overview-grid">
                <div className="overview-card violet">
                  <Network size={34} />
                  <div>
                    <strong>{serviceCount}</strong>
                    <span>Services</span>
                  </div>
                </div>

                <div className="overview-card blue">
                  <Boxes size={34} />
                  <div>
                    <strong>{componentCount}</strong>
                    <span>Components</span>
                  </div>
                </div>

                <div className="overview-card green">
                  <Database size={34} />
                  <div>
                    <strong>{databaseCount}</strong>
                    <span>Databases</span>
                  </div>
                </div>

                <div className="overview-card orange">
                  <ShieldCheck size={34} />
                  <div>
                    <strong>{architectureScore}%</strong>
                    <span>Architecture Score</span>
                  </div>
                </div>
              </div>
            </div>

            <ProcessTabs result={result} />
          </section>

          <aside className="studio-right">
            <div className="design-card">
              <div className="design-icon">
                <Network size={28} />
              </div>

              <div>
                <h3>Architecture Design</h3>
                <p>Open the latest generated system architecture diagram.</p>
              </div>

              <Link
                className={`open-canvas-btn ${!result ? "disabled-link" : ""}`}
                to="/canvas"
                state={{ architectureJson: result?.architecture_json }}
              >
                Open Canvas
                <ExternalLink size={18} />
              </Link>
            </div>

            <div className="right-card">
              <div className="section-heading compact">
                <Sparkles size={20} />
                <h2>Quick Actions</h2>
              </div>

              <div className="quick-list">
                <button onClick={handleExportArchitecture}>
                  <Download size={22} />
                  <div>
                    <strong>Export Architecture</strong>
                    <span>Download architecture JSON</span>
                  </div>
                </button>

                <button onClick={handleDownloadReport}>
                  <FileText size={22} />
                  <div>
                    <strong>Download Report</strong>
                    <span>Download architecture TXT report</span>
                  </div>
                </button>

                <button onClick={() => alert("Design is already saved automatically in SQLite.")}>
                  <Save size={22} />
                  <div>
                    <strong>Saved Automatically</strong>
                    <span>Stored in SQLite database</span>
                  </div>
                </button>

                <button onClick={handleShareArchitecture}>
                  <Share2 size={22} />
                  <div>
                    <strong>Share Architecture</strong>
                    <span>Copy summary to clipboard</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="right-card">
              <div className="section-heading compact">
                <Clock size={20} />
                <h2>Recent Projects</h2>
              </div>

              <div className="recent-list clickable-recent-list">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      className="recent-project-btn"
                      onClick={() => handleOpenProject(project.id)}
                    >
                      <span
                        className={`dot ${
                          index % 3 === 0
                            ? "green-dot"
                            : index % 3 === 1
                            ? "blue-dot"
                            : "purple-dot"
                        }`}
                      ></span>

                      <strong>{project.project_title}</strong>
                      <small>
                        {new Date(project.created_at).toLocaleString()}
                      </small>
                    </button>
                  ))
                ) : (
                  <div>
                    <span className="dot purple-dot"></span>
                    <strong>No matching projects</strong>
                    <small>Try a different search term</small>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;