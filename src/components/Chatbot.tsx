"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Message[]>([
    { role: "assistant", text: "Welcome to Havilah. Ask me anything about our cinematic productions, services, academy, or internships." }
  ]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: "user", text: textToSend };
    setHistory((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const chatHistory = history.map((h) => ({
        role: h.role,
        text: h.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history: chatHistory }),
      });

      const data = await res.json();
      const replyMsg: Message = { role: "assistant", text: data.reply || "No response received." };
      setHistory((prev) => [...prev, replyMsg]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        { role: "assistant", text: "I'm having trouble connecting to the server. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Tell me about wedding projects",
    "Explore Academy courses",
    "How to rent soundstages",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label="Toggle Chatbot"
            className="w-14 h-14 rounded-full bg-accent text-background flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[360px] sm:w-[400px] h-[500px] rounded-2xl border border-border bg-surface/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-background/80 px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent flex items-center justify-center text-accent">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text uppercase tracking-wider block">Havilah Assistant</h4>
                  <span className="text-[9px] text-accent font-semibold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Active Client Mode
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-text/40 hover:text-text hover:bg-border/30 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
              {history.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-background font-semibold rounded-tr-none"
                        : "bg-background border border-border text-text/80 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border text-text/50 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips & Inputs Footer */}
            <div className="p-4 bg-background/50 border-t border-border flex flex-col gap-3">
              {history.length === 1 && (
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s)}
                      className="text-[9px] font-bold text-accent border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full hover:bg-accent hover:text-background transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(message);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask anything about Havilah..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow px-3 py-2 bg-background border border-border text-xs rounded-xl focus:outline-none focus:border-accent text-text"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-accent text-background hover:bg-accent-hover transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
