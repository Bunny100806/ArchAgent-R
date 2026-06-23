import { Handle, Position } from "reactflow";
import {
  User,
  MonitorSmartphone,
  Network,
  Box,
  Database,
  Server,
  Cpu,
  KeyRound,
  ShoppingCart,
  CreditCard,
  Bell,
  Package,
  Layers3,
  Map,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
} from "lucide-react";

const colorMap = {
  actor: ["#dbeafe", "#60a5fa"],
  frontend: ["#cffafe", "#06b6d4"],
  gateway: ["#ede9fe", "#8b5cf6"],
  service: ["#dcfce7", "#22c55e"],
  database: ["#ffedd5", "#f97316"],
  cache: ["#fef9c3", "#eab308"],
  message_queue: ["#fbcfe8", "#ec4899"],
  external: ["#e2e8f0", "#64748b"],
  ai: ["#e0e7ff", "#6366f1"],
};

function getIcon(label = "", type = "") {
  const text = `${label} ${type}`.toLowerCase();

  if (type === "actor") return User;
  if (type === "frontend") return MonitorSmartphone;
  if (type === "gateway") return Network;
  if (type === "database") return Database;
  if (type === "cache") return Cpu;
  if (type === "message_queue") return Layers3;
  if (type === "external") return Server;
  if (type === "ai") return Cpu;

  if (text.includes("auth") || text.includes("account")) return KeyRound;
  if (text.includes("cart") || text.includes("order")) return ShoppingCart;
  if (text.includes("payment") || text.includes("transaction")) return CreditCard;
  if (text.includes("notification")) return Bell;
  if (text.includes("product") || text.includes("catalog")) return Package;
  if (text.includes("location") || text.includes("map") || text.includes("trip")) return Map;
  if (text.includes("fraud") || text.includes("security") || text.includes("threat")) return ShieldCheck;
  if (text.includes("patient") || text.includes("doctor") || text.includes("pharmacy")) return Stethoscope;
  if (text.includes("course") || text.includes("student") || text.includes("quiz")) return GraduationCap;

  return Box;
}

function ArchitectureNode({ data }) {
  const Icon = getIcon(data.label, data.type);
  const colors = colorMap[data.type] || colorMap.service;

  return (
    <div
      style={{
        width: "260px",
        minHeight: "96px",
        padding: "18px",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        border: "2px solid rgba(255,255,255,0.9)",
        boxShadow:
          "0 24px 48px rgba(15,23,42,0.18), 0 0 34px rgba(124,77,255,0.20)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 12,
          height: 12,
          background: "#7c4dff",
          border: "3px solid white",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          right: "-60px",
          top: "-70px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.35)",
          filter: "blur(35px)",
        }}
      />

      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "rgba(15,23,42,0.25)",
          backdropFilter: "blur(12px)",
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        <Icon size={24} />
      </div>

      <div style={{ zIndex: 2 }}>
        <div
          style={{
            color: "#0f172a",
            fontSize: "17px",
            fontWeight: 950,
            lineHeight: 1.2,
          }}
        >
          {data.label}
        </div>

        <div
          style={{
            marginTop: "7px",
            color: "rgba(15,23,42,0.65)",
            fontSize: "11px",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "1.2px",
          }}
        >
          {data.type}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 12,
          height: 12,
          background: "#7c4dff",
          border: "3px solid white",
        }}
      />
    </div>
  );
}

export default ArchitectureNode;