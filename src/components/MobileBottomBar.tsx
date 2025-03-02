import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Activity,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Building2, label: "Projects", href: "/projects" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Activity, label: "Activity", href: "/activity" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 w-full max-w-md -translate-x-1/2 px-4 z-50 md:hidden">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-full py-4 px-6 shadow-lg border border-gray-300 dark:border-gray-700">
        {navItems.map((item) => {
          const isActive =
            (item.href === "/" && (path === "/" || path === "/dashboard")) ||
            path === item.href;

          return (
            <div
              key={item.href}
              className="group relative flex-grow flex justify-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg transition-all",
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
                onClick={() => navigate(item.href)}
                aria-label={item.label}
              >
                <item.icon className="h-6 w-6" />
              </Button>
              <span className="absolute bottom-full mb-2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
