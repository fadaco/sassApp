"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  Bell,
  Clock,
  FileText,
  MessageSquare,
  MoreVertical,
  Phone,
  Search,
  Send,
  Settings,
  User,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function ChatPage() {
  return <ChatClient />;
}

function ChatClient() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();
      if (!user) {
        redirectToLogin();
      }
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      status: "online",
      lastMessage: "I'm having trouble with my subscription",
      time: "2 min ago",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "Sarah Johnson",
          content:
            "Hi there, I'm having trouble with my subscription. Can you help?",
          time: "10:32 AM",
          isUser: false,
        },
        {
          id: 2,
          sender: "You",
          content:
            "Hello Sarah, I'd be happy to help. Could you please provide more details about the issue you're experiencing?",
          time: "10:34 AM",
          isUser: true,
        },
        {
          id: 3,
          sender: "Sarah Johnson",
          content:
            "I was charged twice for this month's subscription. I should only be billed once per month.",
          time: "10:36 AM",
          isUser: false,
        },
        {
          id: 4,
          sender: "You",
          content:
            "I apologize for the inconvenience. Let me check your billing records right away.",
          time: "10:38 AM",
          isUser: true,
        },
        {
          id: 5,
          sender: "Sarah Johnson",
          content: "Thank you, I appreciate your help with this matter.",
          time: "10:39 AM",
          isUser: false,
        },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      status: "offline",
      lastMessage: "Thanks for your help!",
      time: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "Michael Chen",
          content:
            "Hello, I'm interested in upgrading my plan. What options do you have?",
          time: "Yesterday, 3:45 PM",
          isUser: false,
        },
        {
          id: 2,
          sender: "You",
          content:
            "Hi Michael! We have several upgrade options available. The Pro plan offers 25,000 emails per month and the Business plan offers 100,000 emails per month. Would you like more details on either of these?",
          time: "Yesterday, 3:50 PM",
          isUser: true,
        },
        {
          id: 3,
          sender: "Michael Chen",
          content: "The Pro plan sounds good. How much does it cost?",
          time: "Yesterday, 3:52 PM",
          isUser: false,
        },
        {
          id: 4,
          sender: "You",
          content:
            "The Pro plan is $49/month or $470/year if you choose annual billing (saving you about 20%). Would you like me to help you upgrade?",
          time: "Yesterday, 3:55 PM",
          isUser: true,
        },
        {
          id: 5,
          sender: "Michael Chen",
          content:
            "Thanks for your help! I'll think about it and get back to you.",
          time: "Yesterday, 4:00 PM",
          isUser: false,
        },
      ],
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      status: "online",
      lastMessage: "How do I create a new campaign?",
      time: "2 days ago",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "Emma Wilson",
          content: "How do I create a new campaign? I'm new to the platform.",
          time: "2 days ago, 11:23 AM",
          isUser: false,
        },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    // In a real app, you would send this message to your backend
    setMessage("");
  };

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-hidden bg-background flex">
          {/* Chat Sidebar */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold mb-4">Conversations</h2>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  className="pl-8"
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="flex-1 flex flex-col">
              <div className="px-4 pt-2">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="flex-1 overflow-y-auto p-2">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${activeChat === index ? "bg-primary/10" : "hover:bg-muted/50"}`}
                    onClick={() => setActiveChat(index)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.avatar}
                          alt={conversation.name}
                        />
                        <AvatarFallback>
                          {conversation.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent
                value="unread"
                className="flex-1 overflow-y-auto p-2"
              >
                {conversations
                  .filter((c) => c.unread > 0)
                  .map((conversation, index) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${activeChat === index ? "bg-primary/10" : "hover:bg-muted/50"}`}
                      onClick={() => setActiveChat(index)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={conversation.avatar}
                            alt={conversation.name}
                          />
                          <AvatarFallback>
                            {conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.status === "online" && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {conversation.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  ))}
              </TabsContent>

              <TabsContent
                value="archived"
                className="flex-1 overflow-y-auto p-2"
              >
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No archived conversations</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Main Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="border-b p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={conversations[activeChat].avatar}
                    alt={conversations[activeChat].name}
                  />
                  <AvatarFallback>
                    {conversations[activeChat].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">
                    {conversations[activeChat].name}
                  </h2>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {conversations[activeChat].status === "online" ? (
                      <>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                        Online
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>{" "}
                        Offline
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <User size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={18} />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversations[activeChat].messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{msg.sender}</span>
                      <span className="text-xs opacity-70">{msg.time}</span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Customer Info Sidebar */}
          <div className="w-72 border-l bg-card overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Customer Info</h3>
            </div>
            <div className="p-4 space-y-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage
                    src={conversations[activeChat].avatar}
                    alt={conversations[activeChat].name}
                  />
                  <AvatarFallback>
                    {conversations[activeChat].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-medium">
                  {conversations[activeChat].name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customer since Jan 2023
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Contact Information</h4>
                <div className="text-sm">
                  <p className="flex items-center gap-2">
                    <MessageSquare size={14} />
                    <span>
                      {conversations[activeChat].name
                        .toLowerCase()
                        .replace(" ", ".")}
                      @example.com
                    </span>
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <Phone size={14} />
                    <span>+1 (555) 123-4567</span>
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Subscription</h4>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Plan:</span> Pro
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className="text-green-600">Active</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Next billing:</span>{" "}
                    June 15, 2023
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <Clock size={14} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p>Opened campaign "Summer Sale"</p>
                      <p className="text-xs text-muted-foreground">
                        2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <FileText
                      size={14}
                      className="mt-0.5 text-muted-foreground"
                    />
                    <div>
                      <p>Submitted support ticket #4532</p>
                      <p className="text-xs text-muted-foreground">
                        3 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Users size={14} className="mt-0.5 text-muted-foreground" />
                    <div>
                      <p>Added 50 new subscribers</p>
                      <p className="text-xs text-muted-foreground">
                        1 week ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full gap-1">
                  <ArrowUpRight size={14} />
                  View Full Profile
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
