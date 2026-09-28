import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { sendChatMessage } from '../services/api';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const defaultSuggestedQuestions = [
  "Where was the spill detected?",
  "What is the probable source region?",
  "Why was MV Ocean Star identified as candidate?",
  "What is the forecast shoreline impact in 24h?",
  "Summarize key evidence for this case.",
  "What cleanup actions should Coast Guard take?"
];

const formatInline = (text) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} className="italic text-foreground">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
};

const renderMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    if (line.startsWith('### ')) {
      return <h3 key={idx} className="text-[13px] font-bold mt-2 mb-1 text-primary">{formatInline(line.slice(4))}</h3>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={idx} className="text-sm font-bold mt-2 mb-1 text-primary">{formatInline(line.slice(3))}</h2>;
    }
    if (line.trim().startsWith('- ')) {
      return (
        <div key={idx} className="flex gap-2 mb-1 ml-1">
          <span className="text-primary/70 mt-[2px]">•</span>
          <span className="flex-1">{formatInline(line.trim().slice(2))}</span>
        </div>
      );
    }
    if (line.trim().match(/^\d+\.\s/)) {
      const match = line.trim().match(/^(\d+\.)\s(.*)/);
      return (
        <div key={idx} className="flex gap-2 mb-1 ml-1">
          <span className="text-primary/70 mt-[2px] font-mono text-[10px]">{match[1]}</span>
          <span className="flex-1">{formatInline(match[2])}</span>
        </div>
      );
    }
    if (line.trim() === '') {
      return <div key={idx} className="h-2" />;
    }
    return <div key={idx} className="mb-1">{formatInline(line)}</div>;
  });
};

const ChatbotModal = () => {
  const {
    activeIncidentId,
    activeIncident,
    isChatOpen,
    setIsChatOpen,
    pendingChatQuery,
    setPendingChatQuery
  } = useIncident();

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I am **Spill Bot**, your marine intelligence assistant for investigation **${activeIncident?.id || 'INC-2026-001'}**.

Ask me about SAR radar segmentation, hydrodynamic backtracking, candidate vessel telemetry anomalies, or the forward drift forecast.

*How may I assist your maritime response team today?*`,
      isFallback: true,
      modelUsed: 'Spill Bot'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedChips, setSuggestedChips] = useState(defaultSuggestedQuestions.slice(0, 4));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isChatOpen]);

  // Handle external queries triggered via other buttons
  useEffect(() => {
    if (pendingChatQuery && isChatOpen) {
      handleSend(pendingChatQuery);
      setPendingChatQuery(null);
    }
  }, [pendingChatQuery, isChatOpen]);

  // Reset welcome message on incident change
  useEffect(() => {
    if (activeIncident) {
      setMessages([
        {
          id: `welcome-${activeIncident.id}`,
          sender: 'bot',
          text: `Active context switched to **${activeIncident.id} (${activeIncident.title})**.
Detected at: **${activeIncident.coordinates?.lat}°N, ${activeIncident.coordinates?.lng}°E** on **${activeIncident.displayDate}**.

Ask me about source estimation, suspect vessels, or forward drift projection for this case.`,
          isFallback: true,
          modelUsed: 'Spill Bot'
        }
      ]);
    }
  }, [activeIncidentId]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(textToSend, activeIncidentId);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        isFallback: response.isFallback,
        modelUsed: response.modelUsed
      };

      setMessages(prev => [...prev, botMsg]);
      if (response.suggestedQueries && response.suggestedQueries.length > 0) {
        setSuggestedChips(response.suggestedQueries);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `Detected spill at ${activeIncident?.coordinates?.lat}°N, ${activeIncident?.coordinates?.lng}°E with estimated area of ${activeIncident?.spillAreaKm2} km². Primary vessel candidate: ${activeIncident?.primaryCandidate}.`,
        isFallback: true,
        modelUsed: 'Local Intelligence Engine'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isChatOpen && activeIncident && (
        <div className="fixed bottom-5 right-5 z-[9999] no-print">
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Open Spill Bot"
          >
            <Bot size={28} />
          </button>
        </div>
      )}

      {/* Chat Side Drawer */}
      {isChatOpen && (
        <div className="fixed inset-y-0 right-0 w-[400px] max-w-full bg-card border-l border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 z-[9999] no-print">
          {/* Header */}
          <div className="px-4 py-3 bg-muted border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-burgundy-500/20 border border-burgundy-500/40 flex items-center justify-center text-burgundy-400">
                <Bot size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground font-mono flex items-center gap-1.5">
                  <span>SPILL BOT</span>
                  <Badge variant="amber" className="text-[9px] py-0 px-1">
                    AI
                  </Badge>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Context: <span className="text-burgundy-400 font-semibold">{activeIncidentId}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-accent transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-card scrollbar-none">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-muted-foreground">
                  {msg.sender === 'user' ? <User size={11} /> : <Bot size={11} className="text-burgundy-400" />}
                  <span>{msg.sender === 'user' ? 'Investigator' : 'Spill Bot'}</span>
                </div>

                <div
                  className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground font-medium rounded-tr-none'
                      : 'bg-muted border border-border text-foreground rounded-tl-none space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{renderMarkdown(msg.text)}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted border border-border text-xs font-mono text-muted-foreground w-fit">
                <RefreshCw size={13} className="animate-spin text-burgundy-500" />
                <span>Synthesizing multi-sensor maritime telemetry...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions */}
          <div className="px-3 py-2 bg-muted border-t border-border">
            <div className="text-[10px] font-mono text-muted-foreground mb-1.5">
              SUGGESTED INVESTIGATION QUERIES:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  disabled={loading}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-muted border border-border text-secondary-foreground hover:text-burgundy-300 hover:border-burgundy-500/40 transition-colors cursor-pointer text-left truncate max-w-[200px]"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-muted border-t border-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${activeIncidentId}...`}
              disabled={loading}
              className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-burgundy-500/60 transition-colors"
            />
            <Button
              type="submit"
              variant="hazard"
              size="sm"
              disabled={!input.trim() || loading}
              className="h-8 px-3"
            >
              <Send size={14} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotModal;
