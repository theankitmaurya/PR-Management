import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TaskBoard } from "@/components/TaskBoard";
import { NewTaskModal } from "@/components/NewTaskModal";
import { Task, Priority, TaskStatus, Project } from "@/utils/types";
import { ChevronLeft, Clock, CalendarClock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import {
  createTask,
  getProjectById,
  updateTaskStatus,
  updateTask,
  deleteTask,
  updateProject,
  deleteProject,
} from "@/services/supabaseService";
import { EditProjectModal } from "@/components/EditProjectModal";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const projectData = await getProjectById(id);

        if (!projectData) {
          toast({
            title: "Project not found",
            description: "The requested project could not be found.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        setProject(projectData);
      } catch (error) {
        console.error("Error loading project:", error);
        toast({
          title: "Error loading project",
          description: "There was a problem loading the project details.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id, navigate]);

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    priority: Priority;
    dueDate?: Date;
    status: TaskStatus;
    projectId: string;
    image?: string;
  }) => {
    if (!project) return;

    try {
      const newTask = await createTask(taskData);

      setProject({
        ...project,
        tasks: [...project.tasks, newTask],
      });

      toast({
        title: "Task created",
        description: `"${taskData.title}" has been added to the project`,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error creating task",
        description: "There was a problem creating the task.",
        variant: "destructive",
      });
    }
  };

  const handleTaskUpdate = async (
    taskId: string,
    updatedTaskData: Partial<Task>
  ) => {
    if (!project) return;

    try {
      const updatedTasks = project.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTaskData };
        }
        return task;
      });

      setProject({
        ...project,
        tasks: updatedTasks,
      });

      await updateTask(taskId, updatedTaskData);
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error updating task",
        description: "There was a problem updating the task.",
        variant: "destructive",
      });

      if (id) {
        const refreshedProject = await getProjectById(id);
        if (refreshedProject) {
          setProject(refreshedProject);
        }
      }
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    if (!project) return;

    try {
      const updatedTasks = project.tasks.filter((task) => task.id !== taskId);

      setProject({
        ...project,
        tasks: updatedTasks,
      });

      await deleteTask(taskId);

      toast({
        title: "Task deleted",
        description: "The task has been permanently deleted.",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error deleting task",
        description: "There was a problem deleting the task.",
        variant: "destructive",
      });

      if (id) {
        const refreshedProject = await getProjectById(id);
        if (refreshedProject) {
          setProject(refreshedProject);
        }
      }
    }
  };

  const handleProjectUpdate = async (
    projectId: string,
    projectData: {
      title?: string;
      description?: string;
      coverImage?: string;
    }
  ) => {
    if (!project) return;

    try {
      setProject({
        ...project,
        title: projectData.title || project.title,
        description: projectData.description,
        coverImage: projectData.coverImage,
        updatedAt: new Date(),
      });

      await updateProject(projectId, projectData);
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error updating project",
        description: "There was a problem updating the project.",
        variant: "destructive",
      });

      if (id) {
        const refreshedProject = await getProjectById(id);
        if (refreshedProject) {
          setProject(refreshedProject);
        }
      }
    }
  };

  const handleProjectDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error deleting project",
        description: "There was a problem deleting the project.",
        variant: "destructive",
      });
    }
  };

  const handleTaskDragEnd = async (taskId: string, newStatus: TaskStatus) => {
    if (!project) return;

    try {
      const updatedTasks = project.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      setProject({
        ...project,
        tasks: updatedTasks,
      });

      await updateTaskStatus(taskId, newStatus);

      const taskName = project.tasks.find((t) => t.id === taskId)?.title;
      toast({
        title: "Task Updated",
        description: `"${taskName}" moved to ${newStatus
          .replace("_", " ")
          .toLowerCase()}`,
        duration: 2000,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Error updating task",
        description: "There was a problem updating the task status.",
        variant: "destructive",
      });

      if (project) {
        const originalStatus = project.tasks.find(
          (t) => t.id === taskId
        )?.status;
        if (originalStatus) {
          const revertedTasks = project.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: originalStatus };
            }
            return task;
          });

          setProject({
            ...project,
            tasks: revertedTasks,
          });
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg mb-4">Project not found</p>
          <Button onClick={() => navigate("/")}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (task) => task.status === TaskStatus.COMPLETED
  ).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold ml-2">{project.title}</h1>
        </div>

        <EditProjectModal
          project={project}
          onProjectUpdate={handleProjectUpdate}
          onProjectDelete={handleProjectDelete}
        />
      </div>

      {project.description && (
        <p className="text-muted-foreground mb-6 whitespace-pre-line">
          {project.description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="elevated-card rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Project Overview</h3>
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary dark:bg-white"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-900 dark:text-white">
                {progressPercentage}% complete
              </span>
              <span className="text-gray-900 dark:text-white">
                {completedTasks}/{totalTasks} tasks
              </span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4 mr-2" />
            <span>
              Created {format(new Date(project.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <div className="elevated-card rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Task Priority</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">High</span>
              <span className="text-xs font-medium">
                {
                  project.tasks.filter((t) => t.priority === Priority.HIGH)
                    .length
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Medium</span>
              <span className="text-xs font-medium">
                {
                  project.tasks.filter((t) => t.priority === Priority.MEDIUM)
                    .length
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Low</span>
              <span className="text-xs font-medium">
                {
                  project.tasks.filter((t) => t.priority === Priority.LOW)
                    .length
                }
              </span>
            </div>
          </div>
        </div>

        <div className="elevated-card rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">Recent Activity</h3>
          <div className="text-xs text-muted-foreground">
            <p>
              Project updated{" "}
              {format(new Date(project.updatedAt), "MMM d, yyyy")}
            </p>
            {project.tasks.length > 0 && (
              <p className="mt-1">
                {project.tasks.length} tasks in this project
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-xl font-medium">Tasks</h2>
        <NewTaskModal projectId={project.id} onTaskCreate={handleCreateTask} />
      </div>

      <TaskBoard
        project={project}
        onTaskStatusChange={handleTaskDragEnd}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />
    </div>
  );
};

export default ProjectPage;
