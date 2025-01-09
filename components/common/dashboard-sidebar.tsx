"use client";
import { Calendar, Home, Inbox, List, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Img } from "./Img";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Generate Coupon Code",
    url: "/admin/generate-coupon",
    icon: List,
  },
  {
    title: "User List",
    url: "/admin/user-list",
    icon: List,
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar aria-label="Dashboard Sidebar">
      <SidebarContent className="bg-black text-gray-200">
        <SidebarGroup>
          <div
            onClick={() => (window.location.href = "/")}
            className="flex items-center my-2 cursor-pointer"
            role="button"
            tabIndex={0} // Ensure the div is focusable for keyboard navigation
            aria-label="Go to Homepage"
          >
            <Img
              src="/logo-c.png"
              width={50}
              height={50}
              alt="Logo C"
              className="object-contain"
            />
            <Img
              src="/logo-ineflicks.png"
              width={140}
              height={40}
              alt="Cineflicks Logo"
              className="object-contain"
            />
          </div>
          <SidebarGroupLabel className="my-3">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2"
                      aria-label={item.title}
                    >
                     
                        <item.icon aria-hidden="true" />
                        <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
