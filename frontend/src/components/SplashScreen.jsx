import {
  BrainCircuit,
  FileText,
  Network,
  Boxes,
  ShieldCheck,
  Sparkles,
  Cpu,
  Database,
  GitBranch,
  Zap,
  Layers3,
  Radar,
  Server,
  Workflow,
  CheckCircle2,
} from "lucide-react";

function SplashScreen() {
  const agents = [
    {
      icon: <FileText size={19} />,
      title: "Requirements Agent",
      text: "Extracting functional requirements, NFRs, roles and constraints",
      status: "ONLINE",
    },
    {
      icon: <Network size={19} />,
      title: "Architecture Agent",
      text: "Selecting architecture pattern and reasoning strategy",
      status: "ONLINE",
    },
    {
      icon: <Boxes size={19} />,
      title: "Decomposition Agent",
      text: "Mapping services, databases, APIs and communication flows",
      status: "ONLINE",
    },
    {
      icon: <ShieldCheck size={19} />,
      title: "Validation Agent",
      text: "Checking scalability, reliability, security and maintainability",
      status: "ONLINE",
    },
  ];

  return (
    <div className="ultra-splash">
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="aurora aurora-three"></div>

      <div className="splash-grid"></div>

      <div className="ultra-shell">
        <section className="ultra-left">
          <div className="splash-chip">
            <Radar size={17} />
            Agentic Software Architecture Reasoning
          </div>

          <h1>
            ArchAgent<span>-R</span>
          </h1>

          <p className="splash-subtitle">
            A multi-agent AI studio that converts high-level project ideas into
            architecture plans, design decisions, review reports and interactive
            system diagrams.
          </p>

          <div className="mission-panel">
            <div className="mission-item">
              <div className="mission-icon violet">
                <Workflow size={21} />
              </div>
              <div>
                <strong>Architecture Plan</strong>
                <span>Requirements, users, constraints and goals</span>
              </div>
            </div>

            <div className="mission-item">
              <div className="mission-icon pink">
                <Layers3 size={21} />
              </div>
              <div>
                <strong>Architecture Design</strong>
                <span>Patterns, services, databases and stack</span>
              </div>
            </div>

            <div className="mission-item">
              <div className="mission-icon orange">
                <ShieldCheck size={21} />
              </div>
              <div>
                <strong>Architecture Review</strong>
                <span>Quality, risks, improvements and scores</span>
              </div>
            </div>
          </div>

          <div className="boot-status-row">
            <span>Initializing architecture intelligence engine</span>
            <strong>Launching</strong>
          </div>

          <div className="premium-loader">
            <span></span>
          </div>

          <div className="tech-pill-row">
            <div>
              <Cpu size={15} />
              Llama 3.2
            </div>
            <div>
              <Zap size={15} />
              FastAPI
            </div>
            <div>
              <Network size={15} />
              React Flow
            </div>
            <div>
              <Database size={15} />
              SQLite
            </div>
          </div>
        </section>

        <section className="ultra-right">
          <div className="core-system">
            <div className="orb-ring ring-a"></div>
            <div className="orb-ring ring-b"></div>
            <div className="orb-ring ring-c"></div>

            <div className="core-glass">
              <BrainCircuit size={70} />
              <span>AI CORE</span>
            </div>

            <div className="satellite satellite-one">
              <FileText size={17} />
            </div>

            <div className="satellite satellite-two">
              <Network size={17} />
            </div>

            <div className="satellite satellite-three">
              <Boxes size={17} />
            </div>

            <div className="satellite satellite-four">
              <ShieldCheck size={17} />
            </div>
          </div>

          <div className="agent-console">
            <div className="console-header">
              <span></span>
              <span></span>
              <span></span>
              <strong>agent_boot.sequence</strong>
            </div>

            <div className="console-body">
              {agents.map((agent, index) => (
                <div
                  className={`console-agent console-agent-${index + 1}`}
                  key={agent.title}
                >
                  <div className="console-icon">{agent.icon}</div>

                  <div className="console-info">
                    <strong>{agent.title}</strong>
                    <small>{agent.text}</small>
                  </div>

                  <div className="console-status">
                    <CheckCircle2 size={15} />
                    {agent.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="bottom-launch-text">
        <Cpu size={16} />
        Preparing workspace · Loading agent memory · Starting architecture canvas
      </div>
    </div>
  );
}

export default SplashScreen;