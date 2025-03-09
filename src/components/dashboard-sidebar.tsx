"use client";

import { cn } from "@/lib/utils";
import {
  Mail,
  Settings,
  MessageSquare,
  LayoutDashboard,
  PenSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Mail size={18} />,
      label: "Email Campaigns",
      href: "/dashboard/campaigns",
    },
    {
      icon: <PenSquare size={18} />,
      label: "Email Editor",
      href: "/dashboard/drag-drop-editor",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Live Chat",
      href: "/dashboard/chat",
    },
    {
      icon: <Users size={18} />,
      label: "Subscribers",
      href: "/dashboard/subscribers",
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-full w-64 border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="font-semibold">Email Marketing</span>
        </Link>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
