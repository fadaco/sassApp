"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Bold,
  ChevronDown,
  Code,
  Copy,
  Eye,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Mail,
  MoveHorizontal,
  Palette,
  Save,
  Send,
  Settings,
  Smartphone,
  Type,
  Underline,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function EditorPage() {
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <EmailEditorClient />;
}

function EmailEditorClient() {
  const [activeTab, setActiveTab] = useState("design");
  const [emailSubject, setEmailSubject] = useState("Welcome to our newsletter");
  const [previewMode, setPreviewMode] = useState(false);

  // Sample template blocks
  const templateBlocks = [
    { id: "header", name: "Header", icon: <Type size={16} /> },
    { id: "text", name: "Text Block", icon: <Type size={16} /> },
    { id: "image", name: "Image", icon: <Image size={16} /> },
    { id: "button", name: "Button", icon: <MoveHorizontal size={16} /> },
    { id: "spacer", name: "Spacer", icon: <MoveHorizontal size={16} /> },
    { id: "divider", name: "Divider", icon: <MoveHorizontal size={16} /> },
    { id: "social", name: "Social Links", icon: <Link size={16} /> },
    { id: "footer", name: "Footer", icon: <Type size={16} /> },
  ];

  // Sample email content
  const emailContent = [
    {
      type: "header",
      content: "Welcome to Our Newsletter",
      style: "text-2xl font-bold text-center py-4",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      alt: "Header image",
      style: "w-full h-48 object-cover rounded-lg mb-4",
    },
    {
      type: "text",
      content: "Hello there! We're excited to have you join our community.",
      style: "text-base mb-4",
    },
    {
      type: "text",
      content: "Check out our latest updates and news below.",
      style: "text-base mb-4",
    },
    {
      type: "button",
      content: "Read More",
      style: "bg-blue-600 text-white px-4 py-2 rounded-md inline-block mx-auto",
    },
    {
      type: "spacer",
      height: "h-8",
    },
    {
      type: "divider",
      style: "border-t border-gray-200 my-4",
    },
    {
      type: "footer",
      content: "© 2023 Your Company. All rights reserved.",
      style: "text-sm text-center text-gray-500 mt-4",
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-hidden bg-background flex flex-col">
          {/* Editor Header */}
          <div className="border-b">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href="/dashboard/campaigns">
                    <ArrowLeft size={18} />
                  </a>
                </Button>
                <div>
                  <h1 className="text-xl font-semibold">Email Editor</h1>
                  <p className="text-sm text-muted-foreground">
                    Design your email campaign
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Save size={16} />
                  Save Draft
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye size={16} />
                  Preview
                </Button>
                <Button size="sm" className="gap-1">
                  <Send size={16} />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Email Subject */}
          <div className="border-b bg-muted/50">
            <div className="container mx-auto px-6 py-3 flex items-center gap-3">
              <Label
                htmlFor="subject"
                className="text-sm font-medium whitespace-nowrap"
              >
                Email Subject:
              </Label>
              <Input
                id="subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="max-w-md border-dashed"
                placeholder="Enter email subject"
              />
            </div>
          </div>

          {/* Editor Workspace */}
          <div className="flex-1 overflow-hidden flex">
            {/* Left Sidebar - Elements */}
            <div className="w-64 border-r overflow-y-auto bg-card">
              <div className="p-4">
                <h3 className="font-medium mb-3">Content Blocks</h3>
                <div className="grid grid-cols-2 gap-2">
                  {templateBlocks.map((block) => (
                    <div
                      key={block.id}
                      className="flex flex-col items-center justify-center p-3 border rounded-md bg-background hover:border-primary cursor-move transition-colors"
                      draggable="true"
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", block.id);
                      }}
                    >
                      {block.icon}
                      <span className="text-xs mt-1">{block.name}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-medium mt-6 mb-3">Templates</h3>
                <div className="space-y-2">
                  <Card className="p-2 cursor-pointer hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted rounded-sm mb-2"></div>
                    <p className="text-xs font-medium">Welcome Email</p>
                  </Card>
                  <Card className="p-2 cursor-pointer hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted rounded-sm mb-2"></div>
                    <p className="text-xs font-medium">Newsletter</p>
                  </Card>
                  <Card className="p-2 cursor-pointer hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted rounded-sm mb-2"></div>
                    <p className="text-xs font-medium">Promotion</p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Center - Email Canvas */}
            <div className="flex-1 overflow-y-auto bg-muted/30 p-8 flex justify-center">
              <div
                className="w-full max-w-[600px] min-h-[800px] bg-white rounded-md shadow-sm border p-4"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const blockId = e.dataTransfer.getData("text/plain");
                  // Here you would handle adding the block to the email content
                  console.log("Dropped block:", blockId);
                }}
              >
                {emailContent.map((block, index) => {
                  switch (block.type) {
                    case "header":
                      return (
                        <div
                          key={index}
                          className={`${block.style} cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2`}
                        >
                          {block.content}
                        </div>
                      );
                    case "text":
                      return (
                        <div
                          key={index}
                          className={`${block.style} cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2`}
                        >
                          {block.content}
                        </div>
                      );
                    case "image":
                      return (
                        <div
                          key={index}
                          className="cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2"
                        >
                          <img
                            src={block.src}
                            alt={block.alt}
                            className={block.style}
                          />
                        </div>
                      );
                    case "button":
                      return (
                        <div
                          key={index}
                          className="text-center cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2"
                        >
                          <button className={block.style}>
                            {block.content}
                          </button>
                        </div>
                      );
                    case "spacer":
                      return (
                        <div
                          key={index}
                          className={`${block.height} cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2`}
                        ></div>
                      );
                    case "divider":
                      return (
                        <div
                          key={index}
                          className={`${block.style} cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2`}
                        ></div>
                      );
                    case "footer":
                      return (
                        <div
                          key={index}
                          className={`${block.style} cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1 p-2`}
                        >
                          {block.content}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>

            {/* Right Sidebar - Properties */}
            <div className="w-72 border-l overflow-y-auto bg-card">
              <Tabs defaultValue="style" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                </TabsList>

                <TabsContent value="style" className="p-4 space-y-4">
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">
                      Text
                    </Label>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Bold size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Italic size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Underline size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <List size={14} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ListOrdered size={14} />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">
                      Colors
                    </Label>
                    <div className="grid grid-cols-6 gap-1">
                      <div className="h-6 w-6 rounded-md bg-red-500 cursor-pointer"></div>
                      <div className="h-6 w-6 rounded-md bg-blue-500 cursor-pointer"></div>
                      <div className="h-6 w-6 rounded-md bg-green-500 cursor-pointer"></div>
                      <div className="h-6 w-6 rounded-md bg-yellow-500 cursor-pointer"></div>
                      <div className="h-6 w-6 rounded-md bg-purple-500 cursor-pointer"></div>
                      <div className="h-6 w-6 rounded-md bg-gray-500 cursor-pointer"></div>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="content-text"
                      className="text-xs font-medium mb-1.5 block"
                    >
                      Content
                    </Label>
                    <Textarea
                      id="content-text"
                      placeholder="Edit content text"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="link-url"
                      className="text-xs font-medium mb-1.5 block"
                    >
                      Link URL
                    </Label>
                    <Input id="link-url" placeholder="https://example.com" />
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="p-4 space-y-4">
                  <div>
                    <Label
                      htmlFor="email-width"
                      className="text-xs font-medium mb-1.5 block"
                    >
                      Email Width
                    </Label>
                    <Input id="email-width" type="number" defaultValue="600" />
                  </div>

                  <div>
                    <Label
                      htmlFor="background-color"
                      className="text-xs font-medium mb-1.5 block"
                    >
                      Background Color
                    </Label>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-md bg-white border cursor-pointer"></div>
                      <Input id="background-color" defaultValue="#FFFFFF" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">
                      Padding
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label
                          htmlFor="padding-top"
                          className="text-xs text-muted-foreground"
                        >
                          Top
                        </Label>
                        <Input
                          id="padding-top"
                          type="number"
                          defaultValue="20"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="padding-bottom"
                          className="text-xs text-muted-foreground"
                        >
                          Bottom
                        </Label>
                        <Input
                          id="padding-bottom"
                          type="number"
                          defaultValue="20"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="padding-left"
                          className="text-xs text-muted-foreground"
                        >
                          Left
                        </Label>
                        <Input
                          id="padding-left"
                          type="number"
                          defaultValue="20"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="padding-right"
                          className="text-xs text-muted-foreground"
                        >
                          Right
                        </Label>
                        <Input
                          id="padding-right"
                          type="number"
                          defaultValue="20"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="p-4 space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="border rounded-lg p-2 w-[240px] h-[400px] overflow-hidden bg-white">
                      <div className="w-full h-6 bg-gray-200 rounded-t-md mb-1 flex justify-center items-center">
                        <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="overflow-y-auto h-[calc(100%-1.5rem)] p-1">
                        <div className="text-center text-xs font-bold py-2">
                          Welcome to Our Newsletter
                        </div>
                        <div className="w-full h-20 bg-gray-100 rounded-sm mb-2"></div>
                        <div className="w-full h-2 bg-gray-100 rounded-sm mb-1"></div>
                        <div className="w-full h-2 bg-gray-100 rounded-sm mb-1"></div>
                        <div className="w-full h-2 bg-gray-100 rounded-sm mb-3"></div>
                        <div className="flex justify-center mb-3">
                          <div className="w-20 h-6 bg-blue-500 rounded-sm"></div>
                        </div>
                        <div className="w-full h-px bg-gray-200 my-2"></div>
                        <div className="text-center text-[8px] text-gray-400 mt-2">
                          © 2023 Your Company
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">
                      Mobile Preview
                    </Label>
                    <p className="text-xs text-muted-foreground mb-4">
                      Your email will automatically adjust for mobile devices.
                      Use this preview to see how it will look.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1"
                    >
                      <Smartphone size={14} />
                      Test on Device
                    </Button>
                  </div>

                  <div>
                    <Label
                      htmlFor="mobile-font-size"
                      className="text-xs font-medium mb-1.5 block"
                    >
                      Mobile Font Size Adjustment
                    </Label>
                    <Input
                      id="mobile-font-size"
                      type="number"
                      defaultValue="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Adjust font size for mobile (in pixels)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
