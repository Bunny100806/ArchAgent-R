import {
  LayoutDashboard,
  Network,
  FolderKanban,
  Bookmark,
  Settings,
  Plus,
  Sparkles,
  LogOut,
  UserCircle,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("archagent_user") || "{}"
  );

  const isActive = (path) =>
    location.pathname === path
      ? "nav-item active"
      : "nav-item";

  const handleLogout = () => {
    localStorage.removeItem("archagent_user");
    sessionStorage.removeItem("latestArchitectureResult");

    window.location.href = "/";
  };

  return (
    <aside className="premium-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Sparkles size={24} />
        </div>

        <div>
          <h1>ArchAgent-R</h1>
          <span>AI Architecture Studio</span>
        </div>
      </div>

      <Link to="/dashboard" className="premium-new-btn">
        <Plus size={20} />
        New Architecture
      </Link>

      <div className="sidebar-section-title">
        WORKSPACE
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={isActive("/dashboard")}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/canvas"
          className={isActive("/canvas")}
        >
          <Network size={20} />
          Architecture Canvas
        </Link>

        <Link
          to="/projects"
          className={isActive("/projects")}
        >
          <FolderKanban size={20} />
          Projects
        </Link>

        <Link
          to="/saved"
          className={isActive("/saved")}
        >
          <Bookmark size={20} />
          Saved Designs
        </Link>
      </nav>

      <div className="sidebar-section-title">
        SYSTEM
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/settings"
          className={isActive("/settings")}
        >
          <Settings size={20} />
          Settings
        </Link>

        <button
          className="nav-item logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>

      <div className="sidebar-status-card premium-status-card">
        <h3>System Status</h3>

        <div className="status-pill orange-pill">
          <span>Mode</span>
          <strong>Real Llama</strong>
        </div>

        <div className="status-pill purple-pill">
          <span>Model</span>
          <strong>Llama 3.2</strong>
        </div>

        <div className="status-pill blue-pill">
          <span>Storage</span>
          <strong>SQLite</strong>
        </div>
      </div>

      <div className="sidebar-profile clean-profile">
        <div className="profile-top">
          <div className="avatar">
            <UserCircle size={22} />
          </div>

          <div>
            <strong>
              {user.email || "Guest User"}
            </strong>

            <span>
              Authenticated Workspace
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;