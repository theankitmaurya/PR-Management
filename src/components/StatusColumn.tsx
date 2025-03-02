import { TaskStatus, Task } from "@/utils/types";
import { TaskCard } from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

interface StatusColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskUpdate?: (id: string, updatedTask: Partial<Task>) => void;
  onTaskDelete?: (id: string) => void;
}

export function StatusColumn({
  status,
  tasks,
  onTaskUpdate,
  onTaskDelete,
}: StatusColumnProps) {
  const getStatusTitle = () => {
    switch (status) {
      case TaskStatus.TODO:
        return "To Do";
      case TaskStatus.IN_PROGRESS:
        return "In Progress";
      case TaskStatus.COMPLETED:
        return "Completed";
      default:
        return status;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-gray-100";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-50";
      case TaskStatus.COMPLETED:
        return "bg-green-50";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="min-w-[300px] flex-1 rounded-lg overflow-hidden">
      <div className={`p-3 ${getStatusColor()}`}>
        <h3 className="font-medium flex items-center text-sm">
          {getStatusTitle()}
          <span className="ml-2 bg-white rounded-full text-xs px-2 py-0.5 font-normal">
            {tasks.length}
          </span>
        </h3>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 min-h-[300px] transition-colors ${
              snapshot.isDraggingOver ? getStatusColor() : "bg-transparent"
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onTaskUpdate={onTaskUpdate || (() => {})}
                onTaskDelete={onTaskDelete || (() => {})}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
