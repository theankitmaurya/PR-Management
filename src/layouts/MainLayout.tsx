import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Squares } from "@/components/ui/squares-background";
import { useState } from "react";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Squares
          direction="diagonal"
          speed={0.2}
          squareSize={50}
          borderColor="#333"
          hoverFillColor="#222"
          className="opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full">
        {/* Hide sidebar on mobile devices */}
        <div className="hidden md:block">
          <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        </div>

        {/* Mobile header with theme toggle */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b px-4 py-2 flex justify-between items-center">
          <h1 className="text-lg font-semibold">PR Management</h1>
          <ThemeToggle />
        </div>

        <main
          className={`flex-1 overflow-auto bg-background/70 backdrop-blur-sm transition-all duration-300 ${
            sidebarOpen ? "md:ml-[240px]" : "md:ml-[70px]"
          } md:pb-0 pb-20 md:pt-0 pt-14`}
        >
          <Outlet />
        </main>
      </div>

      <MobileBottomBar />
      <Toaster />
      <Sonner />
    </div>
  );
}
