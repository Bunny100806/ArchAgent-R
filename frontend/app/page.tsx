"use client";

import { useState } from "react";
import axios from "axios";
import {
  Bot,
  Send,
  Shield,
  Layers3,
  Sparkles,
  Workflow,
  Database,
  Cpu,
  Plus,
  Clock3,
  Copy,
  Download,
  LayoutDashboard,
} from "lucide-react";

interface Message {
  role: string;
  content: string;
}

interface Project {
  name: string;
  messages: Message[];
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      name: "Online Banking System",
      messages: [],
    },
    {
      name: "Ride Sharing Platform",
      messages: [],
    },
    {
      name: "Microservices E-Commerce",
      messages: [],
    },
  ]);

  const [activeProject, setActiveProject] = useState("Dashboard");

  const startNewConversation = () => {
    setMessages([]);
    setPrompt("");
    setActiveProject("Dashboard");
  };

  const loadProject = (projectName: string) => {
    const selectedProject = projects.find(
      (project) => project.name === projectName
    );

    if (selectedProject) {
      setMessages(selectedProject.messages);
      setActiveProject(selectedProject.name);
    }
  };

  const useTemplate = (text: string) => {
    setPrompt(text);
  };

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: prompt,
      },
    ];

    setMessages(updatedMessages);

    const currentPrompt = prompt;

    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        messages: updatedMessages,
      });

      const assistantMessage = {
        role: "assistant",
        content: res.data.response,
      };

      const finalMessages = [...updatedMessages, assistantMessage];

      setMessages(finalMessages);

      if (activeProject === "Dashboard") {
        const newProjectName = currentPrompt.slice(0, 30);

        const newProject = {
          name: newProjectName,
          messages: finalMessages,
        };

        setProjects([newProject, ...projects]);
        setActiveProject(newProjectName);
      } else {
        setProjects(
          projects.map((project) =>
            project.name === activeProject
              ? {
                  ...project,
                  messages: finalMessages,
                }
              : project
          )
        );
      }
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Error connecting to backend.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-black">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-[290px] border-r border-gray-200 bg-white flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  A
                </div>

                <div>
                  <h1 className="font-bold text-2xl tracking-tight">
                    ArchAgent-R
                  </h1>
                  <p className="text-sm text-gray-500">
                    AI Architecture Assistant
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <button
                onClick={startNewConversation}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-3 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                New Conversation
              </button>
            </div>

            <div className="px-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
                <Clock3 size={14} />
                Recent Projects
              </div>

              <div className="space-y-3">
                {projects.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => loadProject(item.name)}
                    className={`transition-all cursor-pointer rounded-2xl p-4 border ${
                      activeProject === item.name
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 hover:bg-blue-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Architecture discussion
                        </p>
                      </div>

                      <span className="text-[11px] text-gray-400">
                        2h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 mt-8">
              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={18} />
                  <h3 className="font-semibold">Multi-Agent Mode</h3>
                </div>

                <p className="text-sm text-blue-100 leading-relaxed">
                  Enable collaborative AI agents for advanced architecture
                  reasoning and validation.
                </p>

                <button className="mt-5 bg-white text-blue-700 font-medium px-4 py-2 rounded-xl w-full hover:bg-blue-50 transition-all">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 text-xs text-gray-400 border-t border-gray-100">
            ArchAgent-R © 2026
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <div className="h-[78px] bg-white border-b border-gray-200 px-10 flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <LayoutDashboard className="text-blue-600" size={22} />
                {activeProject}
              </div>

              <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
                <button className="hover:text-blue-600 transition-all">
                  Templates
                </button>
                <button className="hover:text-blue-600 transition-all">
                  Architecture Patterns
                </button>
                <button className="hover:text-blue-600 transition-all">
                  Evaluation
                </button>
              </nav>
            </div>

            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-lg">
              S
            </div>
          </div>

          {/* Hero */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-12 py-14 text-white">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

            <div className="relative z-10 max-w-5xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
                <Sparkles size={16} />
                AI-Powered Architecture Reasoning Platform
              </div>

              <h1 className="text-6xl font-black leading-tight max-w-4xl tracking-tight">
                Build Intelligent Software Architectures With Conversational AI
              </h1>

              <p className="text-blue-100 text-xl mt-6 max-w-3xl leading-relaxed">
                Transform plain English requirements into scalable software architectures, cloud deployment strategies, and intelligent AI-driven system designs.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                {[
                  {
                    icon: Layers3,
                    label: "Microservices Reasoning",
                  },
                  {
                    icon: Shield,
                    label: "Security Analysis",
                  },
                  {
                    icon: Workflow,
                    label: "Scalability Planning",
                  },
                  {
                    icon: Database,
                    label: "Architecture Validation",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => useTemplate(item.label)}
                    className="bg-white/15 hover:bg-white/25 transition-all backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-3"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-hidden p-8">
            <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm h-full flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fafcff]">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center px-8">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl mb-8">
                      <Cpu size={42} />
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 max-w-2xl leading-tight">
                      Your AI Software Architecture Workspace
                    </h2>

                    <p className="mt-5 text-lg text-gray-500 max-w-2xl leading-relaxed">
                      Generate enterprise-grade architectures, interactive system decompositions, and cloud-native infrastructure plans through conversational AI collaboration.
                    </p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-3xl p-6 shadow-sm border whitespace-pre-wrap leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500"
                          : "bg-white border-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold">
                          <Bot size={18} />
                          ArchAgent-R
                        </div>
                      )}

                      <div className="text-[15px]">{msg.content}</div>

                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 text-sm">
                          <button className="flex items-center gap-2 hover:text-blue-600 transition-all">
                            <Copy size={15} />
                            Copy
                          </button>

                          <button className="flex items-center gap-2 hover:text-blue-600 transition-all">
                            <Download size={15} />
                            Export
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-3xl px-6 py-5 shadow-sm flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500 animate-bounce" />
                      <div className="h-3 w-3 rounded-full bg-blue-500 animate-bounce delay-150" />
                      <div className="h-3 w-3 rounded-full bg-blue-500 animate-bounce delay-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 bg-white p-6">
                <div className="rounded-3xl border border-gray-200 bg-[#fafcff] p-4 flex items-end gap-4 shadow-sm">
                  <textarea
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendPrompt();
                      }
                    }}
                    className="flex-1 bg-transparent outline-none resize-none text-gray-800 placeholder:text-gray-400 text-[15px] leading-relaxed min-h-[80px]"
                    placeholder="Describe your software idea, APIs, scalability goals, cloud requirements, or refine the architecture..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />

                  <button
                    onClick={sendPrompt}
                    className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                  >
                    <Send size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    "Build scalable banking system",
                    "Generate microservices architecture",
                    "Add Kafka event streaming",
                    "Suggest cloud infrastructure",
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => useTemplate(item)}
                      className="px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 text-sm transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
