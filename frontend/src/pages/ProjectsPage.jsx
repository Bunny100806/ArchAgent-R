import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FolderKanban,
  Calendar,
  ExternalLink,
  Search,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import { getProjects, getProjectById } from "../services/api";
import "../styles/dashboard.css";

function ProjectsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      setProjects(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const openProject = async (id) => {
    try {
      const project = await getProjectById(id);

      sessionStorage.setItem(
        "latestArchitectureResult",
        JSON.stringify(project)
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to load project.");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const text = `
      ${project.project_title}
      ${project.project_description}
    `.toLowerCase();

    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="studio-layout">
      <Sidebar />

      <main className="studio-main">
        <header className="studio-topbar">
          <div>
            <h1>
              <span>Projects</span>
            </h1>

            <p>
              All saved architecture generations from SQLite history.
            </p>
          </div>
        </header>

        <div className="projects-header-bar">
          <div className="search-box">
            <Search size={18} />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
            />
          </div>

          <div className="project-counter">
            <ShieldCheck size={18} />
            {filteredProjects.length} Projects
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <button
              className="project-card"
              key={project.id}
              onClick={() => openProject(project.id)}
            >
              <div className="project-icon">
                <FolderKanban size={28} />
              </div>

              <h3>{project.project_title}</h3>

              <p>
                {project.project_description?.slice(0, 180)}
                ...
              </p>

              <div className="project-meta">
                <span>
                  <Calendar size={15} />
                  {new Date(project.created_at).toLocaleString()}
                </span>

                <strong>
                  Open <ExternalLink size={15} />
                </strong>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProjectsPage;