import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Layout,
  LogOut,
  Menu,
  X,
  Settings,
  Users,
  Activity,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

// Sidebar Link Component
const SidebarLink = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  onClick = () => {}, // Fix: Provide default function to avoid errors
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      navigate(href);
    }
    onClick(); // Ensure onClick is always defined
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={handleClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sidebar({ open = true, onOpenChange }: SidebarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useMobile();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const links = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Building2, label: "Projects", href: "/projects" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Activity, label: "Activity", href: "/activity" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const toggleSidebar = () => {
    if (onOpenChange) {
      onOpenChange(!open);
    }
  };

  const SidebarContent = () => (
    <div className="h-full py-4 px-3 flex flex-col">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {/* PR Management Image */}
          <img
            src="/favicon.ico"
            alt="PR Management Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-semibold hidden:md-block">
            PR Management
          </h1>
        </div>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSheetOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      <div className="space-y-1 py-2">
        {links.map((link) => (
          <SidebarLink
            key={link.href}
            icon={link.icon}
            label={link.label}
            href={link.href}
            isActive={
              link.href === "/"
                ? path === "/" || path === "/dashboard"
                : path === link.href || path.startsWith(`${link.href}/`)
            }
          />
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>

        <Separator className="my-2" />

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center truncate">
            <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.email?.[0].toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="truncate">
              <p className="text-sm font-medium truncate max-w-[140px]">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="sticky top-0 z-40 flex h-16 items-center bg-background px-4 border-b">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            {/* PR Management Image */}
            <img
              src="/favicon.ico"
              alt="PR Management Logo"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-semibold">PR Management</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "h-screen fixed inset-y-0 z-50 bg-sidebar border-r transition-all duration-300",
          open ? "w-[240px] left-0" : "w-[70px] left-0"
        )}
      >
        <div
          className="absolute top-1/2 -right-4 flex items-center justify-center h-8 w-8 rounded-full border border-border bg-background cursor-pointer transform -translate-y-1/2 z-50 hover:bg-accent transition-colors duration-200"
          onClick={toggleSidebar}
        >
          {open ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>

        {open ? (
          <SidebarContent />
        ) : (
          <div className="h-full py-4 flex flex-col items-center">
            <div className="w-full flex justify-center py-2">
              {/* Sidebar Collapsed Image */}
              <img
                src="/favicon.ico"
                alt="Sidebar Logo"
                className="h-10 w-10"
              />
            </div>

            <Separator className="my-4 w-full" />

            <div className="flex flex-col gap-6 items-center py-4">
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(link.href)}
                >
                  <link.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
