// app/dashboard/layout.tsx
import React from "react";
import Sidebar from "@/app/dashboard/components/Sidebar" 
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      {/* Sidebar or Header */}
      <aside className="w-64 h-screen border-r">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
