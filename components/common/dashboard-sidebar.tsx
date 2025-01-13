"use client";
import { Calendar, Home, Inbox, LayoutDashboard, List, Search, Settings } from "lucide-react";
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
  {
    title: "Partner Bio",
    url: "/admin/partner-bio",
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
              src="/logo.png"
              width={190}
              height={40}
              alt="Cineflicks logo part one: letter C in the brand design"
              className="object-contain"
              loading="lazy"
            />
          </div>
          <SidebarMenu className="my-3">
            <Link href={"/admin"} className="flex items-center">
              <LayoutDashboard className="mr-2 text-[#FFD700]" /> Dashboard
            </Link>
          </SidebarMenu>
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
