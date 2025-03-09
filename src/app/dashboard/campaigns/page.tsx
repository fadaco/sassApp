"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Calendar,
  Clock,
  Edit,
  Eye,
  Mail,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function CampaignsPage() {
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

  // Sample campaign data
  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      status: "Active",
      sent: 1245,
      opened: 876,
      clicked: 432,
      lastSent: "2023-10-15",
    },
    {
      id: 2,
      name: "Monthly Newsletter",
      status: "Draft",
      sent: 0,
      opened: 0,
      clicked: 0,
      lastSent: "-",
    },
    {
      id: 3,
      name: "Product Announcement",
      status: "Scheduled",
      sent: 0,
      opened: 0,
      clicked: 0,
      lastSent: "-",
    },
    {
      id: 4,
      name: "Holiday Promotion",
      status: "Completed",
      sent: 5432,
      opened: 3210,
      clicked: 1543,
      lastSent: "2023-12-01",
    },
  ];

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Email Campaigns</h1>
              <Link href="/dashboard/drag-drop-editor">
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Create Campaign
                </Button>
              </Link>
            </div>

            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Campaigns</CardDescription>
                  <CardTitle className="text-2xl">{campaigns.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail size={14} />
                    <span>All campaigns</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Sent</CardDescription>
                  <CardTitle className="text-2xl">
                    {campaigns.reduce(
                      (acc, campaign) => acc + campaign.sent,
                      0,
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Send size={14} />
                    <span>Emails delivered</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Open Rate</CardDescription>
                  <CardTitle className="text-2xl">42.3%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Eye size={14} />
                    <span>Average opens</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Click Rate</CardDescription>
                  <CardTitle className="text-2xl">18.7%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart size={14} />
                    <span>Average clicks</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign List */}
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Campaigns</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="pl-8 w-[250px]"
                  />
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardHeader className="px-6 py-4">
                    <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                      <div className="col-span-4">Campaign Name</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-1">Sent</div>
                      <div className="col-span-1">Opened</div>
                      <div className="col-span-1">Clicked</div>
                      <div className="col-span-2">Last Sent</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className="grid grid-cols-12 items-center px-6 py-4 border-t hover:bg-muted/50 transition-colors"
                      >
                        <div className="col-span-4 font-medium">
                          {campaign.name}
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              campaign.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : campaign.status === "Draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : campaign.status === "Scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                        <div className="col-span-1">{campaign.sent}</div>
                        <div className="col-span-1">{campaign.opened}</div>
                        <div className="col-span-1">{campaign.clicked}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{campaign.lastSent}</span>
                        </div>
                        <div className="col-span-1 flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {campaigns
                      .filter((c) => c.status === "Active")
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className="grid grid-cols-12 items-center px-6 py-4 border-t hover:bg-muted/50 transition-colors"
                        >
                          <div className="col-span-4 font-medium">
                            {campaign.name}
                          </div>
                          <div className="col-span-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {campaign.status}
                            </span>
                          </div>
                          <div className="col-span-1">{campaign.sent}</div>
                          <div className="col-span-1">{campaign.opened}</div>
                          <div className="col-span-1">{campaign.clicked}</div>
                          <div className="col-span-2 flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{campaign.lastSent}</span>
                          </div>
                          <div className="col-span-1 flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drafts" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {campaigns
                      .filter((c) => c.status === "Draft")
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className="grid grid-cols-12 items-center px-6 py-4 border-t hover:bg-muted/50 transition-colors"
                        >
                          <div className="col-span-4 font-medium">
                            {campaign.name}
                          </div>
                          <div className="col-span-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {campaign.status}
                            </span>
                          </div>
                          <div className="col-span-1">{campaign.sent}</div>
                          <div className="col-span-1">{campaign.opened}</div>
                          <div className="col-span-1">{campaign.clicked}</div>
                          <div className="col-span-2 flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{campaign.lastSent}</span>
                          </div>
                          <div className="col-span-1 flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scheduled" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {campaigns
                      .filter((c) => c.status === "Scheduled")
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className="grid grid-cols-12 items-center px-6 py-4 border-t hover:bg-muted/50 transition-colors"
                        >
                          <div className="col-span-4 font-medium">
                            {campaign.name}
                          </div>
                          <div className="col-span-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {campaign.status}
                            </span>
                          </div>
                          <div className="col-span-1">{campaign.sent}</div>
                          <div className="col-span-1">{campaign.opened}</div>
                          <div className="col-span-1">{campaign.clicked}</div>
                          <div className="col-span-2 flex items-center gap-1">
                            <Clock size={14} />
                            <span>Scheduled</span>
                          </div>
                          <div className="col-span-1 flex items-center gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
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
