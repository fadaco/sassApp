"use client";

import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import DashboardNavbar from "@/components/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, redirectToLogin } from "@/utils/auth-utils";

export default function ResetPassword(props: { searchParams: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messageParams, setMessageParams] = useState<Message | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const user = await getUser();
      if (!user) {
        redirectToLogin();
      }

      // Handle search params
      if (props.searchParams) {
        if ("error" in props.searchParams) {
          setMessageParams({ error: props.searchParams.error });
        } else if ("success" in props.searchParams) {
          setMessageParams({ success: props.searchParams.success });
        } else if ("message" in props.searchParams) {
          setMessageParams({ message: props.searchParams.message });
        }
      }

      setIsLoading(false);
    }

    checkAuth();
  }, [props.searchParams]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (messageParams && "message" in messageParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={messageParams} />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto px-6 py-8 flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
              <form className="flex flex-col space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Reset password
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Please enter your new password below.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      New password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="New password"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <SubmitButton
                  formAction={resetPasswordAction}
                  pendingText="Resetting password..."
                  className="w-full"
                >
                  Reset password
                </SubmitButton>

                {messageParams && <FormMessage message={messageParams} />}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
