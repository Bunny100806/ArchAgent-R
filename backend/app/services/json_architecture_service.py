import json
import re
from app.services.llama_service import call_llama


ALLOWED_NODE_TYPES = {
    "actor",
    "frontend",
    "gateway",
    "service",
    "database",
    "cache",
    "message_queue",
    "external",
    "ai",
}


def make_id(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")


def extract_json_block(text: str):
    match = re.search(r"\{[\s\S]*\}", text)

    if not match:
        raise ValueError("No JSON object found in Llama response.")

    return json.loads(match.group(0))


def normalize_architecture_json(data: dict, project_title: str):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    clean_nodes = []
    valid_ids = set()

    for node in nodes:
        label = str(node.get("label", "Component")).strip()
        node_type = str(node.get("type", "service")).strip()

        if node_type not in ALLOWED_NODE_TYPES:
            node_type = "service"

        node_id = node.get("id") or make_id(label)
        node_id = make_id(str(node_id))

        if not node_id:
            node_id = f"node_{len(clean_nodes) + 1}"

        if node_id in valid_ids:
            node_id = f"{node_id}_{len(clean_nodes) + 1}"

        valid_ids.add(node_id)

        clean_nodes.append({
            "id": node_id,
            "label": label,
            "type": node_type
        })

    clean_edges = []
    edge_count = 1

    for edge in edges:
        source = make_id(str(edge.get("source", "")))
        target = make_id(str(edge.get("target", "")))

        if source in valid_ids and target in valid_ids and source != target:
            clean_edges.append({
                "id": f"e{edge_count}",
                "source": source,
                "target": target,
                "label": str(edge.get("label", "connects")).strip()
            })
            edge_count += 1

    if not clean_nodes:
        clean_nodes = [
            {"id": "user", "label": "User", "type": "actor"},
            {"id": "frontend", "label": "Frontend App", "type": "frontend"},
            {"id": "gateway", "label": "API Gateway", "type": "gateway"},
            {"id": "service", "label": "Core Service", "type": "service"},
            {"id": "database", "label": "Database", "type": "database"},
        ]

        clean_edges = [
            {"id": "e1", "source": "user", "target": "frontend", "label": "uses"},
            {"id": "e2", "source": "frontend", "target": "gateway", "label": "API"},
            {"id": "e3", "source": "gateway", "target": "service", "label": "routes"},
            {"id": "e4", "source": "service", "target": "database", "label": "stores data"},
        ]

    return {
        "domain": data.get("domain", "custom"),
        "pattern": data.get("pattern", "Microservices Architecture"),
        "summary": data.get("summary", f"Generated architecture for {project_title}"),
        "nodes": clean_nodes,
        "edges": clean_edges,
        "technology_stack": {
            "frontend": data.get("technology_stack", {}).get("frontend", "React"),
            "backend": data.get("technology_stack", {}).get("backend", "FastAPI"),
            "database": data.get("technology_stack", {}).get("database", "PostgreSQL"),
            "cache": data.get("technology_stack", {}).get("cache", "Redis"),
            "message_queue": data.get("technology_stack", {}).get("message_queue", "RabbitMQ"),
            "monitoring": data.get("technology_stack", {}).get("monitoring", "Prometheus / Grafana"),
            "ai_model": "Llama 3.2 via Ollama"
        }
    }


def generate_llama_architecture_json(project_title: str, project_description: str):
    prompt = f"""
You are an expert software architect.

Generate ONLY valid JSON. Do not write markdown. Do not explain.

Project Title:
{project_title}

Project Description:
{project_description}

Return this exact JSON structure:

{{
  "domain": "short domain name",
  "pattern": "architecture pattern",
  "summary": "one sentence summary",
  "nodes": [
    {{"id": "user", "label": "User", "type": "actor"}},
    {{"id": "frontend", "label": "Web or Mobile Frontend", "type": "frontend"}},
    {{"id": "gateway", "label": "API Gateway", "type": "gateway"}}
  ],
  "edges": [
    {{"source": "user", "target": "frontend", "label": "uses"}},
    {{"source": "frontend", "target": "gateway", "label": "API requests"}}
  ],
  "technology_stack": {{
    "frontend": "React",
    "backend": "FastAPI",
    "database": "PostgreSQL",
    "cache": "Redis",
    "message_queue": "RabbitMQ",
    "monitoring": "Prometheus / Grafana"
  }}
}}

Rules:
- Use 8 to 14 nodes.
- Use project-specific service names.
- Allowed node types only: actor, frontend, gateway, service, database, cache, message_queue, external, ai.
- Every edge source and target must match an existing node id.
- Node ids must be lowercase snake_case.
- Include database, cache, message_queue, external integration, and monitoring when useful.
- Do not include markdown fences.
- Return JSON only.
"""

    raw_output = call_llama(prompt)

    try:
      parsed = extract_json_block(raw_output)
      return normalize_architecture_json(parsed, project_title)

    except Exception:
      return normalize_architecture_json({}, project_title)