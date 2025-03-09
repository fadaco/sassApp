"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronUp,
  Clock,
  InfoIcon,
  Mail,
  MessageSquare,
  TrendingUp,
  UserCircle,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function Dashboard() {
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

  // Sample analytics data
  const analyticsData = {
    subscribers: {
      total: 5842,
      growth: 12.5,
      active: 4328,
      inactive: 1514,
      weeklyGrowth: [120, 132, 101, 134, 90, 110, 150],
    },
    campaigns: {
      total: 24,
      active: 3,
      completed: 21,
      openRate: 42.3,
      clickRate: 18.7,
      monthlyStats: [18, 22, 20, 24, 18, 22, 19, 16, 24, 20, 28, 24],
    },
    engagement: {
      emailsSent: 28450,
      emailsOpened: 12032,
      linksClicked: 5321,
      unsubscribes: 142,
      dailyEngagement: [320, 380, 420, 390, 400, 450, 380],
    },
    recentActivity: [
      {
        type: "campaign",
        name: "Monthly Newsletter",
        time: "2 hours ago",
        status: "Sent",
      },
      {
        type: "subscriber",
        name: "New Subscribers",
        time: "5 hours ago",
        count: 28,
      },
      {
        type: "engagement",
        name: "Welcome Email",
        time: "1 day ago",
        openRate: 68,
      },
      {
        type: "campaign",
        name: "Product Announcement",
        time: "2 days ago",
        status: "Scheduled",
      },
    ],
  };

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-8">
            {/* Header Section */}
            <header className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  <span>
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
                <InfoIcon size="14" />
                <span>
                  Welcome to your email marketing dashboard. Here's an overview
                  of your campaigns and subscriber analytics.
                </span>
              </div>
            </header>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Subscribers</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                      {analyticsData.subscribers.total.toLocaleString()}
                    </CardTitle>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <ChevronUp size={16} />
                      {analyticsData.subscribers.growth}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users size={14} />
                    <span>
                      Active subscribers:{" "}
                      {analyticsData.subscribers.active.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Campaigns</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                      {analyticsData.campaigns.total}
                    </CardTitle>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <Mail size={16} />
                      {analyticsData.campaigns.active} Active
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock size={14} />
                    <span>Last campaign: 2 hours ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Open Rate</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                      {analyticsData.campaigns.openRate}%
                    </CardTitle>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp size={16} />
                      2.1%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart3 size={14} />
                    <span>Industry avg: 21.5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Click Rate</CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">
                      {analyticsData.campaigns.clickRate}%
                    </CardTitle>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingUp size={16} />
                      1.2%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart3 size={14} />
                    <span>Industry avg: 7.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Growth Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                  <CardDescription>Weekly new subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-6 pb-2">
                    {analyticsData.subscribers.weeklyGrowth.map(
                      (value, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col items-center"
                        >
                          <div
                            className="bg-primary/80 hover:bg-primary w-12 rounded-t-md transition-all"
                            style={{ height: `${value / 1.5}px` }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-2">
                            {
                              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                                index
                              ]
                            }
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div
                          className={`p-2 rounded-full ${activity.type === "campaign" ? "bg-blue-100" : activity.type === "subscriber" ? "bg-green-100" : "bg-purple-100"}`}
                        >
                          {activity.type === "campaign" ? (
                            <Mail size={16} className="text-blue-600" />
                          ) : activity.type === "subscriber" ? (
                            <Users size={16} className="text-green-600" />
                          ) : (
                            <BarChart3 size={16} className="text-purple-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.name}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                            {activity.status && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${activity.status === "Sent" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {activity.status}
                              </span>
                            )}
                            {activity.count && (
                              <span className="text-xs font-medium">
                                +{activity.count}
                              </span>
                            )}
                            {activity.openRate && (
                              <span className="text-xs font-medium">
                                {activity.openRate}% opened
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Monthly campaign statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-end justify-between gap-2 pt-6 pb-2">
                  {analyticsData.campaigns.monthlyStats.map((value, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center"
                    >
                      <div
                        className="bg-blue-500/80 hover:bg-blue-500 w-8 rounded-t-md transition-all"
                        style={{ height: `${value * 5}px` }}
                      ></div>
                      <span className="text-xs text-muted-foreground mt-2">
                        {
                          [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                          ][index]
                        }
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-sm font-medium">Total Sent</p>
                    <p className="text-2xl font-bold">
                      {analyticsData.engagement.emailsSent.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Opened</p>
                    <p className="text-2xl font-bold">
                      {analyticsData.engagement.emailsOpened.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Clicked</p>
                    <p className="text-2xl font-bold">
                      {analyticsData.engagement.linksClicked.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Unsubscribed</p>
                    <p className="text-2xl font-bold">
                      {analyticsData.engagement.unsubscribes.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Profile Section */}
            <section className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle size={48} className="text-primary" />
                <div>
                  <h2 className="font-semibold text-xl">User Profile</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
                <pre className="text-xs font-mono max-h-48 overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
