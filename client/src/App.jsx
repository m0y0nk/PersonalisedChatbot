import { useState, useRef, useEffect } from "react";
import "./App.css";

// ─── Persona Config ──────────────────────────────────────────────
const PERSONAS = {
  anshuman: {
    id: "anshuman",
    name: "Anshuman Singh",
    emoji: "⚡",
    tagline: "Quality trumps Quantity. Master the fundamentals.",
    suggestions: [
      "How do I stay consistent with coding?",
      "How to improve problem solving?",
      "I keep procrastinating — help!",
    ],
  },
  abhimanyu: {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    emoji: "🚀",
    tagline: "Visionary entrepreneur & strategic thinker",
    suggestions: [
      "How should I think about long-term growth?",
      "What systems help build consistency?",
      "How do I stand out in tech?",
    ],
  },
  kshitij: {
    id: "kshitij",
    name: "Kshitij Mishra",
    emoji: "🎯",
    tagline: "Friendly, relatable, makes learning easy",
    suggestions: [
      "Explain recursion in simple terms",
      "How to start coding from scratch?",
      "How do I build daily study habits?",
    ],
  },
};

const API_URL = "https://personalisedchatbot.onrender.com";

// ─── Send Icon SVG ───────────────────────────────────────────────
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

// ─── App Component ───────────────────────────────────────────────
function App() {
  const [activePersona, setActivePersona] = useState("anshuman");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const persona = PERSONAS[activePersona];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on persona switch
  useEffect(() => {
    inputRef.current?.focus();
  }, [activePersona]);

  // ─── Switch Persona ──────────────────────────────────────────
  const switchPersona = (personaId) => {
    if (personaId === activePersona) return;
    setActivePersona(personaId);
    setMessages([]);
    setInput("");
  };

  // ─── Send Message ────────────────────────────────────────────
  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const targetUrl = new URL("/chat", API_URL).toString();
      console.log("Fetching from:", targetUrl);
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          persona: activePersona,
        }),
      });

      if (!res.ok) {
        // Try to parse error message, fallback to status text
        let errorMsg = "Server error";
        try {
          const errorData = await res.json();
          errorMsg = errorData.userMessage || errorData.error || errorMsg;
        } catch (e) {
          errorMsg = `Error ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          content:
            err.message === "Failed to fetch"
              ? "Cannot reach the server. Make sure the backend is running."
              : err.message || "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ─── Handle Key Press ────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── Retry Last Failed Message ───────────────────────────────
  const retryLastMessage = () => {
    // Remove the error message and get the last user message
    const withoutError = messages.filter((m) => m.role !== "error");
    const lastUserMsg = [...withoutError].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      setMessages(withoutError.slice(0, -1));
      sendMessage(lastUserMsg.content);
    }
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className={`app-wrapper persona-${activePersona}`}>
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <h1>Persona Chat</h1>

          {/* Persona Tabs */}
          <div className="persona-tabs" id="persona-tabs">
            {Object.values(PERSONAS).map((p) => (
              <button
                key={p.id}
                id={`tab-${p.id}`}
                className={`persona-tab ${activePersona === p.id ? "active" : ""}`}
                onClick={() => switchPersona(p.id)}
              >
                <span className="tab-emoji">{p.emoji}</span>
                <span className="tab-name">{p.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Persona Banner */}
        <div className="active-persona-banner" id="active-persona">
          <div className="active-dot" />
          <span>
            Chatting with {persona.name}
          </span>
        </div>

        {/* Messages */}
        <div className="chat-messages" id="chat-messages">
          {messages.length === 0 && !loading ? (
            <div className="empty-state">
              <div className="empty-emoji">{persona.emoji}</div>
              <h2>{persona.name}</h2>
              <p>{persona.tagline}</p>
              <p>Ask a question or pick a suggestion below to start chatting.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => {
                if (msg.role === "error") {
                  return (
                    <div key={i} className="message message-error">
                      <div className="error-content">
                        <span>⚠️ {msg.content}</span>
                        <button
                          className="retry-btn"
                          onClick={retryLastMessage}
                          id="retry-btn"
                        >
                          ↻ Retry
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={i}
                    className={`message ${msg.role === "user" ? "message-user" : "message-bot"
                      }`}
                  >
                    {msg.content}
                  </div>
                );
              })}
            </>
          )}

          {/* Typing Indicator */}
          {loading && (
            <div className="typing-indicator" id="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 0 && (
          <div className="suggestion-chips" id="suggestion-chips">
            {persona.suggestions.map((s, i) => (
              <button
                key={i}
                className="suggestion-chip"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="chat-input-area">
          <div className="input-wrapper">
            <input
              ref={inputRef}
              className="chat-input"
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${persona.name.split(" ")[0]} something...`}
              disabled={loading}
              autoComplete="off"
            />
            <button
              className="send-btn"
              id="send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              title="Send message"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
