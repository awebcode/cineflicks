// app/components/layout/AdminLayout.tsx

import DashboardSidebar from "@/components/common/dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <SidebarProvider>
        {/* Sidebar */}
        <DashboardSidebar />
        {/* Main Content */}
        <div className="flex-1  p-6 overflow-auto">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;