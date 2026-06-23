import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CanvasPage from "./pages/CanvasPage";
import ProjectsPage from "./pages/ProjectsPage";
import SavedDesignsPage from "./pages/SavedDesignsPage";
import SettingsPage from "./pages/SettingsPage";
import SplashScreen from "./components/SplashScreen";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("archagent_user");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [showSplash, setShowSplash] = useState(
    sessionStorage.getItem("archagentSplashShown") !== "true"
  );

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("archagentSplashShown", "true");
      setShowSplash(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/canvas"
          element={
            <ProtectedRoute>
              <CanvasPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedDesignsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;