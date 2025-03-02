import { Project, TaskStatus } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Folder, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  // Optimize task count calculation using reduce
  const { todoCount, inProgressCount, completedCount, totalTasks } =
    project.tasks.reduce(
      (acc, task) => {
        acc.totalTasks++;
        if (task.status === TaskStatus.TODO) acc.todoCount++;
        if (task.status === TaskStatus.IN_PROGRESS) acc.inProgressCount++;
        if (task.status === TaskStatus.COMPLETED) acc.completedCount++;
        return acc;
      },
      { todoCount: 0, inProgressCount: 0, completedCount: 0, totalTasks: 0 }
    );

  // Calculate progress percentage
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="elevated-card rounded-lg overflow-hidden animate-scale-in">
      {/* Cover Image Section */}
      <div
        className={`relative w-full min-h-[200px] ${
          project.coverImage ? "h-auto" : "h-32"
        } bg-gray-200`}
      >
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Folder className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Project Details */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{project.title}</h3>

        {/* Full Description (Preserves Line Breaks) */}
        {project.description && (
          <p className="text-sm text-gray-500 mb-3 whitespace-pre-line">
            {project.description}
          </p>
        )}

        <div className="flex items-center text-xs text-gray-500 mb-3">
          <span>Created {format(project.createdAt, "MMM d, yyyy")}</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between text-xs mt-1">
            <span>{progressPercentage}% complete</span>
            <span>
              {completedCount}/{totalTasks} tasks
            </span>
          </div>
        </div>

        {/* Task Status Counts */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100">
              {todoCount} to do
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100">
              {inProgressCount} in progress
            </span>
          </div>

          {/* Navigate Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
