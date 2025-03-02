import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/ProjectCard";
import { NewProjectModal } from "@/components/NewProjectModal";
import { Project } from "@/utils/types";
import { LayoutGrid, List, Plus, Search, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getProjects, createProject } from "@/services/supabaseService";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (error) {
        console.error("Error loading projects:", error);
        toast({
          title: "Error loading projects",
          description: "There was a problem loading your projects.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadProjects();
    }
  }, [user]);

  const handleCreateProject = async (projectData: {
    title: string;
    description: string;
    coverImage?: string;
  }) => {
    try {
      const newProject = await createProject(projectData);
      setProjects([newProject, ...projects]);

      toast({
        title: "Project created",
        description: `"${projectData.title}" has been successfully created`,
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error creating project",
        description: "There was a problem creating your project.",
        variant: "destructive",
      });
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 animate-fade-in backdrop-blur-sm bg-background/60 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Welcome to PR Management
        </h1>
        <p className="text-muted-foreground">
          Manage your projects and tasks with ease.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            className="pl-9 bg-background/70 backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <div className="border rounded-md flex bg-background/70 backdrop-blur-sm">
            <Button
              variant={isGridView ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none rounded-l-md"
              onClick={() => setIsGridView(true)}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={!isGridView ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none rounded-r-md"
              onClick={() => setIsGridView(false)}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <NewProjectModal onProjectCreate={handleCreateProject} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center mt-16">
          <div className="bg-muted/30 inline-flex items-center justify-center rounded-full w-16 h-16 mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "Try a different search term or"
              : "Get started by creating your first project"}
          </p>
          <NewProjectModal onProjectCreate={handleCreateProject} />
        </div>
      ) : (
        <div
          className={
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="animate-scale-in">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
