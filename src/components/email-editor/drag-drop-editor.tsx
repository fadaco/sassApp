"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image,
  Type,
  Link as LinkIcon,
  MoveHorizontal,
  Save,
  Eye,
  Send,
  ArrowLeft,
  Smartphone,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface BlockProps {
  id: string;
  type: string;
  content?: string;
  src?: string;
  alt?: string;
  style?: string;
  height?: string;
  url?: string;
}

export default function DragDropEmailEditor() {
  const [emailSubject, setEmailSubject] = useState("Welcome to our newsletter");
  const [blocks, setBlocks] = useState<BlockProps[]>([
    {
      id: "header-1",
      type: "header",
      content: "Welcome to Our Newsletter",
      style: "text-2xl font-bold text-center py-4",
    },
    {
      id: "image-1",
      type: "image",
      src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      alt: "Header image",
      style: "w-full h-48 object-cover rounded-lg mb-4",
    },
    {
      id: "text-1",
      type: "text",
      content: "Hello there! We're excited to have you join our community.",
      style: "text-base mb-4",
    },
    {
      id: "text-2",
      type: "text",
      content: "Check out our latest updates and news below.",
      style: "text-base mb-4",
    },
    {
      id: "button-1",
      type: "button",
      content: "Read More",
      style: "bg-blue-600 text-white px-4 py-2 rounded-md inline-block mx-auto",
      url: "https://example.com",
    },
    {
      id: "spacer-1",
      type: "spacer",
      height: "h-8",
    },
    {
      id: "divider-1",
      type: "divider",
      style: "border-t border-gray-200 my-4",
    },
    {
      id: "footer-1",
      type: "footer",
      content: "© 2023 Your Company. All rights reserved.",
      style: "text-sm text-center text-gray-500 mt-4",
    },
  ]);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedBlockContent, setSelectedBlockContent] = useState<string>("");
  const [selectedBlockStyle, setSelectedBlockStyle] = useState<string>("");
  const [selectedBlockUrl, setSelectedBlockUrl] = useState<string>("");
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  // Template blocks that can be dragged into the editor
  const templateBlocks = [
    { id: "header", name: "Header", icon: <Type size={16} /> },
    { id: "text", name: "Text Block", icon: <Type size={16} /> },
    { id: "image", name: "Image", icon: <Image size={16} /> },
    { id: "button", name: "Button", icon: <MoveHorizontal size={16} /> },
    { id: "spacer", name: "Spacer", icon: <MoveHorizontal size={16} /> },
    { id: "divider", name: "Divider", icon: <MoveHorizontal size={16} /> },
    { id: "social", name: "Social Links", icon: <LinkIcon size={16} /> },
    { id: "footer", name: "Footer", icon: <Type size={16} /> },
  ];

  // Update selected block content when selection changes
  useEffect(() => {
    if (selectedBlockId) {
      const block = blocks.find((b) => b.id === selectedBlockId);
      if (block) {
        setSelectedBlockContent(block.content || "");
        setSelectedBlockStyle(block.style || "");
        setSelectedBlockUrl(block.url || "");
      }
    }
  }, [selectedBlockId, blocks]);

  // Handle block selection
  const handleSelectBlock = (id: string) => {
    if (previewMode) return;
    setSelectedBlockId(id);
  };

  // Handle content update
  const handleContentUpdate = () => {
    if (!selectedBlockId) return;

    setBlocks(
      blocks.map((block) => {
        if (block.id === selectedBlockId) {
          return {
            ...block,
            content: selectedBlockContent,
            style: selectedBlockStyle,
            url: selectedBlockUrl,
          };
        }
        return block;
      }),
    );
  };

  // Handle block drag start
  const handleDragStart = (e: React.DragEvent, blockType: string) => {
    e.dataTransfer.setData("blockType", blockType);
    setDraggedBlock(blockType);
  };

  // Handle existing block drag start
  const handleBlockDragStart = (e: React.DragEvent, index: number) => {
    if (previewMode) return;
    e.dataTransfer.setData("blockIndex", index.toString());
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (previewMode) return;
    setDragOverIndex(index);
  };

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (previewMode) return;

    const blockType = e.dataTransfer.getData("blockType");
    const blockIndexStr = e.dataTransfer.getData("blockIndex");

    // Reset drag states
    setDraggedBlock(null);
    setDragOverIndex(null);

    if (blockIndexStr) {
      // Reordering existing block
      const blockIndex = parseInt(blockIndexStr);
      if (dragOverIndex === null || blockIndex === dragOverIndex) return;

      const newBlocks = [...blocks];
      const [movedBlock] = newBlocks.splice(blockIndex, 1);
      newBlocks.splice(dragOverIndex, 0, movedBlock);
      setBlocks(newBlocks);
      return;
    }

    if (!blockType) return;

    // Adding new block
    const newId = `${blockType}-${Date.now()}`;
    let newBlock: BlockProps = { id: newId, type: blockType };

    // Set default properties based on block type
    switch (blockType) {
      case "header":
        newBlock = {
          ...newBlock,
          content: "New Header",
          style: "text-2xl font-bold text-center py-4",
        };
        break;
      case "text":
        newBlock = {
          ...newBlock,
          content: "Add your text here",
          style: "text-base mb-4",
        };
        break;
      case "image":
        newBlock = {
          ...newBlock,
          src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
          alt: "Image",
          style: "w-full h-48 object-cover rounded-lg mb-4",
        };
        break;
      case "button":
        newBlock = {
          ...newBlock,
          content: "Click Me",
          style:
            "bg-blue-600 text-white px-4 py-2 rounded-md inline-block mx-auto",
          url: "https://example.com",
        };
        break;
      case "spacer":
        newBlock = {
          ...newBlock,
          height: "h-8",
        };
        break;
      case "divider":
        newBlock = {
          ...newBlock,
          style: "border-t border-gray-200 my-4",
        };
        break;
      case "social":
        newBlock = {
          ...newBlock,
          content: "Follow Us",
          style: "text-center mb-2",
        };
        break;
      case "footer":
        newBlock = {
          ...newBlock,
          content: "© 2023 Your Company. All rights reserved.",
          style: "text-sm text-center text-gray-500 mt-4",
        };
        break;
    }

    // Insert at drag over position or at the end
    if (dragOverIndex !== null) {
      const newBlocks = [...blocks];
      newBlocks.splice(dragOverIndex, 0, newBlock);
      setBlocks(newBlocks);
    } else {
      setBlocks([...blocks, newBlock]);
    }
  };

  // Handle delete block
  const handleDeleteBlock = () => {
    if (!selectedBlockId) return;
    setBlocks(blocks.filter((block) => block.id !== selectedBlockId));
    setSelectedBlockId(null);
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
    setSelectedBlockId(null);
  };

  // Render block based on type
  const renderBlock = (block: BlockProps, index: number) => {
    const isSelected = selectedBlockId === block.id;
    const isDragOver = dragOverIndex === index;

    const blockClasses = `
      ${!previewMode ? "cursor-pointer hover:outline hover:outline-blue-500 hover:outline-1" : ""}
      ${isSelected && !previewMode ? "outline outline-blue-500 outline-2" : ""}
      ${isDragOver && !previewMode ? "border-t-2 border-blue-500" : ""}
      p-2 relative
    `;

    const blockProps = {
      key: block.id,
      className: blockClasses,
      onClick: () => handleSelectBlock(block.id),
      draggable: !previewMode,
      onDragStart: (e: React.DragEvent) => handleBlockDragStart(e, index),
      onDragOver: (e: React.DragEvent) => handleDragOver(e, index),
    };

    switch (block.type) {
      case "header":
        return (
          <div {...blockProps}>
            <div className={block.style}>{block.content}</div>
          </div>
        );
      case "text":
        return (
          <div {...blockProps}>
            <div className={block.style}>{block.content}</div>
          </div>
        );
      case "image":
        return (
          <div {...blockProps}>
            <img src={block.src} alt={block.alt} className={block.style} />
          </div>
        );
      case "button":
        return (
          <div {...blockProps}>
            <div className="text-center">
              <a href={block.url} className={block.style}>
                {block.content}
              </a>
            </div>
          </div>
        );
      case "spacer":
        return (
          <div
            {...blockProps}
            className={`${blockClasses} ${block.height}`}
          ></div>
        );
      case "divider":
        return (
          <div {...blockProps} className={`${blockClasses}`}>
            <div className={block.style}></div>
          </div>
        );
      case "social":
        return (
          <div {...blockProps}>
            <div className={block.style}>{block.content}</div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-8 bg-sky-500 rounded-full"></div>
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        );
      case "footer":
        return (
          <div {...blockProps}>
            <div className={block.style}>{block.content}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
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
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={togglePreviewMode}
            >
              <Eye size={16} />
              {previewMode ? "Edit" : "Preview"}
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
            disabled={previewMode}
          />
        </div>
      </div>

      {/* Editor Workspace */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Elements (hidden in preview mode) */}
        {!previewMode && (
          <div className="w-64 border-r overflow-y-auto bg-card">
            <div className="p-4">
              <h3 className="font-medium mb-3">Content Blocks</h3>
              <div className="grid grid-cols-2 gap-2">
                {templateBlocks.map((block) => (
                  <div
                    key={block.id}
                    className="flex flex-col items-center justify-center p-3 border rounded-md bg-background hover:border-primary cursor-move transition-colors"
                    draggable
                    onDragStart={(e) => handleDragStart(e, block.id)}
                  >
                    {block.icon}
                    <span className="text-xs mt-1">{block.name}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-medium mt-6 mb-3">Templates</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded-md cursor-pointer hover:border-primary transition-colors">
                  <div className="aspect-video bg-muted rounded-sm mb-2"></div>
                  <p className="text-xs font-medium">Welcome Email</p>
                </div>
                <div className="p-2 border rounded-md cursor-pointer hover:border-primary transition-colors">
                  <div className="aspect-video bg-muted rounded-sm mb-2"></div>
                  <p className="text-xs font-medium">Newsletter</p>
                </div>
                <div className="p-2 border rounded-md cursor-pointer hover:border-primary transition-colors">
                  <div className="aspect-video bg-muted rounded-sm mb-2"></div>
                  <p className="text-xs font-medium">Promotion</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Center - Email Canvas */}
        <div
          className={`${previewMode ? "flex-1" : "flex-1"} overflow-y-auto bg-muted/30 p-8 flex justify-center`}
        >
          <div
            ref={editorRef}
            className="w-full max-w-[600px] min-h-[800px] bg-white rounded-md shadow-sm border p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {blocks.map((block, index) => renderBlock(block, index))}
          </div>
        </div>

        {/* Right Sidebar - Properties (hidden in preview mode) */}
        {!previewMode && selectedBlockId && (
          <div className="w-72 border-l overflow-y-auto bg-card">
            <Tabs defaultValue="style" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="p-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    Content
                  </Label>
                  <Textarea
                    value={selectedBlockContent}
                    onChange={(e) => setSelectedBlockContent(e.target.value)}
                    onBlur={handleContentUpdate}
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    Text Formatting
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
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    Alignment
                  </Label>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignLeft size={14} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignCenter size={14} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignRight size={14} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <AlignJustify size={14} />
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

                {blocks.find((b) => b.id === selectedBlockId)?.type ===
                  "button" && (
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">
                      Button URL
                    </Label>
                    <Input
                      value={selectedBlockUrl}
                      onChange={(e) => setSelectedBlockUrl(e.target.value)}
                      onBlur={handleContentUpdate}
                      placeholder="https://example.com"
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="p-4 space-y-4">
                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    CSS Classes
                  </Label>
                  <Input
                    value={selectedBlockStyle}
                    onChange={(e) => setSelectedBlockStyle(e.target.value)}
                    onBlur={handleContentUpdate}
                    placeholder="CSS classes"
                  />
                </div>

                <div>
                  <Label className="text-xs font-medium mb-1.5 block">
                    Block Actions
                  </Label>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteBlock}
                    >
                      Delete Block
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
