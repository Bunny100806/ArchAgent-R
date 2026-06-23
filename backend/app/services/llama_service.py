import requests

OLLAMA_URL = "http://127.0.0.1:11434/api/generate"
MODEL_NAME = "llama3.2:3b"


def call_llama(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.4,
            "num_predict": 650
        }
    }

    try:
        response = requests.post(
            OLLAMA_URL,
            json=payload,
            timeout=180
        )

        response.raise_for_status()

        return response.json().get("response", "").strip()

    except requests.exceptions.RequestException as error:
        return f"ERROR: Llama request failed: {error}"