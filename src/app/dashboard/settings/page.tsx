"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BellRing,
  CreditCard,
  Globe,
  Key,
  Lock,
  Mail,
  Save,
  User,
  Copy,
  UserCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const userData = await getUser();
      if (!userData) {
        redirectToLogin();
      }
      setUser(userData);
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

  return <SettingsClient user={user} />;
}

function SettingsClient({ user }: { user: any }) {
  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="email">Email Settings</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            defaultValue={user.user_metadata?.full_name || ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            defaultValue={user.email}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your company name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" placeholder="https://example.com" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security</h3>

                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Settings</CardTitle>
                    <CardDescription>
                      Configure your email sending preferences and defaults.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="from-name">From Name</Label>
                        <Input
                          id="from-name"
                          placeholder="Your Name or Company"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reply-to">Reply-To Email</Label>
                        <Input
                          id="reply-to"
                          type="email"
                          placeholder="reply@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-signature">Email Signature</Label>
                        <Textarea
                          id="email-signature"
                          placeholder="Your email signature"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">SMTP Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure your own SMTP server for sending emails.
                      </p>

                      <div className="space-y-2">
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input id="smtp-host" placeholder="smtp.example.com" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-port">SMTP Port</Label>
                          <Input id="smtp-port" placeholder="587" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-security">Security</Label>
                          <select
                            id="smtp-security"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="tls">TLS</option>
                            <option value="ssl">SSL</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="smtp-username">SMTP Username</Label>
                          <Input
                            id="smtp-username"
                            placeholder="username@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtp-password">SMTP Password</Label>
                          <Input id="smtp-password" type="password" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline">Test Connection</Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="mt-0">
                <Tabs defaultValue="settings" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="settings">Widget Settings</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Installation Code</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="settings" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Live Chat Settings</CardTitle>
                        <CardDescription>
                          Configure your live chat widget appearance and behavior.
                        </CardDescription>
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
                            <Switch defaultChecked />
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label htmlFor="chat-title">Chat Widget Title</Label>
                            <Input
                              id="chat-title"
                              defaultValue="Customer Support"
                              placeholder="Customer Support"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="welcome-message">Welcome Message</Label>
                            <Textarea
                              id="welcome-message"
                              defaultValue="Hello! How can I help you today?"
                              placeholder="Hello! How can I help you today?"
                              className="min-h-[80px]"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="chat-primary-color">
                                Primary Color
                              </Label>
                              <div className="flex gap-2">
                                <div className="h-10 w-10 rounded-md bg-blue-600 border cursor-pointer"></div>
                                <Input
                                  id="chat-primary-color"
                                  defaultValue="#2563EB"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="chat-position">Widget Position</Label>
                              <select
                                id="chat-position"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue="bottom-right"
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
                                <Label className="text-base">
                                  Show Business Hours
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Display your availability to visitors
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium mb-2 block">
                                  Weekdays
                                </Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="time"
                                    defaultValue="09:00"
                                    className="w-24"
                                  />
                                  <span className="flex items-center">to</span>
                                  <Input
                                    type="time"
                                    defaultValue="17:00"
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
                                    defaultValue="10:00"
                                    className="w-24"
                                  />
                                  <span className="flex items-center">to</span>
                                  <Input
                                    type="time"
                                    defaultValue="15:00"
                                    className="w-24"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="offline-message">
                                Offline Message
                              </Label>
                              <Textarea
                                id="offline-message"
                                defaultValue="We're currently offline. Please leave a message and we'll get back to you as soon as possible."
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
                                defaultValue="Support Team"
                                placeholder="Support Team"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="agent-avatar">
                                Default Agent Avatar
                              </Label>
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
                          <Button className="gap-1">
                            <Save size={16} />
                            Save Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="preview" className="mt-0">
                    <div className="bg-gray-100 rounded-lg p-8 min-h-[600px] relative border">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50"></div>
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mb-8">
                          <h3 className="text-lg font-medium mb-2">Live Preview</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            This is how your chat widget will appear on your website. Try interacting with it to see how it works.
                          </p>
                        </div>
                        
                        <div className="fixed bottom-6 right-6 bg-white border rounded-lg shadow-lg overflow-hidden w-80 h-[400px]">
                          <div className="bg-blue-600 p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
                                <AvatarFallback>CS</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium text-sm text-white">Customer Support</h3>
                                <p className="text-xs text-white opacity-80">Online</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-white opacity-80 hover:opacity-100"
                              >
                                <Minimize size={16} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-white opacity-80 hover:opacity-100"
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 overflow-y-auto h-[calc(100%-120px)] bg-muted/30">
                            <div className="flex items-start mb-3">
                              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=support" />
                                <AvatarFallback>CS</AvatarFallback>
                              </Avatar>
                              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                                <p className="text-sm">Hello! How can I help you today?</p>
                                <p className="text-xs mt-1 opacity-70 text-right">
                                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-2 flex gap-2 items-center border-t">
                            <Input placeholder="Type a message..." />
                            <Button size="icon" className="bg-blue-600">
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Website Integration</CardTitle>
                        <CardDescription>
                          Add the chat widget to your website by copying and pasting this code snippet.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Copy and paste this code snippet into your website's HTML, just before the closing <code>&lt;/body&gt;</code> tag.
                        </p>
                        
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap">
{`<!-- Email Marketing Platform Chat Widget -->

              <TabsContent value="integrations" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect your email marketing platform with other services.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Slack Integration */}
                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-[#4A154B] p-2 rounded-md">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 15C5.17157 15 4.5 15.6716 4.5 16.5C4.5 17.3284 5.17157 18 6 18C6.82843 18 7.5 17.3284 7.5 16.5V15H6Z"
                                fill="white"
                              />
                              <path
                                d="M6 9C6.82843 9 7.5 8.32843 7.5 7.5C7.5 6.67157 6.82843 6 6 6C5.17157 6 4.5 6.67157 4.5 7.5V9H6Z"
                                fill="white"
                              />
                              <path
                                d="M9 7.5C9 8.32843 9.67157 9 10.5 9H12V7.5C12 6.67157 11.3284 6 10.5 6C9.67157 6 9 6.67157 9 7.5Z"
                                fill="white"
                              />
                              <path
                                d="M10.5 15C9.67157 15 9 15.6716 9 16.5C9 17.3284 9.67157 18 10.5 18C11.3284 18 12 17.3284 12 16.5V15H10.5Z"
                                fill="white"
                              />
                              <path
                                d="M7.5 10.5C7.5 9.67157 6.82843 9 6 9C5.17157 9 4.5 9.67157 4.5 10.5C4.5 11.3284 5.17157 12 6 12H7.5V10.5Z"
                                fill="white"
                              />
                              <path
                                d="M16.5 9C17.3284 9 18 8.32843 18 7.5C18 6.67157 17.3284 6 16.5 6C15.6716 6 15 6.67157 15 7.5V9H16.5Z"
                                fill="white"
                              />
                              <path
                                d="M15 10.5C15 9.67157 14.3284 9 13.5 9C12.6716 9 12 9.67157 12 10.5C12 11.3284 12.6716 12 13.5 12H15V10.5Z"
                                fill="white"
                              />
                              <path
                                d="M13.5 15C12.6716 15 12 15.6716 12 16.5C12 17.3284 12.6716 18 13.5 18C14.3284 18 15 17.3284 15 16.5V15H13.5Z"
                                fill="white"
                              />
                              <path
                                d="M16.5 12C15.6716 12 15 12.6716 15 13.5C15 14.3284 15.6716 15 16.5 15H18V13.5C18 12.6716 17.3284 12 16.5 12Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">Slack</h3>
                            <p className="text-sm text-muted-foreground">
                              Connect your Slack workspace to receive
                              notifications and chat messages.
                            </p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="slack-webhook">Webhook URL</Label>
                          <Input
                            id="slack-webhook"
                            placeholder="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
                            defaultValue="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
                            type="password"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="slack-channel">Default Channel</Label>
                          <Input
                            id="slack-channel"
                            placeholder="#support"
                            defaultValue="#support"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Notification Events</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="slack-new-chat" defaultChecked />
                              <Label
                                htmlFor="slack-new-chat"
                                className="text-sm font-normal"
                              >
                                New chat messages
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="slack-offline" defaultChecked />
                              <Label
                                htmlFor="slack-offline"
                                className="text-sm font-normal"
                              >
                                Offline messages
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="slack-campaign" />
                              <Label
                                htmlFor="slack-campaign"
                                className="text-sm font-normal"
                              >
                                Campaign sent
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="slack-subscriber" />
                              <Label
                                htmlFor="slack-subscriber"
                                className="text-sm font-normal"
                              >
                                New subscribers
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Test Connection
                          </Button>
                          <Button size="sm">Save Slack Settings</Button>
                        </div>
                      </div>
                    </div>

                    {/* Microsoft Teams Integration */}
                    <div className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-[#4050B5] p-2 rounded-md">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.5 5.5H12.5C11.9477 5.5 11.5 5.94772 11.5 6.5V12.5C11.5 13.0523 11.9477 13.5 12.5 13.5H19.5C20.0523 13.5 20.5 13.0523 20.5 12.5V6.5C20.5 5.94772 20.0523 5.5 19.5 5.5Z"
                                fill="white"
                              />
                              <path
                                d="M9.5 11C9.5 9.61929 8.38071 8.5 7 8.5C5.61929 8.5 4.5 9.61929 4.5 11V17C4.5 18.3807 5.61929 19.5 7 19.5C8.38071 19.5 9.5 18.3807 9.5 17V11Z"
                                fill="white"
                              />
                              <path
                                d="M11.5 15V17C11.5 19.4853 9.48528 21.5 7 21.5C4.51472 21.5 2.5 19.4853 2.5 17V11C2.5 8.51472 4.51472 6.5 7 6.5C7.17753 6.5 7.35251 6.51229 7.52441 6.53607C7.67334 4.84601 9.11095 3.5 10.8333 3.5H19.5C21.1569 3.5 22.5 4.84315 22.5 6.5V12.5C22.5 14.1569 21.1569 15.5 19.5 15.5H12.5C12.0128 15.5 11.5514 15.3056 11.1968 15.0024C11.4556 15.0008 11.5 15 11.5 15Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">
                              Microsoft Teams
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Connect Microsoft Teams to receive notifications
                              and chat messages.
                            </p>
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="teams-webhook">Webhook URL</Label>
                          <Input
                            id="teams-webhook"
                            placeholder="https://outlook.office.com/webhook/..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Notification Events</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="teams-new-chat" />
                              <Label
                                htmlFor="teams-new-chat"
                                className="text-sm font-normal"
                              >
                                New chat messages
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="teams-offline" />
                              <Label
                                htmlFor="teams-offline"
                                className="text-sm font-normal"
                              >
                                Offline messages
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="teams-campaign" />
                              <Label
                                htmlFor="teams-campaign"
                                className="text-sm font-normal"
                              >
                                Campaign sent
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="teams-subscriber" />
                              <Label
                                htmlFor="teams-subscriber"
                                className="text-sm font-normal"
                              >
                                New subscribers
                              </Label>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Test Connection
                          </Button>
                          <Button size="sm">Save Teams Settings</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        Save All Integrations
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control when and how you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about your campaigns
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">
                            Campaign Completions
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when a campaign has finished sending
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">New Subscribers</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone subscribes to your list
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly performance reports
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>
                      Manage your subscription and payment methods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium">Current Plan</h3>
                            <p className="text-sm text-muted-foreground">
                              You are currently on the Free plan
                            </p>
                          </div>
                          <Button>Upgrade Plan</Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Subscribers</p>
                            <p className="font-medium">500 / 500</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Monthly Emails
                            </p>
                            <p className="font-medium">5,000 / 5,000</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Features</p>
                            <p className="font-medium">Basic</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <h3 className="text-lg font-medium">Payment Methods</h3>
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          No payment methods added yet.
                        </p>
                        <Button variant="outline" className="mt-4 gap-1">
                          <CreditCard size={16} />
                          Add Payment Method
                        </Button>
                      </div>

                      <Separator />

                      <h3 className="text-lg font-medium">Billing History</h3>
                      <div className="border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          No billing history available.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>
                      Manage your API keys and access.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Your API Key</h3>
                        <div className="flex items-center gap-2">
                          <Input
                            type="password"
                            value="sk_test_51HCOHILokzSDwasdfasdfasdfasdf"
                            readOnly
                          />
                          <Button variant="outline" size="icon">
                            <Copy size={16} />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Keep your API key secret. Do not share it in
                          client-side code or public repositories.
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">API Access</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable or disable API access
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <h3 className="text-lg font-medium">Webhooks</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Configure webhooks to receive real-time updates about
                        events in your account.
                      </p>

                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://example.com/webhook"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Events to Send</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="event-subscribe"
                              className="rounded border-gray-300"
                            />
                            <Label
                              htmlFor="event-subscribe"
                              className="text-sm font-normal"
                            >
                              New Subscriber
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="event-unsubscribe"
                              className="rounded border-gray-300"
                            />
                            <Label
                              htmlFor="event-unsubscribe"
                              className="text-sm font-normal"
                            >
                              Unsubscribe
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="event-campaign"
                              className="rounded border-gray-300"
                            />
                            <Label
                              htmlFor="event-campaign"
                              className="text-sm font-normal"
                            >
                              Campaign Sent
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="event-open"
                              className="rounded border-gray-300"
                            />
                            <Label
                              htmlFor="event-open"
                              className="text-sm font-normal"
                            >
                              Email Opened
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="gap-1">
                        <Save size={16} />
                        Save API Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
