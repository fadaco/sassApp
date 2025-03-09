"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, X, Minimize, Maximize } from "lucide-react";

interface ChatWidgetPreviewProps {
  settings: {
    title: string;
    welcomeMessage: string;
    primaryColor: string;
    position: string;
    agentName: string;
  };
}

export default function ChatWidgetPreview({
  settings,
}: ChatWidgetPreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const getPositionClasses = () => {
    switch (settings.position) {
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      case "bottom-right":
      default:
        return "bottom-6 right-6";
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed ${getPositionClasses()} h-14 w-14 rounded-full shadow-lg`}
        style={{ backgroundColor: settings.primaryColor }}
      >
        <MessageSquare size={24} className="text-white" />
      </Button>
    );
  }

  return (
    <div
      className={`fixed ${getPositionClasses()} bg-background border rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${isMinimized ? "w-72 h-16" : "w-80 h-[400px]"}`}
    >
      {/* Chat Header */}
      <div
        className="p-3 flex justify-between items-center"
        style={{ backgroundColor: settings.primaryColor }}
      >
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm text-white">{settings.title}</h3>
            <p className="text-xs text-white opacity-80">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!isMinimized ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white opacity-80 hover:opacity-100"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize size={16} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white opacity-80 hover:opacity-100"
              onClick={() => setIsMinimized(false)}
            >
              <Maximize size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white opacity-80 hover:opacity-100"
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
            <div className="flex items-start mb-3">
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <p className="text-sm">{settings.welcomeMessage}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-2 flex gap-2 items-center border-t">
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Type a message..."
            />
            <Button
              size="icon"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                  fill="white"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
