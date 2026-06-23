import { useState } from "react";
import { Send, MessageCircle, Bot, UserCircle } from "lucide-react";
import { chatWithArchitecture } from "../services/api";
import "../styles/dashboard.css";

function ArchitectureChat({ architecture }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ask me about scalability, security, technology choices, risks, or improvements for this architecture.",
    },
  ]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (!architecture) {
      alert("Generate an architecture first.");
      return;
    }

    const userMessage = {
      role: "user",
      text: message,
    };

    const currentMessage = message;

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await chatWithArchitecture(
        architecture,
        currentMessage
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.reply || "No response received.",
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("Chat failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="architecture-chat-card">
      <div className="architecture-chat-title">
        <MessageCircle size={22} />
        <div>
          <h2>AI Architecture Chat</h2>
          <p>Ask questions about the generated design.</p>
        </div>
      </div>

      <div className="architecture-chat-messages">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`chat-message ${
              item.role === "user" ? "user-message" : "assistant-message"
            }`}
          >
            <div className="chat-avatar">
              {item.role === "user" ? (
                <UserCircle size={20} />
              ) : (
                <Bot size={20} />
              )}
            </div>

            <p>{item.text}</p>
          </div>
        ))}

        {loading && (
          <div className="chat-message assistant-message">
            <div className="chat-avatar">
              <Bot size={20} />
            </div>
            <p>Thinking about the architecture...</p>
          </div>
        )}
      </div>

      <div className="architecture-chat-input">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          placeholder="Ask: Can this scale to 10 million users?"
        />

        <button onClick={sendMessage} disabled={loading}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ArchitectureChat;