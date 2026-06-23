import { useState } from "react";
import {
  FileText,
  Network,
  Boxes,
  ShieldCheck,
  Cpu,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

import ArchitectureChat from "./ArchitectureChat";

function ProcessTabs({ result }) {
  const [activeTab, setActiveTab] = useState("plan");

  if (!result) {
    return (
      <div className="studio-card process-card">
        <div className="section-heading">
          <ClipboardList size={22} />
          <h2>Architecture Output</h2>
        </div>

        <p className="empty-process-text">
          After generation, ArchAgent-R will show the architecture plan, design,
          decomposition, review, technology stack, final report, and AI chat here.
        </p>
      </div>
    );
  }

  const techStack = result.architecture_json?.technology_stack
    ? JSON.stringify(result.architecture_json.technology_stack, null, 2)
    : "Technology stack not available.";

  const finalReport = `
ARCHAGENT-R ARCHITECTURE REPORT
================================

PROJECT:
${result.project_title}

DESCRIPTION:
${result.project_description}

ARCHITECTURE PLAN:
${result.requirements_output}

ARCHITECTURE DESIGN:
${result.architecture_output}

SYSTEM DECOMPOSITION:
${result.decomposition_output}

ARCHITECTURE REVIEW:
${result.validation_output}

TECHNOLOGY STACK:
${techStack}

EVALUATION SCORES:
${JSON.stringify(result.evaluation_scores || {}, null, 2)}
`;

  const tabs = [
    {
      id: "plan",
      label: "Plan",
      icon: <FileText size={16} />,
      title: "Architecture Plan",
      content: result.requirements_output,
      type: "text",
    },
    {
      id: "design",
      label: "Design",
      icon: <Network size={16} />,
      title: "Architecture Design",
      content: result.architecture_output,
      type: "text",
    },
    {
      id: "components",
      label: "Components",
      icon: <Boxes size={16} />,
      title: "System Decomposition",
      content: result.decomposition_output,
      type: "text",
    },
    {
      id: "review",
      label: "Review",
      icon: <ShieldCheck size={16} />,
      title: "Architecture Review",
      content: result.validation_output,
      type: "text",
    },
    {
      id: "stack",
      label: "Tech Stack",
      icon: <Cpu size={16} />,
      title: "Technology Stack",
      content: techStack,
      type: "text",
    },
    {
      id: "report",
      label: "Final Report",
      icon: <ClipboardList size={16} />,
      title: "Final Architecture Report",
      content: finalReport,
      type: "text",
    },
    {
      id: "chat",
      label: "AI Chat",
      icon: <MessageCircle size={16} />,
      title: "AI Architecture Chat",
      type: "chat",
    },
  ];

  const selected = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="studio-card process-card">
      <div className="section-heading">
        <ClipboardList size={22} />
        <h2>Architecture Output</h2>
      </div>

      <div className="process-tabs premium-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active-tab" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {selected.type === "chat" ? (
        <ArchitectureChat architecture={result.architecture_json} />
      ) : (
        <div className="process-output premium-output">
          <h3>{selected.title}</h3>
          <pre>{selected.content}</pre>
        </div>
      )}
    </div>
  );
}

export default ProcessTabs;