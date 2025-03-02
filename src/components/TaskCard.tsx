import { Task } from "@/utils/types";
import { PriorityBadge } from "./PriorityBadge";
import { format } from "date-fns";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, Clock, Image as ImageIcon } from "lucide-react";
import { EditTaskModal } from "./EditTaskModal";

interface TaskCardProps {
  task: Task;
  index: number;
  onTaskUpdate: (id: string, updatedTask: Partial<Task>) => void;
  onTaskDelete: (id: string) => void;
}

export function TaskCard({
  task,
  index,
  onTaskUpdate,
  onTaskDelete,
}: TaskCardProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative bg-white rounded-lg p-4 mb-3 elevated-card cursor-pointer animate-scale-in group ${
            snapshot.isDragging ? "shadow-elevated rotate-1" : ""
          }`}
        >
          <EditTaskModal
            task={task}
            onTaskUpdate={onTaskUpdate}
            onTaskDelete={onTaskDelete}
          />

          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>

          {task.description && (
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {task.image && (
            <div className="mb-3 bg-gray-50 rounded-md overflow-hidden">
              <div className="aspect-video flex items-center justify-center">
                <img
                  src={task.image}
                  alt={task.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="mt-2 space-y-1.5">
            {task.dueDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{format(task.dueDate, "MMM d")}</span>
                {/* Show days remaining */}
                <span className="ml-auto flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {Math.ceil(
                    (task.dueDate.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                  d
                </span>
              </div>
            )}

            <div className="text-xs text-gray-400 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              <span>Created {format(task.createdAt, "MMM d")}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
