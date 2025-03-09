"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Send,
  X,
  Minimize,
  Maximize,
  Phone,
  Video,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate agent response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll look into that for you.",
        "I understand your concern. Let me help you with that.",
        "Great question! Here's what you need to know...",
        "I'm checking our system for that information now.",
        "Is there anything else you'd like to know about our email marketing platform?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "agent",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
      >
        <MessageSquare size={24} />
      </Button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-background border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${isMinimized ? "w-72 h-16" : "w-80 sm:w-96 h-[500px]"}`}
    >
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">Customer Support</h3>
            <p className="text-xs opacity-80">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!isMinimized ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-primary-foreground opacity-80 hover:opacity-100"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize size={16} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-primary-foreground opacity-80 hover:opacity-100"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-primary-foreground opacity-80 hover:opacity-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="p-3 overflow-y-auto h-[calc(100%-120px)] bg-muted/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "agent" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Actions */}
          <div className="p-2 flex gap-2 items-center border-t">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={message.trim() === ""}
            >
              <Send size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
