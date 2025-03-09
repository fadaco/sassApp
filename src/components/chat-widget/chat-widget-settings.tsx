"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, UserCircle } from "lucide-react";

export default function ChatWidgetSettings() {
  const [settings, setSettings] = useState({
    enabled: true,
    title: "Customer Support",
    welcomeMessage: "Hello! How can I help you today?",
    primaryColor: "#2563EB",
    position: "bottom-right",
    showBusinessHours: true,
    weekdayStart: "09:00",
    weekdayEnd: "17:00",
    weekendStart: "10:00",
    weekendEnd: "15:00",
    offlineMessage:
      "We're currently offline. Please leave a message and we'll get back to you as soon as possible.",
    agentName: "Support Team",
  });

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // In a real app, you would save these settings to your backend
    console.log("Saving chat widget settings:", settings);
    // Show success message or notification
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Widget Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Live Chat</Label>
              <p className="text-sm text-muted-foreground">
                Show the chat widget on your website
              </p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => handleChange("enabled", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="chat-title">Chat Widget Title</Label>
            <Input
              id="chat-title"
              value={settings.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Customer Support"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message</Label>
            <Textarea
              id="welcome-message"
              value={settings.welcomeMessage}
              onChange={(e) => handleChange("welcomeMessage", e.target.value)}
              placeholder="Hello! How can I help you today?"
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="chat-primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 rounded-md border cursor-pointer"
                  style={{ backgroundColor: settings.primaryColor }}
                  onClick={() => {
                    // In a real app, you would open a color picker here
                  }}
                ></div>
                <Input
                  id="chat-primary-color"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chat-position">Widget Position</Label>
              <select
                id="chat-position"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={settings.position}
                onChange={(e) => handleChange("position", e.target.value)}
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Business Hours</h3>
            <p className="text-sm text-muted-foreground">
              Set when your team is available to respond to chats.
            </p>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Show Business Hours</Label>
                <p className="text-sm text-muted-foreground">
                  Display your availability to visitors
                </p>
              </div>
              <Switch
                checked={settings.showBusinessHours}
                onCheckedChange={(checked) =>
                  handleChange("showBusinessHours", checked)
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Weekdays
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={settings.weekdayStart}
                    onChange={(e) =>
                      handleChange("weekdayStart", e.target.value)
                    }
                    className="w-24"
                  />
                  <span className="flex items-center">to</span>
                  <Input
                    type="time"
                    value={settings.weekdayEnd}
                    onChange={(e) => handleChange("weekdayEnd", e.target.value)}
                    className="w-24"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Weekends
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={settings.weekendStart}
                    onChange={(e) =>
                      handleChange("weekendStart", e.target.value)
                    }
                    className="w-24"
                  />
                  <span className="flex items-center">to</span>
                  <Input
                    type="time"
                    value={settings.weekendEnd}
                    onChange={(e) => handleChange("weekendEnd", e.target.value)}
                    className="w-24"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="offline-message">Offline Message</Label>
              <Textarea
                id="offline-message"
                value={settings.offlineMessage}
                onChange={(e) => handleChange("offlineMessage", e.target.value)}
                placeholder="We're currently offline. Please leave a message and we'll get back to you."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Team Settings</h3>

            <div className="space-y-2">
              <Label htmlFor="agent-name">Default Agent Name</Label>
              <Input
                id="agent-name"
                value={settings.agentName}
                onChange={(e) => handleChange("agentName", e.target.value)}
                placeholder="Support Team"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-avatar">Default Agent Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <UserCircle size={32} />
                </div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="gap-1" onClick={handleSave}>
            <Save size={16} />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
