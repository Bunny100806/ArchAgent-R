import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import ArchitectureNode from "./ArchitectureNode";

const nodeTypes = {
  architectureNode: ArchitectureNode,
};

function layoutNodes(nodes = []) {
  const typeGroups = {};

  nodes.forEach((node) => {
    const type = node.type || "service";
    if (!typeGroups[type]) typeGroups[type] = [];
    typeGroups[type].push(node);
  });

  const layers = [
    { type: "actor", y: 40, gap: 320 },
    { type: "frontend", y: 190, gap: 320 },
    { type: "gateway", y: 340, gap: 320 },
    { type: "service", y: 550, gap: 320 },
    { type: "cache", y: 800, gap: 330 },
    { type: "database", y: 800, gap: 330 },
    { type: "message_queue", y: 800, gap: 330 },
    { type: "external", y: 1040, gap: 330 },
    { type: "ai", y: 1040, gap: 330 },
  ];

  const positioned = [];

  layers.forEach((layer) => {
    const group = typeGroups[layer.type] || [];
    let startX = 800 - ((group.length - 1) * layer.gap) / 2;

    if (["cache", "database", "message_queue"].includes(layer.type)) {
      if (layer.type === "cache") startX = 470;
      if (layer.type === "database") startX = 800;
      if (layer.type === "message_queue") startX = 1130;

      group.forEach((node) => {
        positioned.push({
          id: node.id,
          type: "architectureNode",
          position: { x: startX, y: layer.y },
          data: {
            label: node.label,
            type: node.type,
          },
        });
      });

      return;
    }

    if (["external", "ai"].includes(layer.type)) {
      if (layer.type === "external") startX = 620;
      if (layer.type === "ai") startX = 980;
    }

    group.forEach((node, index) => {
      positioned.push({
        id: node.id,
        type: "architectureNode",
        position: {
          x: startX + index * layer.gap,
          y: layer.y,
        },
        data: {
          label: node.label,
          type: node.type,
        },
      });
    });
  });

  return positioned;
}

function layoutEdges(edges = []) {
  return edges.map((edge, index) => ({
    id: edge.id || `e${index + 1}`,
    source: edge.source,
    target: edge.target,
    label: edge.label || "connects",
    animated: true,
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#7c4dff",
      width: 18,
      height: 18,
    },
    style: {
      strokeWidth: 3,
      stroke: "#7c4dff",
      strokeDasharray: "8 8",
    },
    labelStyle: {
      fontWeight: 900,
      fill: "#334155",
      fontSize: 12,
    },
    labelBgStyle: {
      fill: "#ffffff",
      fillOpacity: 0.95,
    },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 12,
  }));
}

function FlowContent({ architectureJson }) {
  const { fitView } = useReactFlow();

  const nodes = layoutNodes(architectureJson?.nodes || []);
  const edges = layoutEdges(architectureJson?.edges || []);

  useEffect(() => {
    window.archagentFitView = () => {
      fitView({
        padding: 0.2,
        minZoom: 0.32,
        maxZoom: 0.75,
        duration: 600,
      });
    };

    const timer = setTimeout(() => {
      window.archagentFitView();
    }, 250);

    return () => {
      clearTimeout(timer);
      delete window.archagentFitView;
    };
  }, [fitView, architectureJson]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{
        padding: 0.2,
        minZoom: 0.32,
        maxZoom: 0.75,
      }}
      minZoom={0.18}
      maxZoom={1.4}
    >
      <Background gap={24} size={1.2} color="#d8b4fe" />
      <Controls />
      <MiniMap zoomable pannable />
    </ReactFlow>
  );
}

function DiagramCanvas({ architectureJson }) {
  return (
    <div className="diagram-card premium-diagram-card">
      <div className="architecture-zone zone-presentation">
        Presentation Layer
      </div>

      <div className="architecture-zone zone-service">
        Application Services Layer
      </div>

      <div className="architecture-zone zone-data">
        Data & Messaging Layer
      </div>

      <div className="architecture-zone zone-infra">
        External Integration & Monitoring Layer
      </div>

      <div className="canvas-header">
        <div>
          <h3>Architecture Canvas</h3>
          <p>{architectureJson?.pattern || "Generated system architecture"}</p>
        </div>

        <span className="pattern-badge">
          {architectureJson?.domain || "architecture"}
        </span>
      </div>

      <div className="flow-wrapper premium-flow-wrapper">
        <ReactFlowProvider>
          <FlowContent architectureJson={architectureJson} />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default DiagramCanvas;