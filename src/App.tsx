import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { AuthGuard } from "./components/AuthGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import AuthPage from "./pages/AuthPage";
import TeamPage from "./pages/TeamPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Activity from "./pages/Activity";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "./context/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="collabworks-theme">
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/auth" element={<AuthPage />} />

                {/* Protected routes */}
                <Route element={<AuthGuard />}>
                  <Route path="/" element={<MainLayout />}>
                    {/* Set Dashboard as default landing page */}
                    <Route index element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Index />} />
                    <Route path="/project/:id" element={<ProjectPage />} />
                    <Route path="/tasks" element={<Index />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
