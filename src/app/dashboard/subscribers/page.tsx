"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import SubscribersList from "@/components/subscribers/subscribers-list";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function SubscribersPage() {
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

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8">
            <SubscribersList />
          </div>
        </main>
      </div>
    </div>
  );
}
